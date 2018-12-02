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
    ending_time = datetime(
        day=3, month=9, year=2018, hour=16, minute=00,
        tzinfo=timezone.utc
    )

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
                "beginning_time": self.beginning_time.isoformat(),
                "ending_time": self.ending_time.isoformat()
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
                "beginning_time": self.beginning_time.isoformat(),
                "ending_time": self.ending_time.isoformat()
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST)
        with self.assertRaises(Lesson.DoesNotExist):
            Lesson.objects.get(pk=self.lesson_id)


class GetLessonsViewTest(TestCase):
    user_id = MOCK_USER_ID
    tutor_id = MOCK_USER_ID + 1
    student_id = MOCK_USER_ID + 2
    user_lessons_number = 3
    first_lesson_start = datetime.now(tz=timezone.utc)
    first_lesson_end = first_lesson_start + timedelta(hours=1)
    second_lesson_start = datetime.now(tz=timezone.utc) + timedelta(hours=2)
    second_lesson_end = second_lesson_start + timedelta(hours=1)
    third_lesson_start = datetime.now(tz=timezone.utc) + timedelta(hours=4)
    third_lesson_end = third_lesson_start + timedelta(hours=1)

    def setUp(self):
        Profile.objects.create(pk=self.user_id)
        Profile.objects.create(pk=self.tutor_id)
        Profile.objects.create(pk=self.student_id)
        tutor_students_table = Students.objects.create(tutor_id=self.tutor_id)
        tutor_students_table.students.add(
            self.student_id, self.user_id
        )
        user_students_table = Students.objects.create(tutor_id=self.user_id)
        user_students_table.students.add(self.student_id)
        Lesson.objects.create(
            tutor_id=self.tutor_id,
            student_id=self.user_id,
            beginning_time=self.first_lesson_start,
            ending_time=self.first_lesson_end
        )
        Lesson.objects.create(
            tutor_id=self.user_id,
            student_id=self.student_id,
            beginning_time=self.second_lesson_start,
            ending_time=self.second_lesson_end
        )
        Lesson.objects.create(
            tutor_id=self.tutor_id,
            student_id=self.user_id,
            beginning_time=self.third_lesson_start,
            ending_time=self.third_lesson_end
        )

    def test(self):
        response = client.get(
            "/api/v1/get_lessons/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": self.user_id
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(len(response.data), self.user_lessons_number)


class UpdateLessonViewTest(TestCase):
    lesson_id = 1
    user_id = MOCK_USER_ID
    student_id = user_id + 1
    new_beginning_time = datetime(
        day=3, month=9, year=2018, hour=14, minute=30,
        tzinfo=timezone.utc
    )
    new_ending_time = datetime(
        day=3, month=9, year=2018, hour=16, minute=00,
        tzinfo=timezone.utc
    )

    def setUp(self):
        Profile.objects.create(pk=self.user_id)
        Profile.objects.create(pk=self.student_id)
        students_table = Students.objects.create(tutor_id=self.user_id)
        students_table.students.add(self.student_id)
        Lesson.objects.create(
            tutor_id=self.user_id,
            student_id=self.student_id,
            beginning_time=datetime.now(tz=timezone.utc),
            ending_time=datetime.now(tz=timezone.utc)
        )

    def test(self):
        response = client.post(
            "/api/v1/update_lesson/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": self.user_id,
                "lesson_id": self.lesson_id,
                "beginning_time": self.new_beginning_time.isoformat(),
                "ending_time": self.new_ending_time.isoformat()
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)


class DeleteLessonViewTest(TestCase):
    lesson_id = 1
    user_id = MOCK_USER_ID
    tutor_id = MOCK_USER_ID + 1
    lesson_start = datetime.now(tz=timezone.utc)
    lesson_end = lesson_start + timedelta(hours=1)

    def setUp(self):
        Profile.objects.create(pk=self.user_id)
        Profile.objects.create(pk=self.tutor_id)
        tutor_students_table = Students.objects.create(tutor_id=self.tutor_id)
        tutor_students_table.students.add(self.user_id)
        Lesson.objects.create(
            tutor_id=self.tutor_id,
            student_id=self.user_id,
            beginning_time=self.lesson_start,
            ending_time=self.lesson_end
        )

    def test(self):
        response = client.post(
            "/api/v1/delete_lesson/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": self.user_id,
                "lesson_id": self.lesson_id
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        with self.assertRaises(Lesson.DoesNotExist):
            Lesson.objects.get(pk=self.lesson_id)
