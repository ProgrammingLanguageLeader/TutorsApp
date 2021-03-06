import regex

from django.core.validators import RegexValidator
from django.utils.translation import ugettext_lazy as _


class AlphabetSymbolsValidator(RegexValidator):
    regex = regex.compile(r'^[\p{Alpha} -]*$', regex.UNICODE)
    message = _('Only alphabet symbols are allowed')


class NoSpecialSymbolsValidator(RegexValidator):
    regex = regex.compile(r'^[\p{Alnum}\p{Punct}\p{Blank}\n]*$', regex.UNICODE)
    message = _('Special symbols are not allowed')
