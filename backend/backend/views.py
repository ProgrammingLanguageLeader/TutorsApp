from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from .serializers import (
    CreateProfileSerializer,
    CreateVacancySerializer,
    VacancySerializer,
    ProfileSerializer,
    UpdateProfileSerializer,
    ScheduleSerializer
)
from .models import (
    Profile,
    Vacancy,
    Schedule
)


class CreateProfileView(APIView):
    def post(self, request):
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
        view_serializer = UpdateProfileSerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        profile = Profile.objects.get(vk_id__exact=view_serializer.validated_data['vk_id'])
        val_data = {
            'description': view_serializer.validated_data.get('description'),
            'subjects': view_serializer.validated_data.get('subjects'),
            'mobile': view_serializer.validated_data.get('mobile'),
            'activity_time_start': view_serializer.validated_data.get('activity_time_start'),
            'activity_time_end': view_serializer.validated_data.get('activity_time_end'),
            'latitude': view_serializer.validated_data.get('latitude'),
            'longitude': view_serializer.validated_data.get('longitude'),
            'distance_learning': view_serializer.validated_data.get('distance_learning'),
            'ege': view_serializer.validated_data.get('ege'),
            'oge': view_serializer.validated_data.get('oge'),
            'foreign_lang_cert': view_serializer.validated_data.get('foreign_lang_cert'),
            'university': view_serializer.validated_data.get('university'),
            'school': view_serializer.validated_data.get('school'),
        }
        if val_data['description']:
            profile.description = val_data['description']
        if val_data['subjects']:
            profile.subjects = val_data['subjects']
        if val_data['mobile']:
            profile.mobile = val_data['mobile']
        if val_data['activity_time_start']:
            profile.activity_time_start = val_data['activity_time_start']
        if val_data['activity_time_end']:
            profile.activity_time_end = val_data['activity_time_end']
        if val_data['latitude']:
            profile.latitude = view_serializer.validated_data.get('latitude')
        if val_data['longitude']:
            profile.longitude = view_serializer.validated_data.get('longitude')
        if val_data['distance_learning']:
            profile.distance_learning = view_serializer.validated_data.get('distance_learning')
        if val_data['ege']:
            profile.ege = view_serializer.validated_data.get('ege')
        if val_data['oge']:
            profile.oge = view_serializer.validated_data.get('oge')
        if val_data['foreign_lang_cert']:
            profile.foreign_lang_cert = view_serializer.validated_data.get('foreign_lang_cert')
        if val_data['university']:
            profile.university = view_serializer.validated_data.get('university')
        if val_data['school']:
            profile.school = view_serializer.validated_data.get('school')
        profile.save()
        return Response(data='OK')


class GetProfileView(APIView):
    def get(self, request):
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
        vacancies = Vacancy.objects.filter(active__exact=True)
        vacancies_serializer = VacancySerializer(vacancies, many=True)
        return Response(data=vacancies_serializer.data)


class GetStudentsView(APIView):
    def get(self, request):
        teachers_vk_id = self.request.query_params.get('vk_id')
        try:
            students = Schedule.objects.get(
                tutor__vk_id__exact=teachers_vk_id
            ).valudes('student')
            students_serializer = ProfileSerializer(students, many=True)
            return Response(data=students_serializer.data)
        except Profile.DoesNotExist:
            return Response(
                data="VK ID is not valid",
                status=HTTP_400_BAD_REQUEST
            )


class AddScheduleView(APIView):
    def post(self, request):
        schedule_serializer = ScheduleSerializer(request.data)
        if schedule_serializer.is_valid():
            schedule_serializer.save()
            return Response(data='OK')
        return Response(
            data=schedule_serializer.errors,
            status=HTTP_400_BAD_REQUEST
        )


class DeleteScheduleView(APIView):
    def post(self, request):
        try:
            id = request.data['id']
            schedule = Schedule.objects.get(pk=id)
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
        profile.active = False
        profile.save()
        return Response(data='OK')
