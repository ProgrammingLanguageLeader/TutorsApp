from django.conf import settings
from django.db.models import signals
from django.dispatch import receiver

from vacancies.models import Vacancy
from vacancies.tasks import censor_vacancy_fields
from vacancies.exceptions import LimitExceeded


@receiver(signals.pre_save, sender=Vacancy)
def check_limits(sender, instance, **kwargs):
    user_vacancies_count = sender.objects.filter(
        owner=instance.owner
    ).count()
    if user_vacancies_count > settings.VACANCIES_LIMIT:
        raise LimitExceeded


@receiver(signals.post_save, sender=Vacancy)
def handle_user_save(sender, instance, **kwargs):
    censor_vacancy_fields.delay(instance.pk)
