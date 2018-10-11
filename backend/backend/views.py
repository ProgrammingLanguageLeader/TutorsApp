from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN

from .auth import is_authenticated

from .serializers import (
    VacancySerializer,
    ProfileSerializer,
    UpdateProfileSerializer,
    LessonSerializer,
    ApplicationSerializer
)
from .models import Profile, Vacancy, Lesson, Application


class CreateProfileView(APIView):
    def post(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        view_serializer = ProfileSerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        view_serializer.save()
        return Response(data='OK')


class UpdateProfileView(APIView):
    def post(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        view_serializer = UpdateProfileSerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        try:
            profile = Profile.objects.get(
                vk_id=request.data['vk_id']
            )
            for (key, value) in view_serializer.validated_data.items():
                setattr(profile, key, value)
            profile.save()
            return Response(data='OK')
        except Profile.DoesNotExist:
            return Response(
                data='Invalid vk id',
                status=HTTP_400_BAD_REQUEST
            )


class GetProfileView(APIView):
    def get(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        vk_id = self.request.query_params.get('vk_id')
        try:
            profile = Profile.objects.get(vk_id__exact=vk_id)
            profile_serializer = ProfileSerializer(profile)
            return Response(data=profile_serializer.data)
        except Profile.DoesNotExist:
            return Response(
                data="VK ID is not valid",
                status=HTTP_400_BAD_REQUEST
            )


class CreateVacancyView(APIView):
    def post(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        view_serializer = VacancySerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        view_serializer.save()
        return Response(data='OK')


class SearchVacanciesView(APIView):
    def get(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        subject = self.request.query_params.get('subject')
        price_min = self.request.query_params.get('price_min')
        price_max = self.request.query_params.get('price_max')
        ege = self.request.query_params.get('ege')
        oge = self.request.query_params.get('oge')
        foreign_lang_cert = self.request.query_params.get('foreign_lang_cert')
        primary_school = self.request.query_params.get('primary_school')
        secondary_school = self.request.query_params.get('secondary_school')
        olympiads = self.request.query_params.get('olympiads')
        university = self.request.query_params.get('university')
        distance_learning = self.request.query_params.get('distance_learning')
        vacancies = Vacancy.objects.all()
        if subject:
            vacancies = vacancies.filter(subject__exact=subject)
        if price_min:
            vacancies = vacancies.filter(price__gt=price_min)
        if price_max:
            vacancies = vacancies.filter(price__lt=price_max)
        if ege:
            vacancies = vacancies.filter(ege__exact=True)
        elif oge:
            vacancies = vacancies.filter(oge__exact=True)
        elif foreign_lang_cert:
            vacancies = vacancies.filter(foreign_lang_cert__exact=True)
        elif primary_school:
            vacancies = vacancies.filter(primary_school__exact=True)
        elif secondary_school:
            vacancies = vacancies.filter(secondary_school__exact=True)
        elif olympiads:
            vacancies = vacancies.filter(olympiads__exact=True)
        elif university:
            vacancies = vacancies.filter(university__exact=True)
        if distance_learning:
            vacancies = vacancies.filter(distance_learning__exact=True)
        vacancies_serializer = VacancySerializer(vacancies, many=True)
        return Response(data=vacancies_serializer.data)


class GetStudentsView(APIView):
    def get(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        tutor_vk_id = self.request.query_params.get('vk_id')
        lessons = Lesson.objects.filter(
            tutor__vk_id=tutor_vk_id
        )
        students = set()
        for lesson in lessons:
            students.add(lesson.student)
        student_serializer = ProfileSerializer(students, many=True)
        return Response(data=student_serializer.data)


class AddLessonView(APIView):
    def post(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        lesson_serializer = LessonSerializer(data=request.data)
        if lesson_serializer.is_valid():
            lesson_serializer.save()
            return Response(data='OK')
        return Response(
            data=lesson_serializer.errors,
            status=HTTP_400_BAD_REQUEST
        )


class GetLessonsView(APIView):
    def get(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        tutor_id = self.request.query_params.get('tutor')
        student_id = self.request.query_params.get('student')
        lessons = []
        if tutor_id:
            lessons = Lesson.objects.filter(
                tutor__vk_id=tutor_id
            )
        elif student_id:
            lessons = Lesson.objects.filter(
                student__vk_id=student_id
            )
        lesson_serializer = LessonSerializer(lessons, many=True)
        return Response(data=lesson_serializer.data)


class AddApplicationView(APIView):
    def post(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        application_serializer = ApplicationSerializer(data=request.data)
        if application_serializer.is_valid():
            application_serializer.save()
            return Response(data='OK')
        return Response(
            data=application_serializer.errors,
            status=HTTP_400_BAD_REQUEST
        )


class GetApplicationsView(APIView):
    def get(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        vk_id = self.request.query_params.get('vk_id')
        vacancies = Vacancy.objects.filter(
            owner=vk_id
        )
        applications = []
        for vacancy in vacancies:
            current_vacancy_applications = Application.objects.filter(
                vacancy_id=vacancy.id, is_active=True
            )
            for application in current_vacancy_applications:
                applications.append(application)
        application_serializer = ApplicationSerializer(applications, many=True)
        return Response(data=application_serializer.data)


class AcceptApplicationView(APIView):
    def post(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        try:
            application_id = request.data['id']
            application = Application.objects.get(pk=application_id)
        except Application.DoesNotExist:
            return Response(
                data={
                    "application_id": [
                        "application_id is not valid"
                    ]
                },
                status=HTTP_400_BAD_REQUEST
            )
        application.is_active = False
        application.accepted = True
        application.save()
        Lesson.objects.create(
            tutor=application.vacancy.owner,
            student=application.student
        )
        return Response(data='OK')


class DeleteLessonView(APIView):
    def post(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        try:
            id = request.data['id']
            schedule = Lesson.objects.get(pk=id)
        except Vacancy.DoesNotExist:
            return Response(
                data={
                    "id": [
                        "id is not valid"
                    ]
                },
                status=HTTP_400_BAD_REQUEST
            )
        schedule.is_active = False
        schedule.save()
        return Response(data='OK')


class DeleteVacancyView(APIView):
    def post(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        try:
            id = request.data['id']
            vacancy = Vacancy.objects.get(pk=id)
        except Vacancy.DoesNotExist:
            return Response(
                data={
                    "id": [
                        "id is not valid"
                    ]
                },
                status=HTTP_400_BAD_REQUEST
            )
        vacancy.is_active = False
        vacancy.save()
        return Response(data='OK')


class DeleteProfileView(APIView):
    def post(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        try:
            vk_id = request.data['vk_id']
            profile = Profile.objects.get(pk=vk_id)
        except Profile.DoesNotExist:
            return Response(
                data={
                    "vk_id": [
                        "vk_id is not valid"
                    ]
                },
                status=HTTP_400_BAD_REQUEST
            )
        profile.is_active = False
        profile.save()
        return Response(data='OK')


class DeleteApplicationView(APIView):
    def post(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        try:
            application_id = request.data['id']
            application = Application.objects.get(pk=application_id)
        except Application.DoesNotExist:
            return Response(
                data={
                    "id": [
                        "id is not valid"
                    ]
                },
                status=HTTP_400_BAD_REQUEST
            )
        application.is_active = False
        application.save()
        return Response(data='OK')


class GetVacancyView(APIView):
    def get(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        vacancy_id = self.request.query_params.get('id')
        try:
            vacancy = Vacancy.objects.get(id=vacancy_id)
            vacancy_serializer = VacancySerializer(vacancy)
            return Response(data=vacancy_serializer.data)
        except Vacancy.DoesNotExist:
            return Response(
                data="ID is not valid",
                status=HTTP_400_BAD_REQUEST
            )


class GetVacanciesView(APIView):
    def get(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        owner_id = self.request.query_params.get('owner_id')
        vacancies = Vacancy.objects.filter(
            owner__vk_id=owner_id, is_active=True
        )
        vacancies_serializer = VacancySerializer(vacancies, many=True)
        return Response(data=vacancies_serializer.data)
