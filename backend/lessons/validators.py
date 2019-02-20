from datetime import timedelta

from django.utils.translation import ugettext_lazy as _
from django.utils import formats
from django.core.validators import ValidationError
from django.utils import timezone


def validate_beginning_time(value):
    today_datetime = timezone.now() - timedelta(days=1)
    next_month_datetime = timezone.now() + timedelta(days=30)
    if value < today_datetime:
        raise ValidationError(
            _('Ensure this value is greater than '
              'or equal to %s.') % (
                formats.date_format(
                    today_datetime, "DATETIME_FORMAT", use_l10n=True
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
