from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN

from .auth import is_authenticated

from .serializers import (
    CreateProfileSerializer,
    CreateVacancySerializer,
    VacancySerializer,
    ProfileSerializer,
    UpdateProfileSerializer,
    LessonSerializer
)
from .models import (
    Profile,
    Vacancy,
    Lesson
)


class CreateProfileView(APIView):
    def post(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        view_serializer = CreateProfileSerializer(data=request.data)
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
        view_serializer = CreateVacancySerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        view_serializer.save()
        return Response(data='OK')


class SearchVacancyView(APIView):
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
        school = self.request.query_params.get('school')
        university = self.request.query_params.get('university')
        distance_learning = self.request.query_params.get('distance_learning')
        vacancies = Vacancy.objects.all()
        if subject:
            vacancies = vacancies.filter(subjects__name__contains=subject)
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
        elif school:
            vacancies = vacancies.filter(school__exact=True)
        elif university:
            vacancies = vacancies.filter(university__exact=True)
        if distance_learning:
            vacancies = vacancies.filter(distance_learning__exact=True)
        vacancies_serializer = VacancySerializer(vacancies, many=True)
        return Response(data=vacancies_serializer.data)


class GetActiveVacanciesView(APIView):
    def get(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        vacancies = Vacancy.objects.filter(active__exact=True)
        vacancies_serializer = VacancySerializer(vacancies, many=True)
        return Response(data=vacancies_serializer.data)


class GetStudentsView(APIView):
    def get(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        teachers_vk_id = self.request.query_params.get('vk_id')
        try:
            students = Lesson.objects.get(
                tutor__vk_id__exact=teachers_vk_id
            ).valudes('student')
            students_serializer = ProfileSerializer(students, many=True)
            return Response(data=students_serializer.data)
        except Profile.DoesNotExist:
            return Response(
                data="VK ID is not valid",
                status=HTTP_400_BAD_REQUEST
            )


class AddLessonView(APIView):
    def post(self, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        schedule_serializer = LessonSerializer(request.data)
        if schedule_serializer.is_valid():
            schedule_serializer.save()
            return Response(data='OK')
        return Response(
            data=schedule_serializer.errors,
            status=HTTP_400_BAD_REQUEST
        )


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
        schedule.active = False
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
        vacancy.active = False
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
        except ProfileSerializer.DoesNotExist:
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
