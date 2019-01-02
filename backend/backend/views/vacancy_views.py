from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from backend.serializers import VacancySerializer
from backend.serializers import GetVacancySerializer
from backend.serializers import UpdateVacancySerializer
from backend.models import Vacancy
from backend.permissions import EditVacancyPermission

from tools.errors import get_error_message_response


class CreateVacancyView(APIView):
    def post(self, request):
        request.data['owner'] = request.data.get('vk_user_id')
        view_serializer = VacancySerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        view_serializer.save()
        return Response(data='OK')


class UpdateVacancyView(APIView):
    permission_classes = (EditVacancyPermission, )

    def post(self, request):
        request.data['owner'] = request.data.get('vk_user_id')
        view_serializer = UpdateVacancySerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        try:
            vacancy = Vacancy.objects.get(pk=request.data.get('vacancy_id'))
            for (key, value) in view_serializer.validated_data.items():
                setattr(vacancy, key, value)
            vacancy.save()
        except Vacancy.DoesNotExist:
            return get_error_message_response('vacancy_id')
        return Response(data='OK')


class SearchVacanciesView(APIView):
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
        city = params.get('city')
        district = params.get('district')
        street = params.get('street')
        metro_station = params.get('metro_station')
        vacancies = Vacancy.objects.all()
        if subject:
            vacancies = vacancies.filter(subject__icontains=subject)
        if price_min:
            vacancies = vacancies.filter(price__gt=price_min)
        if price_max:
            vacancies = vacancies.filter(price__lt=price_max)
        if ege:
            vacancies = vacancies.filter(ege=True)
        if oge:
            vacancies = vacancies.filter(oge=True)
        if foreign_lang_cert:
            vacancies = vacancies.filter(foreign_lang_cert=True)
        if primary_school:
            vacancies = vacancies.filter(primary_school=True)
        if secondary_school:
            vacancies = vacancies.filter(secondary_school=True)
        if olympiads:
            vacancies = vacancies.filter(olympiads=True)
        if university:
            vacancies = vacancies.filter(university=True)
        if distance_learning:
            vacancies = vacancies.filter(distance_learning=True)
        if city:
            vacancies = vacancies.filter(
                owner__city__icontains=city
            )
        if district:
            vacancies = vacancies.filter(
                owner__district__icontains=district
            )
        if street:
            vacancies = vacancies.filter(
                owner__street__icontains=street
            )
        if metro_station:
            vacancies = vacancies.filter(
                owner__metro_station__icontains=metro_station
            )
        vacancies = vacancies.order_by(
            '-creation_time'
        )[offset:offset + limit]
        vacancies_serializer = GetVacancySerializer(vacancies, many=True)
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


class GetVacancyView(APIView):
    def get(self, request):
        vacancy_id = self.request.query_params.get('vacancy_id')
        try:
            vacancy = Vacancy.objects.get(pk=vacancy_id)
            vacancy_serializer = GetVacancySerializer(vacancy)
            return Response(data=vacancy_serializer.data)
        except Vacancy.DoesNotExist:
            return get_error_message_response('vacancy_id')


class GetProfileVacanciesView(APIView):
    def get(self, request):
        owner_id = self.request.query_params.get('owner_id')
        vacancies = Vacancy.objects.filter(
            owner_id=owner_id, is_active=True
        )
        vacancies_serializer = GetVacancySerializer(vacancies, many=True)
        return Response(data=vacancies_serializer.data)


class DeactivateVacancyView(APIView):
    permission_classes = (EditVacancyPermission, )

    def post(self, request):
        vacancy_id = request.data.get('vacancy_id')
        try:
            vacancy = Vacancy.objects.get(pk=vacancy_id)
        except Vacancy.DoesNotExist:
            return get_error_message_response('vacancy_id')
        vacancy.is_active = False
        vacancy.save()
        return Response(data='OK')


class DeleteVacancyView(APIView):
    permission_classes = (EditVacancyPermission, )

    def post(self, request):
        vacancy_id = request.data.get('vacancy_id')
        try:
            vacancy = Vacancy.objects.get(pk=vacancy_id)
        except Vacancy.DoesNotExist:
            return get_error_message_response('vacancy_id')
        vacancy.delete()
        return Response(data='OK')