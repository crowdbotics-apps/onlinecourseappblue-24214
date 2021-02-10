from django.urls import path, include
from fcm_django.api.rest_framework import FCMDeviceAuthorizedViewSet
from push_notifications.api.rest_framework import APNSDeviceAuthorizedViewSet, GCMDeviceAuthorizedViewSet
from rest_framework.routers import DefaultRouter
from phone_verification.views import VerifyPhoneNumber, CreateNewKeyViewSet

from home.api.v1.viewsets import (SignupViewSet, LoginViewSet, HomePageViewSet, CustomTextViewSet, AppReportView,
                                  FCMDeviceAuthorizedViewSetCustom)
from users.api.viewsets import UpdateUserProfile, SendAskedQuestionEmail
from users.views import PasswordResetViewSet, ResetPasswordConfirm

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("update-user-profile", UpdateUserProfile, basename="update-user-profile")
router.register("customtext", CustomTextViewSet)
router.register("homepage", HomePageViewSet)
router.register("mobile-devices", FCMDeviceAuthorizedViewSetCustom, basename="mobile-devices"),
router.register(r'device/apns', APNSDeviceAuthorizedViewSet)
router.register(r'device/fcm', GCMDeviceAuthorizedViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("report", AppReportView.as_view(), name="app_report"),
    path('phone-verify/', VerifyPhoneNumber.as_view()),
    # path('create-new-otp/', CreateNewOTP.as_view()),
    path('password-reset/', PasswordResetViewSet.as_view()),
    path('password-reset-confirm/', ResetPasswordConfirm.as_view()),
    path('ask-question/', SendAskedQuestionEmail.as_view()),

    path('phone-resend/', CreateNewKeyViewSet.as_view()),
]
