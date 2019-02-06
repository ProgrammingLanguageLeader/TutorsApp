from django.apps import AppConfig


class TutorsConfig(AppConfig):
    name = 'tutors'

    def ready(self):
        import tutors.signals
