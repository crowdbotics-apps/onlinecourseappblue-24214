from django.db.models.signals import post_save
from django.dispatch import receiver

from course.models import Enrollment
from notifications.models import Notification


@receiver(post_save, sender=Enrollment)
def save_notification_message(sender, instance, created, **kwargs):
    if created:
        title = "Congratulation!"
        message = f"You have enrolled in {instance.course.title} course."
        Notification.objects.create(send_to=instance.user, title=title, message=message, course=instance.course)
