from django.db.models.signals import post_save
from django.dispatch import receiver
from push_notifications.models import APNSDevice, GCMDevice

from course.api.v1.serializers import NotificationCourseSerializer
from notifications.models import Notification


@receiver(post_save, sender=Notification)
def send_notification_message(sender, instance, created, **kwargs):
    if created:
        if instance.send_to:
            fcm_devices = GCMDevice.objects.filter(user=instance.send_to)
            apns_devices = APNSDevice.objects.filter(user=instance.send_to)
        else:
            fcm_devices = GCMDevice.objects.filter(user__role=0)
            apns_devices = APNSDevice.objects.filter(user__role=0)

        course_serializer = NotificationCourseSerializer(instance.course, many=False,
                                                         context={"user": instance.send_to})

        fcm_devices.send_message(title=instance.title, message=instance.message, extra={"course": course_serializer.data})
        apns_devices.send_message(message={"body": instance.message},
                                  extra={"course": course_serializer.data})
