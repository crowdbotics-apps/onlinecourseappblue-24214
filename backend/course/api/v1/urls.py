from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
    CategoryViewSet,
    CourseViewSet,
    EnrollmentViewSet,
    EventViewSet,
    GroupViewSet,
    LessonViewSet,
    PaymentMethodViewSet,
    RecordingViewSet,
    SubscriptionViewSet,
    SubscriptionTypeViewSet,
    LessonProgressViewSet,
    AssignmentViewSet,
    LedgerViewSet,
    ModuleViewSet)

router = DefaultRouter()
router.register("category", CategoryViewSet)
router.register("group", GroupViewSet)
router.register("paymentmethod", PaymentMethodViewSet)
router.register("course", CourseViewSet)
router.register("module", ModuleViewSet)
router.register("lesson", LessonViewSet)
router.register("enrollment", EnrollmentViewSet)
router.register("subscription", SubscriptionViewSet)
router.register("subscriptiontype", SubscriptionTypeViewSet)
router.register("event", EventViewSet)
router.register("recording", RecordingViewSet)
router.register("lesson-progress", LessonProgressViewSet)
router.register("assignments", AssignmentViewSet)
router.register("ledger", LedgerViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
