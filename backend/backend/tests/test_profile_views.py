from django.conf import settings
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.status import HTTP_200_OK

from backend.models import Profile
from backend.tests.constants import MOCK_USER_ID
from backend.tests.constants import MOCK_SIGNED_USER_ID
from backend.tests.constants import MOCK_VK_APP_SECRET


settings.VK_APP_SECRET = MOCK_VK_APP_SECRET
client = APIClient()


class CreateProfileViewTest(TestCase):
    city = "Moscow"

    def test_creation(self):
        response = client.post(
            "/api/v1/create_profile/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID,
                "city": self.city,
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertIsNotNone(Profile.objects.get(pk=MOCK_USER_ID))

    def test_failure(self):
        response = client.post(
            "/api/v1/create_profile/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID + 1
            },
            format="json"
        )
        self.assertNotEqual(response.status_code, HTTP_200_OK)


class UpdateProfileViewTest(TestCase):
    city = "Moscow"

    def setUp(self):
        Profile.objects.create(pk=MOCK_USER_ID, city=self.city)

    def test(self):
        description = "test"
        response = client.post(
            "/api/v1/update_profile/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID,
                "city": self.city,
                "description": description, 
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(
            Profile.objects.get(pk=MOCK_USER_ID).description,
            description
        )


class GetProfileViewTest(TestCase):
    description = "desc"

    def setUp(self):
        Profile.objects.create(
            pk=MOCK_USER_ID, description=self.description
        )

    def test(self):
        response = client.get(
            "/api/v1/get_profile/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID,
                "profile_id": MOCK_USER_ID
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
        Profile.objects.create(pk=MOCK_USER_ID)

    def test(self):
        response = client.post(
            "/api/v1/deactivate_profile/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        profile = Profile.objects.get(pk=MOCK_USER_ID)
        self.assertEqual(profile.is_active, False)
