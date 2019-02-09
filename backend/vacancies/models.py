from django.db import models
from django.conf import settings


class Vacancy(models.Model):
    creation_time = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='vacancy_owner'
    )
    is_active = models.BooleanField(default=True)
    subject = models.CharField(max_length=128)
    ege = models.BooleanField(default=False)
    oge = models.BooleanField(default=False)
    foreign_lang_cert = models.BooleanField(default=False)
    primary_school = models.BooleanField(default=False)
    secondary_school = models.BooleanField(default=False)
    olympiads = models.BooleanField(default=False)
    university = models.BooleanField(default=False)
    home_schooling = models.BooleanField(default=False)
    price = models.IntegerField(blank=False)
    extra_info = models.TextField(blank=True, max_length=256)

    class Meta:
        verbose_name = 'Vacancy'
        verbose_name_plural = 'Vacancies'
        ordering = ('-id', )
