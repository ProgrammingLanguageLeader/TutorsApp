from django.apps import AppConfig


class VacanciesConfig(AppConfig):
    name = 'vacancies'

    def ready(self):
        import vacancies.signals
