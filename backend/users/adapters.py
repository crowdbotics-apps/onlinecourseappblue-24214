from typing import Any

from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings
from django.http import HttpRequest

from phone_verification.utils import send_verification_code


class AccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request: HttpRequest):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)

    def send_confirmation_mail(self, request, emailconfirmation, signup):
        otp_key = send_verification_code(emailconfirmation.email_address.user)
        message = otp_key + ' is your One Time Authentication PIN for Account verification.'
        ctx = {
            "user_display": emailconfirmation.email_address.user.email,
            "user": emailconfirmation.email_address.user,
            "activate_url": message,
        }
        if signup:
            email_template = 'account/email/email_confirmation_signup'
        else:
            email_template = 'account/email/email_confirmation'
        # self.send_mail(email_template, emailconfirmation.email_address.email, ctx)


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request: HttpRequest, sociallogin: Any):
        return getattr(settings, "SOCIALACCOUNT_ALLOW_REGISTRATION", True)
