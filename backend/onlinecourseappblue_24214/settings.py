"""
Django settings for onlinecourseappblue_24214 project.

Generated by 'django-admin startproject' using Django 2.2.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import environ

env = environ.Env()

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DEBUG", default=False)

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env.str("SECRET_KEY")

ALLOWED_HOSTS = env.list("HOST", default=["*"])
SITE_ID = 1

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = env.bool("SECURE_REDIRECT", default=False)


# Application definition

INSTALLED_APPS = [
    "grappelli",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "django_filters",
    "course.apps.CourseConfig",
    "payments.apps.PaymentsConfig",
]
LOCAL_APPS = [
    'home',
    'users.apps.UsersConfig',
    'phone_verification',
    'notifications.apps.NotificationsConfig',
]
THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework.authtoken",
    "django_rest_passwordreset",
    "rest_auth",
    "rest_auth.registration",
    'social_django',  # django social auth
    'rest_social_auth',
    "bootstrap4",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.facebook",
    "django_extensions",
    "drf_yasg",
    # start fcm_django push notifications
    "fcm_django",
    # end fcm_django push notifications
    "phonenumber_field",
    "django_twilio",
    "storages",
    'push_notifications',
    'admin_reorder',
    'djstripe'
]
INSTALLED_APPS += LOCAL_APPS + THIRD_PARTY_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "admin_reorder.middleware.ModelAdminReorder",
]

ADMIN_REORDER = (
    {'app': 'users', 'label': 'Users',
     'models': ('users.User',
                'users.UserSettings',
                )
     },

    {'app': 'notifications', 'label': 'Notifications',
     'models': ('notifications.Notification',
                'notifications.UserNotification',
                )
     },

    {'app': 'phone_verification', 'label': 'Phone Verifications',
     'models': ('phone_verification.PhoneVerification',
                # 'phone_verification.PhoneVerificationKey',
                )
     },
    #
    # {'app': 'django_twilio', 'label': 'Django Twilio',
    #  'models': ('django_twilio.Caller',
    #             'django_twilio.Credential',
    #             )
    #  },
    #
    # {'app': 'push_notifications', 'label': 'Push Notifications Devices',
    #  'models': ('push_notifications.GCMDevice',
    #             'push_notifications.APNSDevice',
    #             'push_notifications.WebPushDevice',
    #             )
    #  },
    #
    # {'app': 'social_django', 'label': 'Social Auth',
    #  'models': ('social_django.UserSocialAuth',
    #             )
    #  },
    #
    # {'app': 'allauth', 'label': 'Social Accounts',
    #  'models': ('allauth.socialaccount.SocialApp',
    #             )
    #  },
    #

    {'app': 'course', 'label': 'Courses',
     'models': ('course.Category',
                'course.Course',
                'course.Enrollment',
                'course.Ledger'
                )
     },
    # Second group: same app, but different label
    {'app': 'course', 'label': 'Course Lessons',
     'models': ('course.Lesson',
                # 'course.LessonProgress'
                )
     },

    {'app': 'payments', 'label': 'Payments',
     'models': ('payments.StripeCustomer',
                )
     },

    {'app': 'course', 'label': 'Course Assignments',
     'models': ('course.Assignment',
                # 'course.AssignmentProgress',
                'course.Introduction',
                'course.HousingAssignment',
                'course.HousingItems',
                'course.Transportation',
                'course.TransportItems',
                'course.ChildCare',
                'course.ChildCareItems',
                'course.GroceryAssignment',
                'course.GroceryItems',
                'course.LifeHappensAssignment',
                'course.RestaurantAssignment',
                'course.RestaurantsItems',
                'course.CreditCardAssignment',
                'course.Electronic',
                'course.ElectronicItems',
                # 'course.Clothing',
                # 'course.ClothingItems',
                'course.PersonalCare',
                'course.PersonalCareItems',
                'course.HomeFurnishing',
                'course.HomeFurnishingItems',
                'course.Entertainment',
                'course.EntertainmentItems',

                )
     },
)

if DEBUG:
    MIDDLEWARE += [
        'silk.middleware.SilkyMiddleware',
    ]
    INSTALLED_APPS += [
        'silk'
    ]

ROOT_URLCONF = 'onlinecourseappblue_24214.urls'

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, 'templates')],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = 'onlinecourseappblue_24214.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases
#
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
#     }
# }

if env.str("DATABASE_URL", default=None):
    DATABASES = {"default": env.db()}

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator", },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator", },
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator", },
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator", },
]

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = "/static/"

MIDDLEWARE += ["whitenoise.middleware.WhiteNoiseMiddleware"]

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "social_core.backends.facebook.FacebookOAuth2",
    "allauth.account.auth_backends.AuthenticationBackend",
)

SOCIAL_AUTH_FACEBOOK_EXTRA_DATA = [  # add this
    ('name', 'name'),
    ('email', 'email'),
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}
SOCIAL_AUTH_URL_NAMESPACE = 'social'
DJANGO_REST_PASSWORDRESET_IP_ADDRESS_HEADER = 'HTTP_X_FORWARDED_FOR'
HTTP_USER_AGENT_HEADER = 'HTTP_USER_AGENT'

# Six Digit Token Generator
DJANGO_REST_PASSWORDRESET_TOKEN_CONFIG = {
    "CLASS": "django_rest_passwordreset.tokens.RandomNumberTokenGenerator",
    "OPTIONS": {
        "min_number": 1000,
        "max_number": 9999
    }
}
OLD_PASSWORD_FIELD_ENABLED = True

# allauth / users
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_VERIFICATION = "mandatory"
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION = True
ACCOUNT_UNIQUE_EMAIL = True
LOGIN_REDIRECT_URL = "users:redirect"

# Stripe
STRIPE_TEST_PUBLIC_KEY = env.str("STRIPE_TEST_PUBLIC_KEY")
STRIPE_TEST_SECRET_KEY = env.str("STRIPE_TEST_SECRET_KEY")
STRIPE_API_KEY = env.str('STRIPE_API_KEY')
STRIPE_LIVE_PUBLIC_KEY = env.str("STRIPE_LIVE_PUBLIC_KEY")
STRIPE_LIVE_SECRET_KEY = env.str("STRIPE_LIVE_SECRET_KEY")
STRIPE_LIVE_MODE = env.bool("STRIPE_LIVE_MODE")
DJSTRIPE_WEBHOOK_SECRET = env.str("DJSTRIPE_WEBHOOK_SECRET")  # Get it from the section in the Stripe dashboard where you added the webhook endpoint
DJSTRIPE_FOREIGN_KEY_TO_FIELD = env.str("DJSTRIPE_FOREIGN_KEY_TO_FIELD")

ACCOUNT_ADAPTER = "users.adapters.AccountAdapter"
SOCIALACCOUNT_ADAPTER = "users.adapters.SocialAccountAdapter"
ACCOUNT_ALLOW_REGISTRATION = env.bool("ACCOUNT_ALLOW_REGISTRATION", True)
SOCIALACCOUNT_ALLOW_REGISTRATION = env.bool("SOCIALACCOUNT_ALLOW_REGISTRATION", True)

REST_AUTH_SERIALIZERS = {
    # Replace password reset serializer to fix 500 error
    "PASSWORD_RESET_SERIALIZER": "home.api.v1.serializers.PasswordSerializer",
    "TOKEN_SERIALIZER": "users.api.serializers.TokenSerializer",
    "LOGIN_SERIALIZER": "users.api.serializers.OnlineLoginSerializer"
}
REST_AUTH_REGISTER_SERIALIZERS = {
    # Use custom serializer that has no username and matches web signup
    "REGISTER_SERIALIZER": "home.api.v1.serializers.SignupSerializer",
}

FILE_UPLOAD_HANDLERS = [
    'django.core.files.uploadhandler.TemporaryFileUploadHandler',
]
# Custom user model
AUTH_USER_MODEL = "users.User"

# start fcm_django push notifications
# FCM_DJANGO_SETTINGS = {"FCM_SERVER_KEY": env.str("FCM_SERVER_KEY", "")}

FCM_DJANGO_SETTINGS = {
    "APP_VERBOSE_NAME": "REGISTER_MOBILE_ DEVICES",
    "FCM_SERVER_KEY": env.str("FCM_SERVER_KEY", ""),
    "ONE_DEVICE_PER_USER": False,
    "DELETE_INACTIVE_DEVICES": False,
}

APNS_AUTH_KEY_PATH = BASE_DIR + '/' + 'onlinecourseappblue_24214/' + 'PushCert_SW9W43D28U.p8'

PUSH_NOTIFICATIONS_SETTINGS = {
    "FCM_API_KEY":  env.str("FCM_SERVER_KEY", ""),
    # "APNS_CERTIFICATE": "/path/to/your/certificate.pem",
    "APNS_AUTH_KEY_PATH": APNS_AUTH_KEY_PATH,
    "APNS_AUTH_KEY_ID": "SW9W43D28U",
    "APNS_TEAM_ID": "6YKR59QXKM",
    "APNS_TOPIC": "com.crowdbotics.onlinecourseappblue-24214",
    "APNS_USE_SANDBOX": False,
    "UPDATE_ON_DUPLICATE_REG_ID": True
}

# end fcm_django push notifications

SOCIAL_AUTH_FACEBOOK_KEY = env.str("SOCIAL_AUTH_FACEBOOK_KEY", "")
SOCIAL_AUTH_FACEBOOK_SECRET = env.str("SOCIAL_AUTH_FACEBOOK_SECRET", "")
SOCIAL_AUTH_FACEBOOK_SCOPE = ['email']
API_VERSION = 7.0

SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PARAMS = {
    'locale': 'us_EN',
    'fields': 'id, name, email'
}
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

if not DEBUG:
    # aws settings
    AWS_ACCESS_KEY_ID = env.str("AWS_ACCESS_KEY_ID", default="")
    AWS_SECRET_ACCESS_KEY = env.str("AWS_SECRET_ACCESS_KEY", default="")
    # # File storage configuration
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    AWS_STORAGE_BUCKET_NAME = env.str("AWS_STORAGE_BUCKET_NAME", default="")
    AWS_S3_REGION_NAME = env.str("AWS_STORAGE_REGION", default="")

    AWS_STORAGE_REGION = env.str("AWS_STORAGE_REGION", default="")
    # default file storage

    AWS_DEFAULT_ACL = 'public-read'
    # AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
    AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
    AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
    # s3 static settings
    # AWS_LOCATION = 'static'
    AWS_MEDIA_LOCATION = 'media'
    # STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}/'
    MEDIA_URL = "https://%s/%s/" % (AWS_S3_CUSTOM_DOMAIN, AWS_MEDIA_LOCATION)
    # STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

TWILIO_NUMBER = env.str("TWILIO_NUMBER", "")
TWILIO_ACCOUNT_ID = env.str("TWILIO_ACCOUNT_ID", "")
TWILIO_AUTH_TOKEN = env.str("TWILIO_AUTH_TOKEN", "")
TWILIO_VERIFY_KEY_EXPIRY_MINUTES = 10

if DEBUG:
    # output email to console instead of sending
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
else:
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_USE_TLS = True
    EMAIL_HOST = "smtp.gmail.com"
    EMAIL_HOST_USER = "localtesting100@gmail.com"
    EMAIL_HOST_PASSWORD = "epftihfoscniqyjb"
    EMAIL_PORT = 587


APPLE_KEY_ID = os.environ.get('APPLE_KEY_ID')

APPLE_TEAM_ID = os.environ.get('APPLE_TEAM_ID')
APPLE_CLIENT_ID = os.environ.get('APPLE_CLIENT_ID')
try:
    APPLE_SECRET_KEY = os.environ.get('APPLE_SECRET_KEY').replace("||n||", '\n')
except:
    APPLE_SECRET_KEY = ""
