from rest_framework import viewsets, status
from itertools import chain

from rest_framework.decorators import action
from rest_framework.response import Response

from notifications.api.v1.serializers import NotificationSerializer
from notifications.models import Notification, UserNotification
from onlinecourseappblue_24214.pagination import StandardResultsSetPagination


class NotificationViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_queryset(self):
        queryset_private = Notification.objects.filter(send_to=self.request.user)
        queryset_public = Notification.objects.filter(send_to=None)
        queryset = sorted(chain(queryset_private, queryset_public), key=lambda instance: instance.created, reverse=True)
        return queryset

    @action(methods=['get'], detail=False, url_path="count", url_name="count")
    def get_count(self, request):
        queryset = self.get_queryset()
        return Response({"count": len(queryset)}, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save(send_to=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.send_to == self.request.user:
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        return Response({"detail": "not found"}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = Notification.objects.filter(pk=kwargs['pk']).first()
        user = self.request.user
        if instance:
            if instance.send_to == user:
                serializer = self.get_serializer(instance, data=request.data, partial=partial)
                serializer.is_valid(raise_exception=True)
                self.perform_update(serializer)
                return Response(serializer.data)
            else:
                UserNotification.objects.get_or_create(notification=instance, user=user)
                return Response({"message": "Status updated successfully."}, status=status.HTTP_200_OK)
        return Response({"detail": "not found"}, status=status.HTTP_404_NOT_FOUND)

    def perform_update(self, serializer):
        serializer.save(send_to=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = Notification.objects.filter(pk=kwargs['pk']).first()
        if instance and instance.send_to == self.request.user:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"detail": "not found"}, status=status.HTTP_404_NOT_FOUND)
