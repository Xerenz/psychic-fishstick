import os 
from dotenv import load_dotenv

from .base import BASE_DIR


load_dotenv()

DEBUG = False

SERVER_HOST = os.getenv('SERVER_HOST')

ALLOWED_HOSTS = [SERVER_HOST, ]

SECRET_KEY = os.getenv('SECRET_KEY')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DBNAME'),
        'USER': os.environ.get('DBUSER'),
        'PASSWORD': os.environ.get('DBPASSWORD'),
        'HOST': os.environ.get('DBHOST'),
        'PORT': os.environ.get('DBPORT')
    }
}

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
