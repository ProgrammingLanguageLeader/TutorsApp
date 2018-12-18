from django.conf import settings
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.status import HTTP_200_OK

from backend.models import Profile
from backend.models import Students
from backend.tests.constants import MOCK_VK_USER_ID
from backend.tests.constants import MOCK_SIGN
from backend.tests.constants import MOCK_VK_APP_SECRET
from backend.tests.constants import MOCK_VK_EXECUTION_PARAMS


settings.VK_APP_SECRET = MOCK_VK_APP_SECRET
client = APIClient()


class GetStudentsViewTest(TestCase):
    tutor_id = MOCK_VK_USER_ID
    student_id_1 = MOCK_VK_USER_ID + 1
    student_id_2 = MOCK_VK_USER_ID + 2
    student_id_3 = MOCK_VK_USER_ID + 3
    student_desc_1 = "test student 1"
    student_desc_2 = "test student 2"
    student_desc_3 = "test student 3"

    def setUp(self):
        tutor_profile = Profile.objects.create(pk=self.tutor_id)
        student_profile_1 = Profile.objects.create(
            pk=self.student_id_1, description=self.student_desc_1
        )
        student_profile_2 = Profile.objects.create(
            pk=self.student_id_2, description=self.student_desc_2
        )
        student_profile_3 = Profile.objects.create(
            pk=self.student_id_3, description=self.student_desc_3
        )
        tutor_students = Students.objects.create(tutor=tutor_profile)
        tutor_students.students.add(
            student_profile_1, student_profile_2, student_profile_3
        )

    def test(self):
        response = client.get(
            "/api/v1/get_students/",
            {
                "sign": MOCK_SIGN,
                "tutor_id": self.tutor_id,
                **MOCK_VK_EXECUTION_PARAMS,
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        for student in response.data:
            real_description = Profile.objects.get(
                pk=student['profile_id']
            ).description
            self.assertEqual(student['description'], real_description)


class DeleteStudentViewTest(TestCase):
    tutor_id = MOCK_VK_USER_ID
    student_id_1 = MOCK_VK_USER_ID + 1
    student_id_2 = MOCK_VK_USER_ID + 2
    student_id_3 = MOCK_VK_USER_ID + 3
    student_desc_1 = "test student 1"
    student_desc_2 = "test student 2"
    student_desc_3 = "test student 3"

    def setUp(self):
        tutor_profile = Profile.objects.create(pk=self.tutor_id)
        student_profile_1 = Profile.objects.create(
            pk=self.student_id_1, description=self.student_desc_1
        )
        student_profile_2 = Profile.objects.create(
            pk=self.student_id_2, description=self.student_desc_2
        )
        student_profile_3 = Profile.objects.create(
            pk=self.student_id_3, description=self.student_desc_3
        )
        tutor_students = Students.objects.create(tutor=tutor_profile)
        tutor_students.students.add(
            student_profile_1, student_profile_2, student_profile_3
        )

    def test(self):
        response = client.post(
            "/api/v1/delete_student/",
            {
                "sign": MOCK_SIGN,
                "student_id": self.student_id_3,
                **MOCK_VK_EXECUTION_PARAMS,
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        students = Students.objects.get(
            tutor_id=self.tutor_id
        ).students.all()
        self.assertEqual(len(students), 2)
        self.assertNotIn(self.student_id_3, students)
