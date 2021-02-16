from django.db.models.signals import post_save
from django.dispatch import receiver

from allauth.account.models import EmailAddress
from users.models import User


@receiver(post_save, sender=User)
def save_super_user_emailaddress(sender, instance, created, **kwargs):
    if instance.email and instance.is_superuser:
        try:
            EmailAddress.objects.get_or_create(user=instance, email=instance.email, verified=True, primary=True)
        except:
            pass
