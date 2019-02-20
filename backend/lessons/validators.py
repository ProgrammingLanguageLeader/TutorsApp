from datetime import timedelta

from django.utils.translation import ugettext_lazy as _
from django.utils import formats
from django.core.validators import ValidationError
from django.utils import timezone


def validate_beginning_time(value):
    now_datetime = timezone.now()
    next_month_datetime = now_datetime + timedelta(days=30)
    if value < now_datetime:
        raise ValidationError(
            _('Ensure this value is greater than '
              'or equal to %s.') % (
                formats.date_format(
                    now_datetime, "DATETIME_FORMAT", use_l10n=True
                )
            )
        )
    if value > next_month_datetime:
        raise ValidationError(
            _('Ensure this value is less than '
              'or equal to %s.') % (
                formats.date_format(
                    next_month_datetime, "DATETIME_FORMAT", use_l10n=True
                )
            )
        )
