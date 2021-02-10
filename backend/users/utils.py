import random
import string

from phone_verification.models import PhoneVerificationKey


def clear_expired_keys(expiry_time):
    PhoneVerificationKey.objects.filter(created__lte=expiry_time).delete()


def random_string(string_length=10):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(string_length))
