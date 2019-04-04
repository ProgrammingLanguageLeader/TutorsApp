import re

from django.utils.translation import ugettext_lazy as _
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.contrib.auth.models import AbstractBaseUser
from django.core.validators import RegexValidator
from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.conf import settings

from users.managers import UserManager
from users.validators import validate_file_max_size

from utils.validators import NoSpecialSymbolsValidator, \
    AlphabetSymbolsValidator


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        verbose_name=_('username'),
        max_length=30,
        unique=True,
        validators=[
            RegexValidator(
                regex=re.compile(r'^[\w.@+-]{3,30}$'),
                message=_('Enter a valid value: '
                          'minimum length is 3, '
                          'maximum length is 30, '
                          'alphanumeric characters, '
                          '_, @, +, - are allowed')
            ),
        ]

    )

    email = models.EmailField(
        verbose_name=_('email address'),
        blank=True
    )
    first_name = models.CharField(
        verbose_name=_('first name'),
        max_length=30,
        blank=False,
        default='Anonymous',
        validators=[
            AlphabetSymbolsValidator()
        ]
    )
    last_name = models.CharField(
        verbose_name=_('last name'),
        max_length=30,
        blank=False,
        default='Anonymous',
        validators=[
            AlphabetSymbolsValidator()
        ]
    )

    date_joined = models.DateTimeField(
        verbose_name=_('date joined'),
        auto_now_add=True
    )
    is_active = models.BooleanField(
        verbose_name=_('active'),
        default=True
    )
    is_staff = models.BooleanField(
        verbose_name=_('staff'),
        default=False
    )

    experience = models.TextField(
        verbose_name=_('experience'),
        blank=True,
        max_length=100,
        validators=[
            NoSpecialSymbolsValidator()
        ]
    )
    education = models.TextField(
        verbose_name=_('education'),
        blank=True,
        max_length=100,
        validators=[
            NoSpecialSymbolsValidator()
        ]
    )
    city = models.TextField(
        verbose_name=_('city'),
        blank=True,
        max_length=50,
        validators=[
            NoSpecialSymbolsValidator()
        ]
    )
    district = models.TextField(
        verbose_name=_('district'),
        blank=True,
        max_length=50,
        validators=[
            NoSpecialSymbolsValidator()
        ]
    )
    street = models.TextField(
        verbose_name=_('street'),
        blank=True,
        max_length=50,
        validators=[
            NoSpecialSymbolsValidator()
        ]
    )
    metro_station = models.TextField(
        verbose_name=_('metro station'),
        blank=True,
        max_length=50,
        validators=[
            NoSpecialSymbolsValidator()
        ]
    )
    bio = models.TextField(
        blank=True,
        max_length=400,
        verbose_name=_('bio'),
        validators=[
            NoSpecialSymbolsValidator()
        ]
    )
    avatar = models.ImageField(
        upload_to=settings.AVATAR_MEDIA_URL,
        blank=True,
        verbose_name=_('avatar'),
        validators=[
            validate_file_max_size
        ]
    )

    objects = UserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ('first_name', 'last_name', 'email', )

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):
        return ('%s %s' % (self.first_name, self.last_name)).strip()

    # TODO: implement mailing using Celery
    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

    @property
    def avatar_url_or_default(self):
        if self.avatar:
            return self.avatar.url
        return static(settings.DEFAULT_USER_AVATAR)
