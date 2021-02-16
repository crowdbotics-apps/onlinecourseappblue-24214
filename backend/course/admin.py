from django import forms
from django.conf.urls import url
from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from django.http import HttpResponseRedirect
from moviepy.video.io.VideoFileClip import VideoFileClip

from .models import (
    Category, Course, Lesson, Enrollment, Event, Group, Recording, Subscription, SubscriptionType, LessonProgress,
    Assignment, HousingAssignment, HousingItems, Transportation, TransportItems, ChildCare, ChildCareItems,
    GroceryAssignment, GroceryItems, Ledger, LifeHappensAssignment, RestaurantAssignment, RestaurantsItems,
    CreditCardAssignment, AssignmentProgress, Electronic, PersonalCare, HomeFurnishing, ElectronicItems,
    PersonalCareItems, HomeFurnishingItems,
    EntertainmentItems, Entertainment, PaymentMethod, Introduction)
from .utils import convert_second_to_time


class CategoryAdminForm(forms.ModelForm):

    class Meta:
        model = Category
        fields = '__all__'


class CategoryAdmin(admin.ModelAdmin):
    form = CategoryAdminForm
    list_display = ['name', 'icon']


class GroupAdminForm(forms.ModelForm):

    class Meta:
        model = Group
        fields = '__all__'


class GroupAdmin(admin.ModelAdmin):
    form = GroupAdminForm
    list_display = ['name']


class CourseAdminForm(forms.ModelForm):

    class Meta:
        model = Course
        fields = '__all__'


class CourseAdmin(admin.ModelAdmin):
    form = CourseAdminForm
    list_display = ['author', 'title', 'subscription_status', 'duration', 'is_published', 'send_notification_link']

    def get_urls(self):
        urls = super(CourseAdmin, self).get_urls()
        urls += [
            url(r'^send-notification/(?P<pk>[0-9a-f-]+)$', self.send_push_notification,
                name='send_push_notification'),
        ]
        return urls

    def send_notification_link(self, obj):
        return format_html(
            '<a href="{}">'
            '<h4 align="center" style="color:white; background-color: grey; padding: 8px; font-size: 130%;'
            ' border: 2px solid grey; border-radius:20px; ">Send Notification</h4></a>',
            reverse('admin:send_push_notification', args=[obj.pk])
        )

    send_notification_link.short_description = "Send Notification"

    def send_push_notification(self, request, pk):
        course = Course.objects.get(pk=pk)
        course.save_notification()

        return HttpResponseRedirect('/admin/course/course/')


class LessonAdminForm(forms.ModelForm):

    class Meta:
        model = Lesson
        fields = '__all__'


class LessonAdmin(admin.ModelAdmin):
    form = LessonAdminForm
    list_display = ['title', 'course', 'media', 'duration']

    def save_model(self, request, obj, form, change):
        video = request.FILES.get('media')
        if video:
            video = VideoFileClip(video.file.name)
            obj.duration = convert_second_to_time(video.duration)
        obj.save()


class PaymentMethodForm(forms.ModelForm):

    class Meta:
        model = PaymentMethod
        fields = '__all__'


class PaymentMethodAdmin(admin.ModelAdmin):
    form = PaymentMethodForm
    list_display = ['user', 'primary', 'token']


class LessonProgressAdminForm(forms.ModelForm):

    class Meta:
        model = LessonProgress
        fields = '__all__'


class AssignmentAdminForm(forms.ModelForm):

    class Meta:
        model = Assignment
        fields = '__all__'


class AssignmentAdmin(admin.ModelAdmin):
    form = AssignmentAdminForm
    list_display = ['title', 'min_range', 'max_range', 'inline', 'content_type', 'object_id']

    related_lookup_fields = {
        'generic': [['content_type', 'object_id']],
    }

    class Meta:
        js = ["js/media-types.js", ]


class LessonProgressAdmin(admin.ModelAdmin):
    form = LessonProgressAdminForm
    list_display = ['lesson', 'user', 'is_completed', 'is_opened']
    readonly_fields = ['is_completed', 'is_opened']


class IntroductionAdminForm(forms.ModelForm):
    class Meta:
        model = Introduction
        fields = '__all__'


class IntroductionAdmin(admin.ModelAdmin):
    form = IntroductionAdminForm
    list_display = ['description', 'image', 'file']


class HousingItemsAdminForm(forms.ModelForm):
    class Meta:
        model = HousingItems
        fields = '__all__'


class HousingItemsAdmin(admin.ModelAdmin):
    form = HousingItemsAdminForm
    list_display = ['house', 'title', 'description', 'price']


class TransportItemsAdminForm(forms.ModelForm):
    class Meta:
        model = TransportItems
        fields = '__all__'


class TransportItemsAdmin(admin.ModelAdmin):
    form = TransportItemsAdminForm
    list_display = ['transportation', 'title', 'total', 'type']


class ChildCareItemsAdminForm(forms.ModelForm):
    class Meta:
        model = ChildCareItems
        fields = '__all__'


class ChildCareItemsAdmin(admin.ModelAdmin):
    form = ChildCareItemsAdminForm
    list_display = ['child_care', 'title', 'price', 'type']


class GroceryItemsAdminForm(forms.ModelForm):
    class Meta:
        model = GroceryItems
        fields = '__all__'


class GroceryItemsAdmin(admin.ModelAdmin):
    form = ChildCareItemsAdminForm
    list_display = ['grocery', 'title', 'description', 'price']


class LifeHappensAdminForm(forms.ModelForm):
    class Meta:
        model = LifeHappensAssignment
        fields = '__all__'


class LifeHappensAdmin(admin.ModelAdmin):
    form = LifeHappensAdminForm
    list_display = ['loss', 'description']


class RestaurantsItemsAdminForm(forms.ModelForm):
    class Meta:
        model = RestaurantsItems
        fields = '__all__'


class RestaurantsItemsAdmin(admin.ModelAdmin):
    form = RestaurantsItemsAdminForm
    list_display = ['restaurant', 'title', 'description', 'price', 'type']


class CreditCardAdminForm(forms.ModelForm):
    class Meta:
        model = CreditCardAssignment
        fields = '__all__'


class CreditCardAdmin(admin.ModelAdmin):
    form = CreditCardAdminForm
    list_display = ['description', 'min_payment', 'current_balance']


class ElectronicItemsAdminForm(forms.ModelForm):
    class Meta:
        model = ElectronicItems
        fields = '__all__'


class ElectronicItemsAdmin(admin.ModelAdmin):
    form = ElectronicItemsAdminForm
    list_display = ['electronic', 'title', 'price']


# class ClothingItemsAdminForm(forms.ModelForm):
#     class Meta:
#         model = ClothingItems
#         fields = '__all__'


# class ClothingItemsAdmin(admin.ModelAdmin):
#     form = ElectronicItemsAdminForm
#     list_display = ['clothing', 'title', 'description', 'price']


class PersonalCareItemsAdminForm(forms.ModelForm):
    class Meta:
        model = PersonalCareItems
        fields = '__all__'


class PersonalCareItemsAdmin(admin.ModelAdmin):
    form = PersonalCareItemsAdminForm
    list_display = ['personal_care', 'title', 'price', 'type']


class HomeFurnishingItemsAdminForm(forms.ModelForm):
    class Meta:
        model = HomeFurnishingItems
        fields = '__all__'


class HomeFurnishingItemsAdmin(admin.ModelAdmin):
    form = HomeFurnishingItemsAdminForm
    list_display = ['home_furnishing', 'title', 'price', 'type']


class EntertainmentItemsAdminForm(forms.ModelForm):
    class Meta:
        model = EntertainmentItems
        fields = '__all__'


class EntertainmentItemsAdmin(admin.ModelAdmin):
    form = ElectronicItemsAdminForm
    list_display = ['entertainment', 'title', 'price']


class LedgerAdminForm(forms.ModelForm):
    class Meta:
        model = Ledger
        fields = '__all__'


class LedgerAdmin(admin.ModelAdmin):
    form = LedgerAdminForm
    list_display = ['course', 'user', 'initial_balance', 'saving', 'giving', 'housing', 'transportation',
                    'child_care', 'groceries', 'life_happens', 'dining_out', 'credit_card',
                    'electronics', 'personal_care', 'home_furnishings', 'entertainment', 'is_completed'
                    ]


class AssignmentProgressAdminForm(forms.ModelForm):
    class Meta:
        model = AssignmentProgress
        fields = '__all__'


class AssignmentProgressAdmin(admin.ModelAdmin):
    form = AssignmentProgressAdminForm
    list_display = ['assignment', 'user']


# class ModuleAdminForm(forms.ModelForm):
#
#     class Meta:
#         model = Module
#         fields = '__all__'


# class ModuleAdmin(admin.ModelAdmin):
#     form = ModuleAdminForm
#     list_display = ['course', 'title']


class EnrollmentAdminForm(forms.ModelForm):

    class Meta:
        model = Enrollment
        fields = '__all__'


class EnrollmentAdmin(admin.ModelAdmin):
    form = EnrollmentAdminForm
    list_display = ['user', 'course']


class SubscriptionAdminForm(forms.ModelForm):

    class Meta:
        model = Subscription
        fields = '__all__'


class SubscriptionAdmin(admin.ModelAdmin):
    form = SubscriptionAdminForm
    list_display = ['subscription_type', 'user']


class SubscriptionTypeAdminForm(forms.ModelForm):

    class Meta:
        model = SubscriptionType
        fields = '__all__'


class SubscriptionTypeAdmin(admin.ModelAdmin):
    form = SubscriptionTypeAdminForm
    list_display = ['name']


class EventAdminForm(forms.ModelForm):

    class Meta:
        model = Event
        fields = '__all__'


class EventAdmin(admin.ModelAdmin):
    form = EventAdminForm
    list_display = ['name', 'user', 'date']


class RecordingAdminForm(forms.ModelForm):

    class Meta:
        model = Recording
        fields = '__all__'


class RecordingAdmin(admin.ModelAdmin):
    form = RecordingAdminForm
    list_display = ['event', 'media', 'user', 'published']


admin.site.register(Group, GroupAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(PaymentMethod, )
admin.site.register(Lesson, LessonAdmin)
admin.site.register(LessonProgress, LessonProgressAdmin)
admin.site.register(HousingAssignment)
admin.site.register(Transportation)
admin.site.register(ChildCare)
admin.site.register(GroceryAssignment)
admin.site.register(RestaurantAssignment)
admin.site.register(Electronic)
# admin.site.register(Clothing)
admin.site.register(PersonalCare)
admin.site.register(HomeFurnishing)
admin.site.register(Entertainment)
admin.site.register(Ledger, LedgerAdmin)
admin.site.register(AssignmentProgress, AssignmentProgressAdmin)
admin.site.register(Introduction, IntroductionAdmin)
admin.site.register(HousingItems, HousingItemsAdmin)
admin.site.register(TransportItems, TransportItemsAdmin)
admin.site.register(ChildCareItems, ChildCareItemsAdmin)
admin.site.register(GroceryItems, GroceryItemsAdmin)
admin.site.register(LifeHappensAssignment, LifeHappensAdmin)
admin.site.register(RestaurantsItems, RestaurantsItemsAdmin)
admin.site.register(CreditCardAssignment, CreditCardAdmin)
admin.site.register(ElectronicItems, ElectronicItemsAdmin)
# admin.site.register(ClothingItems, ClothingItemsAdmin)
admin.site.register(PersonalCareItems, PersonalCareItemsAdmin)
admin.site.register(HomeFurnishingItems, HomeFurnishingItemsAdmin)
admin.site.register(EntertainmentItems, EntertainmentItemsAdmin)
# admin.site.register(Module, ModuleAdmin)
admin.site.register(Enrollment, EnrollmentAdmin)
admin.site.register(Assignment, AssignmentAdmin)
admin.site.register(Subscription, SubscriptionAdmin)
admin.site.register(SubscriptionType, SubscriptionTypeAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Recording, RecordingAdmin)
