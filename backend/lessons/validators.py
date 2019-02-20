from datetime import timedelta

from django.utils.translation import ugettext_lazy as _
from django.utils import formats
from django.core.validators import ValidationError
from django.utils import timezone


def validate_beginning_time(value):
    hour_half_ago_datetime = timezone.now() - timedelta(minutes=30)
    next_month_datetime = timezone.now() + timedelta(days=30)
    if value < hour_half_ago_datetime:
        raise ValidationError(
            _('Ensure this value is greater than '
              'or equal to %s (UTC time).') % (
                formats.date_format(
                    hour_half_ago_datetime, "DATETIME_FORMAT", use_l10n=True
                )
            )
        )
    if value > next_month_datetime:
        raise ValidationError(
            _('Ensure this value is less than '
              'or equal to %s (UTC time).') % (
                formats.date_format(
                    next_month_datetime, "DATETIME_FORMAT", use_l10n=True
                )
            )
        )
