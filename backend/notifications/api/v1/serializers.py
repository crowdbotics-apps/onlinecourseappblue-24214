from rest_framework import serializers

from course.api.v1.serializers import CourseSerializer
from notifications.models import Notification, UserNotification


class NotificationSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    is_seen = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = '__all__'

    def get_is_seen(self, obj):
        is_seen = False
        if not obj.send_to:
            try:
                user_id = self.context.get('request').user
                UserNotification.objects.get(notification_id=obj.id, user_id=user_id)
                is_seen = True
            except UserNotification.DoesNotExist:
                pass
        return is_seen
