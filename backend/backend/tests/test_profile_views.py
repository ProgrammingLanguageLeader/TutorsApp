from django.conf import settings
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.status import HTTP_200_OK

from backend.models import Profile
from backend.tests.constants import MOCK_VK_USER_ID
from backend.tests.constants import MOCK_SIGN
from backend.tests.constants import MOCK_VK_APP_SECRET
from backend.tests.constants import MOCK_VK_EXECUTION_PARAMS


settings.VK_APP_SECRET = MOCK_VK_APP_SECRET
client = APIClient()


class CreateProfileViewTest(TestCase):
    city = "Moscow"

    def test_creation(self):
        response = client.post(
            "/api/v1/create_profile/",
            {
                "sign": MOCK_SIGN,
                "city": self.city,
                **MOCK_VK_EXECUTION_PARAMS
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertIsNotNone(Profile.objects.get(pk=MOCK_VK_USER_ID))

    def test_failure(self):
        response = client.post(
            "/api/v1/create_profile/",
            {
                "sign": MOCK_SIGN,
                **MOCK_VK_EXECUTION_PARAMS,
                "vk_user_id": MOCK_VK_USER_ID + 1,
            },
            format="json"
        )
        self.assertNotEqual(response.status_code, HTTP_200_OK)


class UpdateProfileViewTest(TestCase):
    city = "Moscow"

    def setUp(self):
        Profile.objects.create(pk=MOCK_VK_USER_ID, city=self.city)

    def test(self):
        description = "test"
        response = client.post(
            "/api/v1/update_profile/",
            {
                "sign": MOCK_SIGN,
                "city": self.city,
                "description": description,
                "creation_time": "something",
                **MOCK_VK_EXECUTION_PARAMS
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(
            Profile.objects.get(pk=MOCK_VK_USER_ID).description,
            description
        )


class GetProfileViewTest(TestCase):
    description = "desc"

    def setUp(self):
        Profile.objects.create(
            pk=MOCK_VK_USER_ID, description=self.description
        )

    def test(self):
        response = client.get(
            "/api/v1/get_profile/",
            {
                "sign": MOCK_SIGN,
                "profile_id": MOCK_VK_USER_ID,
                **MOCK_VK_EXECUTION_PARAMS
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(
            response.data["description"],
            self.description
        )


class DeactivateProfileTest(TestCase):
    def setUp(self):
        Profile.objects.create(pk=MOCK_VK_USER_ID)

    def test(self):
        response = client.post(
            "/api/v1/deactivate_profile/",
            {
                "sign": MOCK_SIGN,
                **MOCK_VK_EXECUTION_PARAMS
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        profile = Profile.objects.get(pk=MOCK_VK_USER_ID)
        self.assertEqual(profile.is_active, False)
