import random
import re
import phonenumbers
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from twilio.rest import Client

from phone_verification.models import PhoneVerificationKey, PhoneVerification
from onlinecourseappblue_24214 import settings

User = get_user_model()

regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'


def is_valid_email(email):
    """ :returns: True if provided email is valid else False."""
    return True if re.search(regex, email) else False


def send_message(number, message):
    try:
        from_ = settings.TWILIO_NUMBER
        client = Client(settings.TWILIO_ACCOUNT_ID, settings.TWILIO_AUTH_TOKEN)
        client.messages.create(body=message, to=number, from_=from_)
        return True
    except Exception as ex:
        print(ex)
        return False


def send_email_key_on_profile_update(user, email):
    key = str(random.randint(1000, 9999))
    try:
        PhoneVerificationKey.objects.filter(user=user).delete()
        PhoneVerificationKey.objects.create(user=user, key=key)
        message = key + ' is your One Time Authentication PIN for email verification.'
        send_mail("OTP", message, settings.EMAIL_HOST_USER, [email])
        return True
    except Exception as ex:
        return False


def send_email_verification_key(user):
    key = str(random.randint(1000, 9999))
    try:
        PhoneVerificationKey.objects.filter(user=user).delete()
        PhoneVerificationKey.objects.create(user=user, key=key)
        message = key + ' is your One Time Authentication PIN for email verification.'
        send_mail("OTP", message, settings.EMAIL_HOST_USER, [user.email])
        return True
    except Exception as ex:
        return False


def create_new_user_key(user, key, message):
    PhoneVerification.objects.create(user=user, phone=user.phone_number)
    PhoneVerificationKey.objects.create(user=user, key=key)
    send_message(user.phone_number.as_e164, message)


def recreate_new_user_key(user, number):
    key = str(random.randint(1000, 9999))
    PhoneVerificationKey.objects.create(user=user, key=key)
    message = key + ' is your One Time Authentication PIN for Phone Number verification.'
    return send_message(number, message)


def save_phone_verification(user, message, key):
    try:
        create_new_user_key(user, key, message)
    except Exception as e:
        return False


def send_verification_code(user):
    key = str(random.randint(1000, 9999))
    message = key + ' is your One Time Authentication PIN for Phone Number verification.'
    save_phone_verification(user, message, key)
    return key


def send_password_reset_token_phone(token_key, number):
    message = token_key + ' is your One Time Authentication PIN for Phone Number verification.'
    return send_message(number, message)


def is_valid_phone_number(number):
    return True if number.startswith('+') and str(number[1:]).isnumeric() else number.isnumeric()


def get_validated_phone_number(phone):
    validate_phone = phonenumbers.parse(phone, None)
    country_code = validate_phone.country_code
    national_number = validate_phone.national_number
    number = '+' + str(country_code) + str(national_number)
    return number


def is_email_or_phone(username):
    if is_valid_phone_number(username):
        return "phone"
    elif is_valid_email(username):
        return "email"
    return False
