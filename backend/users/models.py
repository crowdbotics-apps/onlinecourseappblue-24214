from allauth.account.models import EmailAddress
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.urls import reverse
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser

from phone_verification.models import PhoneVerification


class CustomUserManager(BaseUserManager):
    def create_user(self, email, phone_number=None, username=None, image=None, password=None, is_admin=False, is_staff=False, is_active=True):
        if not email:
            raise ValueError("Your facebook account must have an email.")

        if User.objects.exclude(phone_number__isnull=True).filter(phone_number__exact=phone_number):
            raise ValueError("User must have a Unique phone number")
        user = self.model(
            email=self.normalize_email(email)
        )
        user.set_password(password)  # change password to hash
        user.image = image
        user.is_admin = is_admin
        user.is_staff = is_staff
        user.is_active = is_active
        if not username:
            user.username = user.email
        else:
            user.username = username
        user.phone_number = phone_number
        user.role = user.STUDENT
        user.save(using=self._db)
        return user

    def create_superuser(self, email, phone_number=None, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email")

        if not password:
            raise ValueError("User must have a password")
        user = self.model(
            email=self.normalize_email(email)
        )
        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.role = user.ADMIN
        user.username = email
        user.phone_number = phone_number
        user.save(using=self._db)
        if phone_number:
            PhoneVerification.objects.create(user=user, phone=user.phone_number, verified=True)
        if email:
            EmailAddress.objects.create(user=user, email=email, verified=True, primary=True)
        return user


class OnlyActiveManager(UserManager):
    def get_queryset(self):
        return super(OnlyActiveManager, self).get_queryset()


class User(AbstractUser):
    STUDENT = 0
    AUTHOR = 1
    ADMIN = 2

    ROLE_CHOICES = ((ADMIN, 'Admin'), (AUTHOR, 'Author'), (STUDENT, 'Student'))

    # objects = CustomUserManager()
    active = OnlyActiveManager()
    username = models.CharField(_('username'), max_length=150, null=True, blank=True)
    email = models.EmailField(_('email address'), unique=True)
    phone_number = PhoneNumberField(null=True, blank=True)
    name = models.CharField(null=True, blank=True, max_length=255,)
    image = models.ImageField(upload_to="users/", blank=True, null=True)
    group = models.ManyToManyField(
        "course.Group", blank=True, related_name="user_group",
    )
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, default=STUDENT)
    country_dial_code = models.CharField(max_length=10, null=True, blank=True)
    country_code = models.CharField(max_length=10, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    def __str__(self):
        return self.email

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class UserSettings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    is_premium = models.BooleanField(default=False)
    suggest_class = models.BooleanField(default=True, null=True, blank=True)
    industry = models.IntegerField(default=2, null=True, blank=True)
    download_quality = models.IntegerField(default=2, null=True, blank=True)
    video_quality = models.IntegerField(default=2, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'User Settings'
