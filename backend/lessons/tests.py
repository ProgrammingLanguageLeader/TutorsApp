from datetime import datetime, timezone, timedelta

from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework.test import APITestCase, APIRequestFactory, \
    force_authenticate
from rest_framework import status

from tutors.models import TutorStudents

from lessons.models import Lesson
from lessons.views import LessonViewSet


class LessonTests(APITestCase):
    UserModel = get_user_model()
    request_factory = APIRequestFactory()

    tester_kwargs = {
        'username': 'tester',
        'password': 'tester',
    }
    tutor_kwargs = {
        'username': 'teacher',
        'password': 'teacher',
    }
    student_kwargs = {
        'username': 'student',
        'password': 'student'
    }

    lesson_duration = timedelta(hours=1)
    lesson_price = 1000
    teacher_tester_lesson_1_start = datetime.now(tz=timezone.utc)
    tester_student_lesson_start = teacher_tester_lesson_1_start \
        + timedelta(hours=2)
    teacher_tester_lesson_2_start = tester_student_lesson_start \
        + timedelta(hours=4)

    teacher_tester_lesson_1_kwargs = {
        'beginning_time': teacher_tester_lesson_1_start,
        'ending_time': teacher_tester_lesson_1_start + lesson_duration,
        'price': lesson_price
    }
    teacher_tester_lesson_2_kwargs = {
        'beginning_time': teacher_tester_lesson_2_start,
        'ending_time': teacher_tester_lesson_2_start + lesson_duration,
        'price': lesson_price
    }
    tester_student_lesson_kwargs = {
        'beginning_time': tester_student_lesson_start,
        'ending_time': tester_student_lesson_start + lesson_duration,
        'price': lesson_price
    }

    def setUp(self):
        self.tester = self.UserModel.objects.create(**self.tester_kwargs)
        self.student = self.UserModel.objects.create(**self.student_kwargs)
        self.teacher = self.UserModel.objects.create(**self.tutor_kwargs)

        teacher_tutor_students = TutorStudents.objects.create(
            user=self.teacher
        )
        teacher_tutor_students.students.add(self.student, self.tester)

        tester_tutor_students = TutorStudents.objects.create(
            user=self.tester
        )
        tester_tutor_students.students.add(self.student)

        self.teacher_tester_lesson_1 = Lesson.objects.create(
            tutor=self.teacher,
            student=self.tester,
            **self.teacher_tester_lesson_1_kwargs,
        )
        self.tester_student_lesson = Lesson.objects.create(
            tutor=self.tester,
            student=self.student,
            **self.tester_student_lesson_kwargs,
        )
        self.teacher_tester_lesson_2 = Lesson.objects.create(
            tutor=self.teacher,
            student=self.tester,
            **self.teacher_tester_lesson_2_kwargs,
        )

    def test_view_set(self):
        view = LessonViewSet.as_view({
            'get': 'list'
        })
        request = self.request_factory.get(
            reverse('lesson-list')
        )
        force_authenticate(request, self.teacher)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results')
        self.assertEqual(len(results), 2)
