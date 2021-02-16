from datetime import timedelta

from allauth.account.adapter import get_adapter
from django.conf import settings
from django.contrib.auth.password_validation import validate_password, get_password_validators
from django.core.exceptions import ValidationError
from django.db import transaction
from django.utils import timezone
from django_rest_passwordreset.models import ResetPasswordToken, get_password_reset_token_expiry_time
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from django.utils.translation import ugettext_lazy as _
from rest_framework.authtoken.models import Token

from users.services.UserUtils import UserUtils
from users.models import User


class CustomRegistrationSerializer(RegisterSerializer):  # noqa
    username = serializers.HiddenField(
        help_text=_("You can enter an email or a phone number. (e.g. abc@abc.com / +92123456879)"),
        label=_("Email/Phone"),
        required=False, default="")
    name = serializers.CharField(required=True, label=_("Full Name"))
    country_dial_code = serializers.CharField(required=True, label=_("Country Dial Code"))
    country_code = serializers.CharField(required=True, label=_("Country Code"))
    email = serializers.EmailField(required=True)
    phone_number = PhoneNumberField()
    password2 = serializers.HiddenField(required=False, default="")  # overriding super's field
    image = serializers.ImageField(allow_null=True)

    def validate(self, data):
        return data

    @transaction.atomic()
    def save(self, request):
        cleaned_data = self.validated_data
        name = cleaned_data.get('name')
        email = cleaned_data.get('email')
        phone_number = cleaned_data.get('phone_number')
        country_dial_code = cleaned_data.get('country_dial_code')
        country_code = cleaned_data.get('country_code')
        adapter = get_adapter()
        user = adapter.new_user(request)
        # setup_user_email(request, user, [])
        if 'password1' in cleaned_data:
            user.set_password(cleaned_data["password1"])
        else:
            user.set_unusable_password()
        user.name = name
        user.email = email
        user.phone_number = phone_number
        user.username = email
        user.country_dial_code = country_dial_code
        user.country_code = country_code
        user.save()
        return user


class PasswordResetSerializer(serializers.Serializer):
    phone_number = serializers.CharField(required=True)


class PasswordResetConfirmSerializer(serializers.Serializer):
    key = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, attrs):
        password = attrs.get("password")
        token = attrs.get("key")
        password_reset_token_validation_time = get_password_reset_token_expiry_time()
        reset_password_token = ResetPasswordToken.objects.filter(key=token).first()
        if reset_password_token is None:
            raise serializers.ValidationError(err_msg("error", "Provided code is invalid."))
        expiry_date = reset_password_token.created_at + timedelta(hours=password_reset_token_validation_time)
        if timezone.now() > expiry_date:
            reset_password_token.delete()
            raise serializers.ValidationError(err_msg("error", "Provided code is expired."))
        if not reset_password_token.user.has_usable_password():
            raise serializers.ValidationError(err_msg("error", "User password is not usable."))
        try:
            validate_password(
                password,
                user=reset_password_token.user,
                password_validators=get_password_validators(settings.AUTH_PASSWORD_VALIDATORS)
            )
        except ValidationError as e:
            raise serializers.ValidationError(err_msg(msg=e.messages))
        return attrs


class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(required=False)

    class Meta:
        model = User
        fields = ('id', 'email', 'token', 'name', 'image', 'phone_number', 'country_dial_code', 'country_code',
                  'role', 'username')

    def validate(self, data):
        res = super(UserSerializer, self).validate(data)
        email = data.get("email")
        if email:
            try:
                user = User.objects.get(email__iexact=email)
                if user:
                    raise ValidationError("User Already Exist")
            except User.DoesNotExist:
                pass
        return res

    def create(self, validated_data):
        """
        Overriding create method to create User profile
        """
        profile_data = None
        if "profile" in validated_data:
            profile_data = validated_data.pop("profile")
        validated_data.update({"email": validated_data["email"]})
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data["password"])
        user.is_active = False
        user.save()
        return user

    def update(self, instance, validated_data):
        """
        Overriding update method to update User profile using single endpoint
        """
        # if validated_data.get('profile', []).__len__() < 1:
        # 	validated_data = self.initial_data
        profile_data = None
        if "profile" in validated_data:
            profile_data = validated_data.pop("profile")
        # Update user data
        super(UserSerializer, self).update(instance, validated_data)
        password = validated_data.get("password", None)
        if password:
            instance.set_password(password)
            instance.save()

        # Update user profile data
        return instance

    def get_token(self, obj):
        token, _ = Token.objects.get_or_create(user=obj)
        return token.key


class SocialSerializer(serializers.Serializer):
    access_token = serializers.CharField()

    def social_login(self, user_info, social_platform):
        social_id = user_info.pop("id")
        request = self.context.get("request")
        profile = UserUtils.get_profle_meta_details(request.META,
                                                    social_id=str(social_id),
                                                    social_platform=social_platform,
                                                    user_info=user_info
                                                    )
        update_data = {"is_active": True, "profile": profile}
        if "name" in user_info and user_info['name']:
            update_data.update({
                "name": user_info['name']
            })
        try:
            user = User.objects.get(email__iexact=user_info["email"])
        except User.DoesNotExist:
            user_dict = UserUtils.get_user_social_dict(user_info)
            user = UserSerializer().create(user_dict)
        except KeyError:
            raise serializers.ValidationError("Email not found")
        user = UserSerializer().update(instance=user,
                                       validated_data=update_data)

        return user


def err_msg(field="", msg=""):
    if field is None or field == "":
        return _(msg)
    return {field: [_(msg)]}
