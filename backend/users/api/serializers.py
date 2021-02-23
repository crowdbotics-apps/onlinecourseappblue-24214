from datetime import timedelta

from allauth.account.models import EmailAddress
from django.conf import settings
from django.core import exceptions
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validators
from django.db import transaction
from django.utils import timezone
from phonenumber_field.serializerfields import PhoneNumberField
from rest_auth.serializers import LoginSerializer
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

from phone_verification.models import PhoneVerification, PhoneVerificationKey
from phone_verification.utils import recreate_new_user_key, send_email_key_on_profile_update
from users.field import Base64ImageField
from users.models import UserSettings

User = get_user_model()


class UserVerificationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[
        UniqueValidator(queryset=User.objects.all(), message="A user with this email address already exists.")])

    class Meta:
        model = User
        fields = ('email', 'password', 'name')

    def validate(self, data):
        if User.objects.filter(email__exact=data.get('email')).exists():
            raise serializers.ValidationError("User with email already exists.")
        user = User(**data)

        password = data.get('password')

        errors = dict()
        try:
            validators.validate_password(password=password, user=User)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super(UserVerificationSerializer, self).validate(data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'phone_number', 'image', 'country_dial_code', 'country_code', 'subscription_plan')


class SendAskedQuestionEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    message = serializers.CharField(required=True)
    subject = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ('email', 'message', 'subject')


class UserUpdateSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    name = serializers.CharField(required=False)
    country_dial_code = serializers.CharField(required=False)
    country_code = serializers.CharField(required=False)
    phone_number = PhoneNumberField(required=False)
    # key = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    image = Base64ImageField(required=False)

    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'phone_number', 'image', 'country_dial_code', 'country_code')

    @transaction.atomic()
    def validate(self, data):
        user = User.objects.filter(pk=data.get('id')).first()
        phone_number = data.get("phone_number")
        email = data.get("email")
        now_time = timezone.now()
        # if (phone_number or email) and ('key' not in data):
        #     raise serializers.ValidationError("Please Provide key to update email or phone.")
        if phone_number and user.phone_number != phone_number:
            # key = data.pop('key')
            if User.objects.filter(phone_number__exact=phone_number):
                raise serializers.ValidationError({"phone_number": "User with this phone number already exists."})
            PhoneVerification.objects.filter(phone__exact=user.phone_number, verified=True).delete()
            PhoneVerification.objects.create(user=user, phone=phone_number, verified=True)
            # verify_key = PhoneVerificationKey.objects.filter(user=user, key=key).first()
            # if verify_key:
            #     key_created = verify_key.created
            #     expiry_date = key_created + timedelta(minutes=settings.TWILIO_VERIFY_KEY_EXPIRY_MINUTES)
            #     if now_time > expiry_date:
            #         verify_key.delete()
            #         PhoneVerification.objects.filter(user=user, phone=phone_number).delete()
            #         content = 'OTP expired, Please request again.'
            #         raise serializers.ValidationError(content)
            #     PhoneVerification.objects.filter(phone__exact=user.phone_number, verified=True).delete()
            #     PhoneVerification.objects.filter(user=user, phone=phone_number).update(verified=True)
            #     verify_key.delete()
            # else:
            #     raise serializers.ValidationError("Not a valid OTP.")
        if email and user.email != email:
            # key = data.pop('key')
            if User.objects.filter(email__exact=email):
                raise serializers.ValidationError({"email": "User with this email already exists."})
            EmailAddress.objects.filter(user=user, email=user.email, primary=True, verified=True).delete()
            EmailAddress.objects.create(user=user, email=email, verified=True, primary=True)
            # verify_key = PhoneVerificationKey.objects.filter(user=user, key=key).first()
            # if verify_key:
            #     key_created = verify_key.created
            #     expiry_date = key_created + timedelta(minutes=settings.TWILIO_VERIFY_KEY_EXPIRY_MINUTES)
            #     if now_time > expiry_date:
            #         verify_key.delete()
            #         EmailAddress.objects.filter(user=user, email=email).delete()
            #         content = 'OTP Expired, Please Request Again.'
            #         raise serializers.ValidationError(content)
            #     user.username = email
            #     user.save()
            #     EmailAddress.objects.filter(user=user, email=user.email, primary=True, verified=True).delete()
            #     EmailAddress.objects.filter(user=user, email=email).update(verified=True, primary=True)
            #     verify_key.delete()
            # else:
            #     raise serializers.ValidationError("Not a valid OTP.")
            # send_email_key_on_profile_update(user, email)
        User(**data)
        return super(UserUpdateSerializer, self).validate(data)

    def update(self, instance, validated_data):
        if validated_data.get('image') is None:
            instance.image = instance.image
        else:
            instance.image = validated_data.pop('image')
        instance.phone_number = validated_data.pop('phone_number', instance.phone_number)
        instance.name = validated_data.pop('name', instance.name)
        instance.email = validated_data.pop('email', instance.email)
        instance.country_dial_code = validated_data.pop('country_dial_code', instance.country_dial_code)
        instance.country_code = validated_data.pop('country_code', instance.country_code)
        instance.save()
        return instance


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'phone_number', 'country_dial_code', 'country_code')


class TokenSerializer(UserSerializer):
    class Meta:
        model = Token
        fields = ('key', 'user')

    def to_representation(self, instance):
        data = super(TokenSerializer, self).to_representation(instance)
        if instance.user:
            data['user'] = UserSerializer(User.objects.get(id=instance.user.id)).data
        if 'key' in data:
            data['token'] = data.pop('key')
        return data


class OnlineLoginSerializer(LoginSerializer):
    image = serializers.ImageField(required=False, allow_null=True)


class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = ('id', 'suggest_class', 'industry', 'download_quality', 'video_quality')
