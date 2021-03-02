from django.urls import path, include
from rest_framework.routers import DefaultRouter
from payments import api

router = DefaultRouter()
router.register(r'checkout', api.StripeCustomerViewSet, basename="checkout")
router.register(r'cancel', api.CancelSubscriptionStripeCustomerViewSet, basename="cancel")
router.register(r'plans', api.AllPlansStripeCustomerViewSet, basename="plans")

urlpatterns = [
    path("", include(router.urls)),
    # url(r'^test-payment/$', views.test_payment),
]
