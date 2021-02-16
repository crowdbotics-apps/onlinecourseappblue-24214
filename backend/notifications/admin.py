from django.contrib import admin
from django import forms
from notifications.models import Notification, UserNotification


class NotificationAdminForm(forms.ModelForm):
    class Meta:
        model = Notification
        fields = '__all__'


class NotificationAdmin(admin.ModelAdmin):
    form = NotificationAdminForm
    list_display = ('title', 'is_opened', 'send_to', 'message', 'created', 'course')
    readonly_fields = ['created']
    list_per_page = 50
    search_fields = ('title',)


class UserNotificationAdminForm(forms.ModelForm):
    class Meta:
        model = UserNotification
        fields = '__all__'


class UserNotificationAdmin(admin.ModelAdmin):
    form = UserNotificationAdminForm
    list_display = ('user', 'notification')


admin.site.register(Notification, NotificationAdmin)
admin.site.register(UserNotification, UserNotificationAdmin)
