from backend_project.celery import app

from users.models import User

from utils.profanity_filter import ProfanityFilter


@app.task
def censor_user_fields(user_id):
    fields = (
        'first_name',
        'last_name',
        'education',
        'experience',
        'city',
        'district',
        'street',
        'metro_station',
        'bio',
    )
    profanity_filter = ProfanityFilter()
    user = User.objects.get(pk=user_id)
    censored_values = {}
    for field in fields:
        field_value = getattr(user, field)
        censored_values[field] = profanity_filter.censor(field_value)
    was_user_updated = False
    actual_user = User.objects.get(pk=user_id)
    for field in fields:
        user_value = getattr(user, field)
        actual_user_value = getattr(actual_user, field)
        was_user_updated = was_user_updated or user_value != actual_user_value
    if not was_user_updated:
        for field in fields:
            setattr(user, field, censored_values[field])
        user.save()
