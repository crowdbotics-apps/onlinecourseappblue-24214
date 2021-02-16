from django.conf import settings
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.db import transaction
from django.template.loader import render_to_string
from django.utils import timezone
from rest_framework import serializers
from django.utils.translation import gettext, gettext_lazy as _
from course.models import (
    Category,
    Course,
    Enrollment,
    Event,
    Group,
    Lesson,
    PaymentMethod,
    Recording,
    Subscription,
    SubscriptionType,
    LessonProgress,
    Assignment,
    HousingItems,
    TransportItems,
    ChildCareItems,
    GroceryItems, Ledger, LifeHappensAssignment, RestaurantsItems, CreditCardAssignment, AssignmentProgress,
    ElectronicItems, PersonalCareItems, HomeFurnishingItems, EntertainmentItems, Introduction)
from notifications.models import Notification


class CategorySerializer(serializers.ModelSerializer):
    total_courses = serializers.ReadOnlyField()

    class Meta:
        model = Category
        fields = "__all__"


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = "__all__"


class LessonProgressSerializer(serializers.ModelSerializer):

    class Meta:
        model = LessonProgress
        fields = "__all__"

    @transaction.atomic()
    def create(self, validated_data):
        current_lesson = validated_data.get('lesson')
        user = validated_data.get('user')
        instance, created = LessonProgress.objects.get_or_create(user=user, lesson=current_lesson)
        if not created:
            instance.is_completed = True
            assignment = Assignment.objects.filter(lesson=current_lesson).first()
            if assignment:
                AssignmentProgress.objects.get_or_create(assignment=assignment, user=user)
            else:
                next_lesson = Lesson.objects.filter(id__gt=current_lesson.pk)
                next_lesson_same_course = next_lesson.filter(course_id=current_lesson.course.pk).first()
                if next_lesson_same_course:
                    LessonProgress.objects.get_or_create(user=user, lesson_id=next_lesson_same_course.pk,
                                                         is_opened=True)

        instance.save()
        return instance


class NotificationCourseSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)
    author_image = serializers.ImageField(source='author.image', read_only=True)
    duration = serializers.ReadOnlyField()
    lesson_progress = serializers.SerializerMethodField(read_only=True)
    is_enrolled = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Course
        fields = "__all__"

    def get_lesson_progress(self, obj):
        lessons = LessonProgress.objects.filter(
            lesson__course_id=obj.pk,
            user=self.context.get('user'),
            is_completed=True
        ).count()
        total_lessons = Lesson.objects.filter(course_id=obj.pk).count()
        if lessons:
            return lessons / total_lessons
        return 0.0

    def get_is_enrolled(self, obj):
        return Course.objects.filter(
            enrollment_course__user=self.context.get('user'), pk=obj.pk
        ).exists()


class CourseSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)
    author_image = serializers.ImageField(source='author.image', read_only=True)
    duration = serializers.ReadOnlyField()
    lesson_progress = serializers.SerializerMethodField(read_only=True)
    is_enrolled = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Course
        fields = "__all__"

    def get_lesson_progress(self, obj):
        lessons = LessonProgress.objects.filter(
            lesson__course_id=obj.pk,
            user_id=self.context.get('request').user.id,
            is_completed=True
        ).count()
        total_lessons = Lesson.objects.filter(course_id=obj.pk).count()
        if lessons:
            return lessons / total_lessons
        return 0.0

    def get_is_enrolled(self, obj):
        if Course.objects.filter(
            enrollment_course__user_id=self.context.get('request').user.id, pk=obj.pk
        ).exists():
            return True
        return False


class LessonSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField()
    is_opened = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = "__all__"

    def get_is_completed(self, obj):
        return LessonProgress.objects.filter(
            lesson=obj.pk,
            user_id=self.context.get('request').user.id,
            is_completed=True
        ).exists()

    def get_is_opened(self, obj):
        return LessonProgress.objects.filter(
            lesson=obj.pk,
            user_id=self.context.get('request').user.id,
            is_opened=True
        ).exists()


class AssignmentSerializer(serializers.ModelSerializer):
    is_opened = serializers.SerializerMethodField()

    class Meta:
        model = Assignment
        fields = "__all__"

    def get_is_opened(self, obj):
        return AssignmentProgress.objects.filter(
            assignment=obj.pk,
            user_id=self.context.get('request').user.id
        ).exists()


class EnrollmentSerializer(serializers.ModelSerializer):
    course_detail = CourseSerializer(read_only=True, source='course')

    class Meta:
        model = Enrollment
        fields = "__all__"

        validators = [
            serializers.UniqueTogetherValidator(
                queryset=model.objects.all(),
                fields=('user', 'course'),
                message=_("Already enrolled in this course.")
            )
        ]


class LedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ledger
        fields = "__all__"


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = "__all__"


class SubscriptionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionType
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class RecordingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recording
        fields = "__all__"


class IntroductionAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Introduction
        fields = "__all__"


class HousingItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HousingItems
        fields = "__all__"


class TransportItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransportItems
        fields = "__all__"


class ChildCareItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildCareItems
        fields = "__all__"


class GroceryItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryItems
        fields = "__all__"


class LifeHappensSerializer(serializers.ModelSerializer):
    class Meta:
        model = LifeHappensAssignment
        fields = "__all__"


class RestaurantsItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantsItems
        fields = "__all__"


class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCardAssignment
        fields = "__all__"


class ElectronicItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectronicItems
        fields = "__all__"


# class ClothingItemsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ClothingItems
#         fields = "__all__"


class PersonalCareItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalCareItems
        fields = "__all__"


class HomeFurnishingItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeFurnishingItems
        fields = "__all__"


class EntertainmentItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntertainmentItems
        fields = "__all__"
