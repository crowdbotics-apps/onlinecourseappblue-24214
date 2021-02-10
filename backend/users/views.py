import copy
from datetime import timedelta

import jwt
from django.conf import settings
from django.utils import timezone
from django_rest_passwordreset.models import get_password_reset_token_expiry_time, ResetPasswordToken
from django_rest_passwordreset.signals import pre_password_reset, post_password_reset
from rest_auth.registration.app_settings import register_permission_classes
from rest_auth.registration.views import RegisterView
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny

from phone_verification.utils import send_verification_code, send_password_reset_token_phone
from django.contrib.auth import get_user_model
from django.contrib.auth import login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db import IntegrityError, transaction
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import (
    RedirectView,
    DetailView,
    UpdateView,
)
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import status, viewsets
from social_django.utils import psa

from home.api.v1.serializers import LoggedInUserSerializer
from users.utils import clear_expired_keys
from .serializers import CustomRegistrationSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer, \
    SocialSerializer, UserSerializer
from .services.UserUtils import UserUtils

USER_AGENT_HEADER = getattr(settings, 'DJANGO_REST_PASSWORDRESET_HTTP_USER_AGENT_HEADER', 'HTTP_USER_AGENT')
IP_ADDRESS_HEADER = getattr(settings, 'DJANGO_REST_PASSWORDRESET_IP_ADDRESS_HEADER', 'REMOTE_ADDR')

User = get_user_model()


class UserDetailView(LoginRequiredMixin, DetailView):

    model = User
    slug_field = "username"
    slug_url_kwarg = "username"


user_detail_view = UserDetailView.as_view()


class UserUpdateView(LoginRequiredMixin, UpdateView):

    model = User
    fields = ["name"]

    def get_success_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})

    def get_object(self):
        return User.objects.get(username=self.request.user.username)


user_update_view = UserUpdateView.as_view()


class UserRedirectView(LoginRequiredMixin, RedirectView):

    permanent = False

    def get_redirect_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})


user_redirect_view = UserRedirectView.as_view()


@csrf_exempt
@api_view(('POST',))
@psa('social:complete')
@renderer_classes((JSONRenderer, ))
@permission_classes([AllowAny])
def register_by_access_token(request, backend):

    token = request.GET.get('access_token')
    try:
        user = request.backend.do_auth(token)
        if user:
            user.name = user.first_name + ' ' + user.last_name
            user.save()
            login(request, user)
            user_serializer = LoggedInUserSerializer(user)
            obj, created = Token.objects.get_or_create(user=user)
            response = {'user': user_serializer.data}
            response.update({"token": obj.key})
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response("Unable to login", status=status.HTTP_404_NOT_FOUND)
    except IntegrityError:
        return Response({'error': 'User already exists. try to reset password'},
                        status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as error:
        return Response({'error': str(error)},
                        status=status.HTTP_400_BAD_REQUEST)


class AppleLogin(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    def create(self, request):
        social_serializer = SocialSerializer(data=request.data)
        social_serializer.is_valid(raise_exception=True)
        response_status = UserUtils.verify_apple_details(request.data["access_token"])
        if response_status.status_code != 200:
            return Response({
                'success': False,
                'result': "Invalid Token!",
            }, status=status.HTTP_400_BAD_REQUEST)
        user_info = response_status.json()
        id_token = user_info.get('id_token', None)
        response_data = {}
        if id_token:
            decoded = jwt.decode(id_token, '', verify=False)
            response_data.update({'email': decoded['email'] if 'email' in decoded else None})
            response_data.update({'id': decoded['sub']}) if 'sub' in decoded else None
            response_data.update({'name': request.data['name'] if 'name' in request.data else None})
            user = SocialSerializer(context={"request": request}).social_login(response_data, "Apple")
            user_detail = UserSerializer(user).data

            return Response({
                'token': user_detail.pop('token'),
                'user': user_detail,
            }, status=status.HTTP_200_OK)


class UserRegister(RegisterView):
    serializer_class = CustomRegistrationSerializer
    permission_classes = register_permission_classes()

    @transaction.atomic()
    def create(self, request, *args, **kwargs):
        data = copy.deepcopy(request.data)
        data['password2'] = data['password1']
        user = User.objects.filter(phone_number=data.get('phone_number'))
        if not user:
            serializer = self.serializer_class(data=data, context={'request': request})
            if serializer.is_valid():
                headers = self.get_success_headers(serializer.data)
                self.perform_create(serializer)  # will create EmailAddress/PhoneVerification entries against user.
                return Response({"response": "success"}, status=status.HTTP_201_CREATED, headers=headers)
            else:
                errors = serializer.errors
            return Response(errors, status.HTTP_400_BAD_REQUEST)
        return Response({"phone_number": "User with this phone number already exists."}, status.HTTP_400_BAD_REQUEST)


class PasswordResetViewSet(GenericAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data.get("phone_number")
            password_reset_token_validation_time = get_password_reset_token_expiry_time()
            now_minus_expiry_time = timezone.now() - timedelta(hours=password_reset_token_validation_time)
            target_user = User.objects.filter(phone_number__iexact=phone_number).first()
            if not target_user:
                return Response({"phone_number": "User with this phone number doesn't exist."}, status.HTTP_404_NOT_FOUND)
            if target_user.password_reset_tokens.all().count() > 0:
                token = ResetPasswordToken.objects.filter(user=target_user)
                token.delete()
            token = ResetPasswordToken.objects.create(
                user=target_user,
                user_agent=request.META.get(USER_AGENT_HEADER),
                ip_address=request.META.get(IP_ADDRESS_HEADER)
            )  # exception is expected if IP_ADDRESS_HEADER is None/empty.
            clear_expired_keys(now_minus_expiry_time)
            success = send_password_reset_token_phone(token.key, phone_number)
            _status = "Reset Password Token Sent." if success else "Something went wrong while sending message."
            return Response({'status': _status}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


class ResetPasswordConfirm(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data.get("password")
            token = serializer.validated_data.get("key")
            # phone_number = serializer.validated_data.get("phone_number")

            reset_password_token = ResetPasswordToken.objects.filter(key=token).first()
            pre_password_reset.send(sender=self.__class__, user=reset_password_token.user)
            reset_password_token.user.set_password(password)
            reset_password_token.user.save()

            post_password_reset.send(sender=self.__class__, user=reset_password_token.user)
            ResetPasswordToken.objects.filter(user=reset_password_token.user).delete()
            return Response({'status': 'OK'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
