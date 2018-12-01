from django.conf import settings
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.status import HTTP_200_OK

from backend.models import Profile, Vacancy
from backend.tests.constants import MOCK_VK_APP_SECRET
from backend.tests.constants import MOCK_SIGNED_USER_ID
from backend.tests.constants import MOCK_USER_ID


settings.VK_APP_SECRET = MOCK_VK_APP_SECRET
client = APIClient()


class CreateVacancyViewTest(TestCase):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user_id = MOCK_USER_ID
        self.owner = self.user_id
        self.price = 1000
        self.subject = "Math"
        self.extra_info = "Test vacancy"

    def setUp(self):
        Profile.objects.create(pk=self.user_id)

    def test(self):
        response = client.post(
            "/api/v1/create_vacancy/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": str(self.user_id),
                "subject": self.subject,
                "ege": True,
                "home_schooling": True,
                "price": self.price,
                "extra_info": self.extra_info
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        vacancy = Vacancy.objects.all()[0]
        self.assertEqual(vacancy.owner.profile_id, self.owner)
        self.assertEqual(vacancy.subject, self.subject)
        self.assertEqual(vacancy.ege, True)
        self.assertEqual(vacancy.home_schooling, True)
        self.assertEqual(vacancy.price, self.price)
        self.assertEqual(vacancy.extra_info, self.extra_info)
        self.assertEqual(vacancy.olympiads, False)


class UpdateVacancyView(TestCase):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user_id = MOCK_USER_ID
        self.owner_id = self.user_id
        self.price = 1000
        self.subject = "Math"
        self.extra_info = "Test vacancy"

    def setUp(self):
        profile = Profile(pk=self.user_id)
        profile.save()
        Vacancy.objects.create(
            owner=profile,
            price=self.price
        )

    def test(self):
        response = client.post(
            "/api/v1/update_vacancy/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": str(self.user_id),
                "vacancy_id": 1,
                "subject": self.subject,
                "ege": True,
                "home_schooling": True,
                "price": self.price,
                "extra_info": self.extra_info
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        vacancy = Vacancy.objects.get(pk=1)
        self.assertEqual(vacancy.owner.profile_id, self.owner_id)
        self.assertEqual(vacancy.subject, self.subject)
        self.assertEqual(vacancy.ege, True)
        self.assertEqual(vacancy.home_schooling, True)
        self.assertEqual(vacancy.price, self.price)
        self.assertEqual(vacancy.extra_info, self.extra_info)
        self.assertEqual(vacancy.olympiads, False)


class SearchVacanciesViewTest(TestCase):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user_id = MOCK_USER_ID
        self.subject = "Math"
        self.ege = True
        self.price = 1000

    def setUp(self):
        profile = Profile.objects.create(pk=self.user_id)
        Vacancy.objects.create(
            owner=profile,
            subject=self.subject,
            ege=self.ege,
            price=self.price
        )

    def test(self):
        response = client.get(
            "/api/v1/search_vacancies/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": str(self.user_id),
                "subject": self.subject,
                "ege": self.ege,
                "price_min": self.price - 1
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertIsNotNone(response.data[0:1])


class GetVacancyViewTest(TestCase):
    vacancy_id = 1
    price = 1000
    subject = "Math"
    ege = True
    extra_info = "Test extra info"

    def setUp(self):
        profile = Profile(pk=MOCK_USER_ID)
        profile.save()
        Vacancy.objects.create(
            owner=profile,
            subject=self.subject,
            ege=self.ege,
            price=self.price,
            extra_info=self.extra_info
        )

    def test(self):
        response = client.get(
            "/api/v1/get_vacancy/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID,
                "vacancy_id": self.vacancy_id
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(response.data["subject"], self.subject)
        self.assertEqual(response.data["ege"], self.ege)
        self.assertEqual(response.data["price"], self.price)
        self.assertEqual(response.data["extra_info"], self.extra_info)


class GetProfileVacanciesViewTest(TestCase):
    price = 1000
    user_id_1 = MOCK_USER_ID
    user_id_2 = MOCK_USER_ID + 1
    user_id_3 = MOCK_USER_ID + 2
    vacancies_number_1 = 10
    vacancies_number_2 = 15
    vacancies_number_3 = 0

    def setUp(self):
        Profile.objects.create(pk=self.user_id_1)
        Profile.objects.create(pk=self.user_id_2)
        Profile.objects.create(pk=self.user_id_3)
        for i in range(self.vacancies_number_1):
            Vacancy.objects.create(
                owner_id=self.user_id_1,
                price=self.price
            )
        for i in range(self.vacancies_number_2):
            Vacancy.objects.create(
                owner_id=self.user_id_2,
                price=self.price
            )

    def test_first_user(self):
        response = client.get(
            "/api/v1/get_profile_vacancies/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID,
                "owner_id": self.user_id_1
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.data), self.vacancies_number_1)

    def test_second_user(self):
        response = client.get(
            "/api/v1/get_profile_vacancies/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID,
                "owner_id": self.user_id_2
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.data), self.vacancies_number_2)

    def test_third_user(self):
        response = client.get(
            "/api/v1/get_profile_vacancies/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID,
                "owner_id": self.user_id_3
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.data), self.vacancies_number_3)


class DeactivateVacancyViewTest(TestCase):
    vacancy_id = 1

    def setUp(self):
        Profile.objects.create(pk=MOCK_USER_ID)
        Vacancy.objects.create(owner_id=MOCK_USER_ID, price=1000)

    def test(self):
        response = client.post(
            "/api/v1/deactivate_vacancy/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID,
                "vacancy_id": self.vacancy_id
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        vacancy = Vacancy.objects.get(pk=self.vacancy_id)
        self.assertEqual(vacancy.is_active, False)


class DeleteVacancyViewTest(TestCase):
    vacancy_id = 1

    def setUp(self):
        Profile.objects.create(pk=MOCK_USER_ID)
        Vacancy.objects.create(owner_id=MOCK_USER_ID, price=1000)

    def test(self):
        response = client.post(
            "/api/v1/delete_vacancy/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID,
                "vacancy_id": self.vacancy_id
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        with self.assertRaises(Vacancy.DoesNotExist):
            Vacancy.objects.get(pk=self.vacancy_id)
