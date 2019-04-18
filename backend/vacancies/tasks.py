from backend_project.celery import app

from vacancies.models import Vacancy

from utils.profanity_filter import ProfanityFilter


@app.task
def censor_vacancy_fields(vacancy_id):
    fields = (
        'subject',
        'extra_info',
    )
    profanity_filter = ProfanityFilter()
    vacancy = Vacancy.objects.get(pk=vacancy_id)
    censored_values = {}
    for field in fields:
        field_value = getattr(vacancy, field)
        censored_values[field] = profanity_filter.censor(field_value)
    was_vacancy_updated = False
    actual_vacancy = Vacancy.objects.get(pk=vacancy_id)
    for field in fields:
        vacancy_value = getattr(vacancy, field)
        actual_vacancy_value = getattr(actual_vacancy, field)
        was_vacancy_updated = was_vacancy_updated or \
            vacancy_value != actual_vacancy_value
    if not was_vacancy_updated:
        for field in fields:
            setattr(vacancy, field, censored_values[field])
        vacancy.save()
