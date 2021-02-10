from django.conf import settings
from django.db import models

from course.models import Course


class Notification(models.Model):
    send_to = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=250)
    message = models.TextField(max_length=500)
    is_opened = models.BooleanField(default=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True, editable=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Notifications'
        ordering = ("-created",)


class UserNotification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)

    def __str__(self):
        return self.notification.title
