import base64
import copy

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from users.api.serializers import (
    UserVerificationSerializer,
    UserUpdateSerializer,
    SendAskedQuestionEmailSerializer,
    UserSettingsSerializer)
from users.models import UserSettings

from users.utils import random_string

User = get_user_model()


class SendAskedQuestionEmail(GenericAPIView):
    serializer_class = SendAskedQuestionEmailSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            message = serializer.validated_data.get("message")
            email = serializer.validated_data.get("email")
            message = str(message) + "\nThis question is asked by: " + str(email)
            admins_list = User.objects.filter(is_superuser=True).first()
            user_name = request.user.name.upper()
            send_mail(f"QUESTION SENT FROM {user_name}", message, settings.EMAIL_HOST_USER, [admins_list.email])
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserVerificationAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserVerificationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserProfile(ModelViewSet):
    serializer_class = UserUpdateSerializer
    queryset = User.objects.none()

    def get_queryset(self):
        queryset = User.objects.filter(pk=self.request.user.pk)
        return queryset

    def update(self, request, *args, **kwargs):
        data = copy.deepcopy(request.data)
        if 'email' in self.request.data:
            email = self.request.data["email"]
            User.objects.filter(email__exact=self.request.user.email).update(username=email)
        if 'image' in self.request.data:
            new_image = self.request.data["image"]
            format, imgstr = new_image.split(';base64,')
            ext = format.split('/')[-1]
            file_name = random_string()
            data["image"] = ContentFile(base64.b64decode(imgstr), name=str(file_name) + str('.') + str(ext))
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class UserSettingsViewset(ModelViewSet):
    serializer_class = UserSettingsSerializer
    queryset = UserSettings.objects.all()

    def list(self, request, *args, **kwargs):
        queryset, created = UserSettings.objects.get_or_create(pk=self.request.user.pk)
        serializer = self.get_serializer(queryset, many=False)
        return Response(serializer.data)
