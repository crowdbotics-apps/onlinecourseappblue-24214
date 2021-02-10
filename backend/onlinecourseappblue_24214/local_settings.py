import environ

env = environ.Env()

env.read_env('.env')

from onlinecourseappblue_24214.settings import *

UPDATE_ON_DUPLICATE_REG_ID = True
ALLOWED_HOSTS = ["*", "192.168.3.134"]

DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'