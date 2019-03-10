from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _

from utils.validators import NoSpecialSymbolsValidator


class Vacancy(models.Model):
    creation_time = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('creation time')
    )
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='vacancy_owner',
        verbose_name=_('owner')
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name=_('active')
    )

    subject = models.CharField(
        max_length=128,
        verbose_name=_('subject'),
        validators=[
            NoSpecialSymbolsValidator()
        ]
    )

    ege = models.BooleanField(
        default=False,
        verbose_name=_('ege')
    )
    oge = models.BooleanField(
        default=False,
        verbose_name=_('oge')
    )
    foreign_lang_cert = models.BooleanField(
        default=False,
        verbose_name=_('foreign language certificate')
    )
    primary_school = models.BooleanField(
        default=False,
        verbose_name=_('primary school')
    )
    secondary_school = models.BooleanField(
        default=False,
        verbose_name=_('secondary school')
    )
    olympiads = models.BooleanField(
        default=False,
        verbose_name=_('olympiads')
    )
    university = models.BooleanField(
        default=False,
        verbose_name=_('university')
    )
    home_schooling = models.BooleanField(
        default=False,
        verbose_name=_('home schooling')
    )

    price = models.IntegerField(
        blank=False,
        validators=[
            MinValueValidator(limit_value=1),
            MaxValueValidator(limit_value=10000),
        ],
        verbose_name=_('price')
    )

    extra_info = models.TextField(
        blank=True,
        max_length=128,
        verbose_name=_('extra info'),
        validators=[
            NoSpecialSymbolsValidator()
        ]
    )

    class Meta:
        verbose_name = _('vacancy')
        verbose_name_plural = _('vacancies')
        ordering = ('-id', )
        unique_together = ('owner', 'subject', )
