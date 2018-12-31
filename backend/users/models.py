from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin

from users.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField('username', max_length=30, unique=True)
    email = models.EmailField('email address', blank=True)
    first_name = models.CharField('first name', max_length=30, blank=True)
    last_name = models.CharField('last name', max_length=30, blank=True)
    date_joined = models.DateTimeField('date joined', auto_now_add=True)
    is_active = models.BooleanField('active', default=True)
    experience = models.TextField(null=True, blank=True, max_length=100)
    education = models.TextField(null=True, blank=True, max_length=100)
    city = models.TextField(null=True, blank=True, max_length=50)
    district = models.TextField(null=True, blank=True, max_length=50)
    street = models.TextField(null=True, blank=True, max_length=50)
    metro_station = models.TextField(null=True, blank=True, max_length=50)
    bio = models.TextField(null=True, blank=True, max_length=100)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ('first_name', 'last_name')

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)
