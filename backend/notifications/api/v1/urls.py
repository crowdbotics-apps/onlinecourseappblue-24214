from django.urls import path, include
from rest_framework.routers import DefaultRouter
from notifications.api.v1.viewsets import NotificationViewSet


router = DefaultRouter()
router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = [
    path("", include(router.urls)),
]
