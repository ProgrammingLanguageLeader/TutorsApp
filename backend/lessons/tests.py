from datetime import datetime, timezone, timedelta

from django.urls import reverse
from django.contrib.auth import get_user_model
from django.db.models import Q

from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework import status

from tutors.models import TutorStudents

from lessons.models import Lesson


class LessonTests(APITestCase):
    UserModel = get_user_model()
    request_factory = APIRequestFactory()

    tester_kwargs = {
        'username': 'tester',
        'password': 'tester',
    }
    teacher_kwargs = {
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
        'duration': lesson_duration,
        'price': lesson_price
    }
    teacher_tester_lesson_2_kwargs = {
        'beginning_time': teacher_tester_lesson_2_start,
        'duration': lesson_duration,
        'price': lesson_price
    }
    tester_student_lesson_kwargs = {
        'beginning_time': tester_student_lesson_start,
        'duration': lesson_duration,
        'price': lesson_price
    }

    def setUp(self):
        self.tester = self.UserModel.objects.create_user(
            **self.tester_kwargs
        )
        self.student = self.UserModel.objects.create_user(
            **self.student_kwargs
        )
        self.teacher = self.UserModel.objects.create_user(
            **self.teacher_kwargs
        )

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

    def test_list(self):
        self.client.login(**self.teacher_kwargs)
        request = self.request_factory.get(
            reverse('lesson-list')
        )
        response = self.client.get(request.path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results')
        lessons = Lesson.objects.filter(
            Q(tutor=self.teacher) | Q(student=self.teacher)
        )
        self.assertEqual(len(results), len(lessons))

    def test_retrieve(self):
        self.client.login(**self.tester_kwargs)
        request = self.request_factory.get(
            reverse('lesson-detail', kwargs={
                'pk': self.tester_student_lesson.pk
            })
        )
        response = self.client.get(request.path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):
        self.client.login(**self.tester_kwargs)
        new_lesson_start = self.teacher_tester_lesson_2_start\
            + timedelta(hours=10)
        new_lesson_kwargs = {
            'price': 1000,
            'beginning_time': new_lesson_start,
            'duration': self.lesson_duration,
            'tutor': self.tester.id,
            'student': self.student.id
        }
        request = self.request_factory.get(
            reverse('lesson-list')
        )
        response = self.client.post(request.path, new_lesson_kwargs)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
