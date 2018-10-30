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


def check_authentication(method):
    def wrapper(view_instance, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        return method(view_instance, request)
    return wrapper


def get_error_message_response(variable_name):
    return Response(
        data={
            variable_name: [
                "{} is not valid".format(variable_name)
            ]
        },
        status=HTTP_400_BAD_REQUEST
    )


class CreateProfileView(APIView):
    @check_authentication
    def post(self, request):
        view_serializer = ProfileSerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        view_serializer.save()
        return Response(data='OK')


class UpdateProfileView(APIView):
    @check_authentication
    def post(self, request):
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
    @check_authentication
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
    @check_authentication
    def post(self, request):
        view_serializer = VacancySerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        view_serializer.save()
        return Response(data='OK')


class SearchVacanciesView(APIView):
    @check_authentication
    def get(self, request):
        params = self.request.query_params
        offset = self.validate_offset(params.get('offset') or 0)
        if offset is None:
            return get_error_message_response('offset')

        limit = self.validate_limit(params.get('limit') or 100)
        if limit is None:
            return get_error_message_response('limit')

        price_min = self.validate_price_min(params.get('price_min'))
        price_max = self.validate_price_max(params.get('price_max'))

        subject = params.get('subject')
        ege = params.get('ege')
        oge = params.get('oge')
        foreign_lang_cert = params.get('foreign_lang_cert')
        primary_school = params.get('primary_school')
        secondary_school = params.get('secondary_school')
        olympiads = params.get('olympiads')
        university = params.get('university')
        distance_learning = params.get('distance_learning')
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
        vacancies = vacancies.order_by(
            '-creation_time'
        )[offset:offset + limit]
        vacancies_serializer = VacancySerializer(vacancies, many=True)
        return Response(data=vacancies_serializer.data)

    @staticmethod
    def validate_offset(offset):
        try:
            offset = int(offset)
            return offset
        except (ValueError, TypeError):
            return None

    @staticmethod
    def validate_limit(limit):
        try:
            limit = int(limit)
            if not (1 <= limit <= 1000):
                return None
            return limit
        except (ValueError, TypeError):
            return None

    @staticmethod
    def validate_price_min(price_min):
        try:
            price_min = int(price_min)
            return price_min
        except (ValueError, TypeError):
            return None

    @staticmethod
    def validate_price_max(price_max):
        try:
            price_max = int(price_max)
            return price_max
        except (ValueError, TypeError):
            return None


# class SearchVacanciesByTextView(APIView):
#      @check_authentication
#      def get(self, request):
#          text = self.request.query_params.get('text')
#          vacancies = Vacancy.objects.all()
#          if text:
#              vacancies = vacancies.filter()


class GetStudentsView(APIView):
    @check_authentication
    def get(self, request):
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
    @check_authentication
    def post(self, request):
        lesson_serializer = LessonSerializer(data=request.data)
        if lesson_serializer.is_valid():
            lesson_serializer.save()
            return Response(data='OK')
        return Response(
            data=lesson_serializer.errors,
            status=HTTP_400_BAD_REQUEST
        )


class GetLessonsView(APIView):
    @check_authentication
    def get(self, request):
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
    @check_authentication
    def post(self, request):
        application_serializer = ApplicationSerializer(data=request.data)
        if application_serializer.is_valid():
            application_serializer.save()
            return Response(data='OK')
        return Response(
            data=application_serializer.errors,
            status=HTTP_400_BAD_REQUEST
        )


class GetApplicationsView(APIView):
    @check_authentication
    def get(self, request):
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
    @check_authentication
    def post(self, request):
        try:
            application_id = request.data['id']
            application = Application.objects.get(pk=application_id)
        except Application.DoesNotExist:
            return get_error_message_response('application_id')
        application.is_active = False
        application.accepted = True
        application.save()
        Lesson.objects.create(
            tutor=application.vacancy.owner,
            student=application.student
        )
        return Response(data='OK')


class DeleteLessonView(APIView):
    @check_authentication
    def post(self, request):
        try:
            id = request.data['id']
            schedule = Lesson.objects.get(pk=id)
        except Vacancy.DoesNotExist:
            return get_error_message_response('id')
        schedule.is_active = False
        schedule.save()
        return Response(data='OK')


class DeleteVacancyView(APIView):
    @check_authentication
    def post(self, request):
        try:
            id = request.data['id']
            vacancy = Vacancy.objects.get(pk=id)
        except Vacancy.DoesNotExist:
            return get_error_message_response('id')
        vacancy.is_active = False
        vacancy.save()
        return Response(data='OK')


class DeleteProfileView(APIView):
    @check_authentication
    def post(self, request):
        try:
            vk_id = request.data['vk_id']
            profile = Profile.objects.get(pk=vk_id)
        except Profile.DoesNotExist:
            return get_error_message_response('vk_id')
        profile.is_active = False
        profile.save()
        return Response(data='OK')


class DeleteApplicationView(APIView):
    @check_authentication
    def post(self, request):
        try:
            application_id = request.data['id']
            application = Application.objects.get(pk=application_id)
        except Application.DoesNotExist:
            return get_error_message_response('id')
        application.is_active = False
        application.save()
        return Response(data='OK')


class GetVacancyView(APIView):
    @check_authentication
    def get(self, request):
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
    @check_authentication
    def get(self, request):
        owner_id = self.request.query_params.get('owner_id')
        vacancies = Vacancy.objects.filter(
            owner__vk_id=owner_id, is_active=True
        )
        vacancies_serializer = VacancySerializer(vacancies, many=True)
        return Response(data=vacancies_serializer.data)
