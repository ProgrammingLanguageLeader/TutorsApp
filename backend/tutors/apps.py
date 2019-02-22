from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class TutorsConfig(AppConfig):
    name = 'tutors'
    verbose_name = _('Tutors')

    def ready(self):
        import tutors.signals
