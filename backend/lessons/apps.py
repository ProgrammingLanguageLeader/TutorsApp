from django.apps import AppConfig


class LessonsConfig(AppConfig):
    name = 'lessons'

    def ready(self):
        import lessons.signals
