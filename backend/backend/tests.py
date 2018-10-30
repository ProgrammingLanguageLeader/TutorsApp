from django.conf import settings
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.status import HTTP_200_OK

from .models import Profile, Vacancy


settings.VK_APP_SECRET = 'IbUTB1WaCVtp2aoFLF8A'
client = APIClient()


class CreateProfileViewTest(TestCase):
    def test(self):
        vk_id = 144736529
        response = client.post(
            "/api/v1/create_profile/",
            {
                "signed_user_id":
                    "6vD8zvWh6BxSAyhkcbdmVhg8EyzXs8XURmMdAbvlhL8",
                "user_id": str(vk_id),
                "vk_id": str(vk_id)
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertIsNotNone(Profile.objects.get(vk_id=144736529))


class UpdateProfileViewTest(TestCase):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.vk_id = 144736529

    def setUp(self):
        Profile.objects.create(vk_id=self.vk_id)

    def test(self):
        description = "test"
        response = client.post(
            "/api/v1/update_profile/",
            {
                "signed_user_id":
                    "6vD8zvWh6BxSAyhkcbdmVhg8EyzXs8XURmMdAbvlhL8",
                "user_id": str(self.vk_id),
                "vk_id": str(self.vk_id),
                "description": description
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(
            Profile.objects.get(vk_id=self.vk_id).description,
            description
        )


class GetProfileViewTest(TestCase):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.vk_id = 144736529
        self.description = "desc"

    def setUp(self):
        Profile.objects.create(
            vk_id=self.vk_id, description=self.description
        )

    def test(self):
        response = client.get(
            "/api/v1/get_profile/",
            {
                "signed_user_id":
                    "6vD8zvWh6BxSAyhkcbdmVhg8EyzXs8XURmMdAbvlhL8",
                "user_id": str(self.vk_id),
                "vk_id": str(self.vk_id)
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(
            response.data["description"],
            self.description
        )


class CreateVacancyViewTest(TestCase):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.vk_id = 144736529
        self.owner = self.vk_id
        self.price = 1000
        self.subject = "Math"
        self.extra_info = "Test vacancy"

    def setUp(self):
        Profile.objects.create(vk_id=self.vk_id)

    def test(self):
        response = client.post(
            "/api/v1/create_vacancy/",
            {
                "signed_user_id":
                    "6vD8zvWh6BxSAyhkcbdmVhg8EyzXs8XURmMdAbvlhL8",
                "user_id": str(self.vk_id),
                "owner": str(self.vk_id),
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
        self.assertEqual(vacancy.owner.vk_id, self.owner)
        self.assertEqual(vacancy.subject, self.subject)
        self.assertEqual(vacancy.ege, True)
        self.assertEqual(vacancy.home_schooling, True)
        self.assertEqual(vacancy.price, self.price)
        self.assertEqual(vacancy.extra_info, self.extra_info)
        self.assertEqual(vacancy.olympiads, False)


class SearchVacanciesViewTest(TestCase):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.vk_id = 144736529
        self.subject = "Math"
        self.ege = True
        self.price = 1000

    def setUp(self):
        profile = Profile.objects.create(vk_id=self.vk_id)
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
                "signed_user_id":
                    "6vD8zvWh6BxSAyhkcbdmVhg8EyzXs8XURmMdAbvlhL8",
                "user_id": str(self.vk_id),
                "subject": self.subject,
                "ege": self.ege,
                "price_min": self.price - 1
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertIsNotNone(response.data[0:1])


class GetStudentsViewTest(TestCase):
    pass


class AddLessonViewTest(TestCase):
    pass


class GetLessonsViewTest(TestCase):
    pass


class AddApplicationViewTest(TestCase):
    pass


class GetApplicationsViewTest(TestCase):
    pass


class AcceptApplicationViewTest(TestCase):
    pass


class DeleteLessonViewTest(TestCase):
    pass


class DeleteVacancyViewTest(TestCase):
    pass


class DeleteProfileViewTest(TestCase):
    pass


class DeleteApplicationViewTest(TestCase):
    pass


class GetVacancyViewTest(TestCase):
    pass


class GetVacanciesViewTest(TestCase):
    pass
