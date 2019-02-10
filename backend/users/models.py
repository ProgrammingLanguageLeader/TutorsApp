import sys
import os
from io import BytesIO

from PIL import Image

from django.contrib.staticfiles.templatetags.staticfiles import static
from django.contrib.auth.models import AbstractBaseUser
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.conf import settings

from users.managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField('username', max_length=30, unique=True)
    email = models.EmailField('email address', blank=True)
    first_name = models.CharField('first name', max_length=30, blank=False)
    last_name = models.CharField('last name', max_length=30, blank=False)
    date_joined = models.DateTimeField('date joined', auto_now_add=True)
    is_active = models.BooleanField('active', default=True)
    experience = models.TextField(blank=True, max_length=100)
    education = models.TextField(blank=True, max_length=100)
    city = models.TextField(blank=True, max_length=50)
    district = models.TextField(blank=True, max_length=50)
    street = models.TextField(blank=True, max_length=50)
    metro_station = models.TextField(blank=True, max_length=50)
    bio = models.TextField(blank=True, max_length=100)
    avatar = models.ImageField(upload_to='avatars/', blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ('first_name', 'last_name', 'email', )

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def save(self, *args, **kwargs):
        if self.avatar:
            old_file_path = self.avatar.path
            self.avatar = self.compress_avatar(self.avatar)
            if os.path.isfile(old_file_path):
                os.remove(old_file_path)
        super().save()

    @staticmethod
    def compress_avatar(avatar):
        avatar_image = Image.open(avatar)
        avatar_image.thumbnail((200, 200))
        output = BytesIO()
        avatar_image.save(output, format='JPEG', quality=100)
        output.seek(0)
        return InMemoryUploadedFile(
            output,
            'ImageField',
            '%s.jpg' % avatar.name.split('.')[0],
            'image/jpeg',
            sys.getsizeof(output),
            None
        )

    @property
    def is_staff(self):
        return self.is_superuser

    @property
    def full_name(self):
        return ('%s %s' % (self.first_name, self.last_name)).strip()

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

    @property
    def avatar_url_or_default(self):
        if self.avatar:
            return self.avatar.url
        return static(settings.DEFAULT_USER_AVATAR)
