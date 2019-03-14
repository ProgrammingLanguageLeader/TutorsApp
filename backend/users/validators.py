from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _


def validate_file_max_size(file):
    max_size = 1024 * 1024 * 4
    if file.size > max_size:
        raise ValidationError(
            _('The maximum file size that can be uploaded is %s') % max_size
        )
