from datetime import datetime
from datetime import timedelta
from datetime import timezone

from django.conf import settings
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.status import HTTP_200_OK
from rest_framework.status import HTTP_400_BAD_REQUEST

from backend.models import Profile
from backend.models import Students
from backend.models import Lesson
from backend.tests.constants import MOCK_USER_ID
from backend.tests.constants import MOCK_SIGNED_USER_ID
from backend.tests.constants import MOCK_VK_APP_SECRET


settings.VK_APP_SECRET = MOCK_VK_APP_SECRET
client = APIClient()


class CreateLessonViewTest(TestCase):
    lesson_id = 1
    tutor_id = MOCK_USER_ID
    student_id_1 = MOCK_USER_ID + 1
    student_id_2 = MOCK_USER_ID + 2
    beginning_time = datetime(
        day=3, month=9, year=2018, hour=14, minute=30,
        tzinfo=timezone.utc
    )
    ending_time = beginning_time + timedelta(hours=1, minutes=30)

    def setUp(self):
        Profile.objects.create(pk=self.tutor_id)
        Profile.objects.create(pk=self.student_id_1)
        Profile.objects.create(pk=self.student_id_2)
        students_table = Students.objects.create(tutor_id=self.tutor_id)
        students_table.students.add(self.student_id_1)

    def test_success(self):
        response = client.post(
            "/api/v1/create_lesson/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": self.tutor_id,
                "student_id": self.student_id_1,
                "beginning_time": self.beginning_time,
                "ending_time": self.ending_time
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        lesson = Lesson.objects.get(pk=self.lesson_id)
        self.assertEqual(lesson.student_id, self.student_id_1)
        beginning_timedelta = lesson.beginning_time - self.beginning_time
        self.assertEqual(beginning_timedelta, timedelta())
        ending_timedelta = lesson.ending_time - self.ending_time
        self.assertEqual(ending_timedelta, timedelta())

    def test_failure(self):
        response = client.post(
            "/api/v1/create_lesson/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": self.tutor_id,
                "student_id": self.student_id_2,
                "beginning_time": self.beginning_time,
                "ending_time": self.ending_time
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST)
        with self.assertRaises(Lesson.DoesNotExist):
            Lesson.objects.get(pk=self.lesson_id)
