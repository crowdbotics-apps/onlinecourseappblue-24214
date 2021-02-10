import random
from datetime import timedelta

from allauth.account.models import EmailAddress
from django.core.mail import send_mail
from django.db import transaction
from django.utils import timezone
from rest_auth.models import TokenModel
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import get_user_model
from onlinecourseappblue_24214 import settings
from phone_verification.utils import (
    is_valid_phone_number,
    recreate_new_user_key,
    get_validated_phone_number,
    is_valid_email,
    send_message)
from phone_verification.models import PhoneVerification, PhoneVerificationKey
from phone_verification.serializers import VerifyPhoneNumberSerializer, CreateNewKeySerializer, RegisterLoginSerializer
User = get_user_model()


# class CreateNewOTP(APIView):
#     serializer_class = CreateNewOTPSerializer
#
#     @transaction.atomic()
#     def post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid()
#         email_or_number = request.data.get("email_or_number")
#         key = str(random.randint(1000, 9999))
#         user = self.request.user
#         if is_valid_phone_number(email_or_number):
#             if User.objects.filter(phone_number__exact=email_or_number).exists():
#                 return Response({"email_or_number": "User with this phone number already exists."}, status=status.HTTP_400_BAD_REQUEST)
#             message = key + ' is your One Time PIN for the verification of updated phone number.'
#             PhoneVerification.objects.get_or_create(user=user, phone=email_or_number)
#             PhoneVerificationKey.objects.filter(user=user).delete()
#             PhoneVerificationKey.objects.create(user=user, key=key)
#             send_message(email_or_number, message)
#
#         elif is_valid_email(email_or_number):
#             if User.objects.filter(email__exact=email_or_number).exists():
#                 return Response({"email_or_number": "User with this Email already exists."},
#                                 status=status.HTTP_400_BAD_REQUEST)
#
#             message = key + ' is your One Time PIN for the verification of updated email.'
#             PhoneVerificationKey.objects.filter(user=user).delete()
#             PhoneVerificationKey.objects.create(user=user, key=key)
#             email_address, created = EmailAddress.objects.get_or_create(user=user, email=email_or_number)
#             if created:
#                 pass
#
#             send_mail("OTP", message, settings.EMAIL_HOST_USER, [email_or_number])
#         else:
#             return Response({"error": "Not a valid data."}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({"success": "OTP sent successfully."}, status=status.HTTP_200_OK)


class CreateNewKeyViewSet(APIView):
    serializer_class = CreateNewKeySerializer
    permission_classes = (AllowAny,)

    @transaction.atomic()
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        if 'email_or_number' in request.data:
            email_or_number = request.data["email_or_number"]
            check_email_or_phone = is_valid_email(email_or_number)
            if check_email_or_phone:
                response = ["not a valid number"]
            if is_valid_phone_number(email_or_number):
                number = get_validated_phone_number(email_or_number)
            else:
                return Response({'response': 'Please provide valid number.'})
            if number:
                phone_verify = PhoneVerification.objects.filter(phone__exact=number)
                if phone_verify.exists():
                    phone_verify_obj = phone_verify.get(phone__exact=number)
                    user = phone_verify_obj.user
                    phone_key_obj = PhoneVerificationKey.objects.filter(user=user).first()
                    if phone_key_obj is None:
                        recreate_new_user_key(user, number)
                        return Response({
                            'response': "Verification Code Sent", "username": check_email_or_phone
                        }, status=status.HTTP_200_OK)
                    phone_key_obj.delete()
                    recreate_new_user_key(user, number)
                    return Response({'response': "Verification Code Sent",
                                     }, status=status.HTTP_200_OK)
                return Response({'response': ["Not a valid user."]}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'response': ["Please Provide Required Data."]}, status=status.HTTP_400_BAD_REQUEST)


class VerifyPhoneNumber(APIView):
    permission_classes = (AllowAny,)
    serializer_class = VerifyPhoneNumberSerializer

    @transaction.atomic()
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        now_time = timezone.now()

        if 'key' and 'email_or_number' in request.data:
            email_or_number = request.data["email_or_number"]
            user = None
            key = request.data["key"]
            email_verify = EmailAddress.objects.filter(email__exact=email_or_number)
            phone_verify = PhoneVerification.objects.filter(phone__exact=email_or_number)
            if email_verify:
                user = email_verify[0].user
                phone_verify = PhoneVerification.objects.filter(user=user)
            if phone_verify:
                user = phone_verify[0].user
                email_verify = EmailAddress.objects.filter(user=user)
            if user:
                phone_key_obj = PhoneVerificationKey.objects.filter(key=key, user=user).first()
                if phone_key_obj is None:
                    content = "No OTP Found. Please Request Again."
                    return Response({'error': content}, status=status.HTTP_404_NOT_FOUND)
                key_created = phone_key_obj.created
                expiry_date = key_created + timedelta(minutes=settings.TWILIO_VERIFY_KEY_EXPIRY_MINUTES)
                if now_time > expiry_date:
                    phone_key_obj.delete()
                    content = 'OTP Expired, Please Request Again.'
                    return Response({'error': content}, status=status.HTTP_404_NOT_FOUND)

                if key == phone_key_obj.key:
                    email_verify.update(verified=True, primary=True)
                    phone_verify.update(verified=True)
                    token, created = TokenModel.objects.get_or_create(user=phone_key_obj.user)
                    response = {
                        "token": token.key,
                        "user": {
                            "id": token.user.id,
                            "name": token.user.name,
                            "email": token.user.email,
                            "phone_number": token.user.phone_number.as_e164,
                            "image": token.user.image.url if token.user.image else None,
                            "country_dial_code": token.user.country_dial_code,
                            "country_code": token.user.country_code,
                        }
                    }
                    phone_key_obj.delete()

                    return Response(response, status=status.HTTP_200_OK)
                return Response({'error': 'Please Verify Your Account Before Login.'},
                                status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            return Response({'error': 'You need to Create an Account.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': "Please Provide Required Data."}, status=status.HTTP_400_BAD_REQUEST)
