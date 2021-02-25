from django.conf import settings
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.db import transaction
from django.template.loader import render_to_string
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from fcm_django.models import FCMDevice
from rest_framework.filters import SearchFilter
from rest_framework.response import Response

from course.api.v1.filters import CourseFilter, CategoryFilter, LedgerFilter
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
    Ledger,
    Module,
    ModuleProgress)
from notifications.models import Notification

from onlinecourseappblue_24214.pagination import StandardResultsSetPagination
from .serializers import (
    CategorySerializer,
    CourseSerializer,
    EnrollmentSerializer,
    EventSerializer,
    GroupSerializer,
    LessonSerializer,
    PaymentMethodSerializer,
    RecordingSerializer,
    SubscriptionSerializer,
    SubscriptionTypeSerializer,
    LessonProgressSerializer,
    AssignmentSerializer,
    LedgerSerializer,
    ModuleSerializer)
from rest_framework import viewsets, status

from ...utils import get_customized_serializer


class CategoryViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = CategorySerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = CategoryFilter
    queryset = Category.objects.filter(
        course_categories__isnull=False,
        course_categories__is_published=True
    ).distinct()


class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()


class PaymentMethodViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentMethodSerializer
    queryset = PaymentMethod.objects.all()


class CourseViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filter_class = CourseFilter
    search_fields = ['title', 'author__name', 'categories__name']
    queryset = Course.objects.filter(is_published=True)

    def get_queryset(self):
        queryset = self.queryset
        enrolled_status = self.request.query_params.get('get_enrolled_courses', None)
        author_id = self.request.query_params.get('author_id', None)
        if enrolled_status:
            if str(enrolled_status) == 'true':
                queryset = queryset.filter(enrollment_course__user_id=self.request.user.pk)
            else:
                queryset = queryset.exclude(enrollment_course__user_id=self.request.user.pk)
        if author_id:
            queryset = queryset.filter(author_id=int(author_id))

        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        course_data = {"course": serializer.data}
        return Response(course_data)


class ModuleViewSet(viewsets.ModelViewSet):
    serializer_class = ModuleSerializer
    queryset = Module.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        course = self.request.query_params.get("course")
        if course:
            queryset = queryset.filter(course_id=course)
        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        lessons = Lesson.objects.filter(module_id=instance)
        if lessons:
            module_data = serializer.data
            lesson_serializer = LessonSerializer(lessons, many=True, context={'request': request})
            module_data["lessons"] = lesson_serializer.data
            return Response(module_data)
        return Response(serializer.data)


class LessonViewSet(viewsets.ModelViewSet):
    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        LessonProgress.objects.get_or_create(user=self.request.user, lesson=instance)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer
    queryset = Enrollment.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        user = self.request.user
        if user:
            queryset = queryset.filter(user=user)
        return queryset

    @transaction.atomic()
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            course = self.request.data.get("course", None)
            if course:
                module = Module.objects.filter(course_id=course).first()
                if module:
                    ModuleProgress.objects.get_or_create(module_id=module.pk, user=request.user)
                lesson = Lesson.objects.filter(module_id=module).first()
                if lesson:
                    LessonProgress.objects.get_or_create(
                        lesson_id=lesson.pk,
                        user=request.user,
                        is_opened=True
                    )
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class SubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.all()


class SubscriptionTypeViewSet(viewsets.ModelViewSet):
    serializer_class = SubscriptionTypeSerializer
    queryset = SubscriptionType.objects.all()


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()


class RecordingViewSet(viewsets.ModelViewSet):
    serializer_class = RecordingSerializer
    queryset = Recording.objects.all()


class LessonProgressViewSet(viewsets.ModelViewSet):
    serializer_class = LessonProgressSerializer
    queryset = LessonProgress.objects.all()


class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()

    def list(self, request, *args, **kwargs):
        item_serializer = None
        queryset = self.filter_queryset(self.get_queryset())
        object_id = self.request.query_params.get('object_id', None)
        description = {}
        if object_id:
            try:
                content_object = Assignment.objects.get(pk=object_id).content_object
                item_serializer, description = get_customized_serializer(content_object)
            except AttributeError:
                pass

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        if item_serializer:
            instance = queryset.filter(pk=object_id).first()
            serializer = self.get_serializer(instance).data
            serializer["description"] = description
            assignment = {"assignment": serializer, "items": item_serializer.data}
            return Response(assignment)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class LedgerViewSet(viewsets.ModelViewSet):
    serializer_class = LedgerSerializer
    filter_backends = [DjangoFilterBackend]
    filter_class = LedgerFilter
    queryset = Ledger.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data
        user = instance.user
        course = instance.course

        current_lesson = data.pop('lesson', None)
        if current_lesson:
            next_lesson = Lesson.objects.filter(id__gt=current_lesson)
            next_lesson_same_course = next_lesson.filter(course_id=course.pk).first()
            if next_lesson_same_course:
                LessonProgress.objects.get_or_create(user=instance.user, lesson_id=next_lesson_same_course.pk,
                                                     is_opened=True)
            else:
                if not instance.is_completed:
                    instance.is_completed = True
                    instance.save()
                    title = "Congratulation!"
                    message = f"You have successfully completed the {course.title} course."
                    Notification.objects.create(send_to=user, title=title, message=message, course=course)
                    if user.email:
                        from easy_pdf.rendering import render_to_pdf
                        html_template = 'course/completion_mail.html'
                        context = {
                            "name": user.name,
                            "course": course.title,
                            "date": timezone.now().date(),
                            "top": settings.BASE_DIR + '/static/' + 'img/top.png',
                            "middle": settings.BASE_DIR + '/static/' + 'img/middle.png',
                            "bottom": settings.BASE_DIR + '/static/' + 'img/bottom.png'
                        }
                        certificate = render_to_pdf('course/completion_certificate.html', context)

                        html_message = render_to_string(html_template, context)
                        message = EmailMultiAlternatives('COURSE COMPLETION', html_message, settings.EMAIL_HOST_USER,
                                                         [user.email])
                        message.attach_alternative(html_message, 'text/html')
                        message.attach("certificate.pdf", certificate)
                        message.send()

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
