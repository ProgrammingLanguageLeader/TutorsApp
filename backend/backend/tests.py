from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.status import HTTP_200_OK


client = APIClient()


# TODO: write tests for every view
class CreateProfileViewTest(TestCase):
    def test(self):
        response = client.post(
            "/api/v1/create_profile/",
            {
                "signed_user_id":
                    "UTIhtFSw07A-dTd_v3jhGDFeBbwiT33PhMbDGHsGV4A",
                "user_id": "144736529",
                "vk_id": "144736529"
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)

