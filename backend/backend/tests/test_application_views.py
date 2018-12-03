from django.conf import settings
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.status import HTTP_200_OK

from backend.models import Profile
from backend.models import Vacancy
from backend.models import Application
from backend.models import Notification
from backend.models import Students
from backend.tests.constants import MOCK_USER_ID
from backend.tests.constants import MOCK_SIGNED_USER_ID
from backend.tests.constants import MOCK_VK_APP_SECRET


settings.VK_APP_SECRET = MOCK_VK_APP_SECRET
client = APIClient()


class CreateApplicationViewTest(TestCase):
    user_id = MOCK_USER_ID
    tutor_id = user_id + 1
    subject = "Math"
    price = 1000
    vacancy_id = 1
    application_number = 1

    def setUp(self):
        Profile.objects.create(pk=self.user_id)
        Profile.objects.create(pk=self.tutor_id)
        Vacancy.objects.create(
            owner_id=self.tutor_id,
            subject=self.subject,
            price=self.price
        )

    def test(self):
        response = client.post(
            "/api/v1/create_application/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID,
                "vacancy_id": self.vacancy_id
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        applications = Application.objects.filter(vacancy_id=self.vacancy_id)
        self.assertEqual(len(applications), self.application_number)
        application = applications[0]
        self.assertEqual(application.student_id, self.user_id)


class GetTutorApplicationsViewTest(TestCase):
    user_id = MOCK_USER_ID
    subject = "Math"
    price = 1000
    vacancy_id = 1
    application_number = 8

    def setUp(self):
        Profile.objects.create(pk=self.user_id)
        Vacancy.objects.create(
            owner_id=self.user_id,
            subject=self.subject,
            price=self.price
        )
        for student_number in range(1, self.application_number + 1):
            student_id = self.user_id + student_number
            Profile.objects.create(pk=student_id)
            Application.objects.create(
                vacancy_id=self.vacancy_id,
                student_id=student_id
            )

    def test(self):
        response = client.get(
            "/api/v1/get_tutor_applications/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        applications = Application.objects.filter(vacancy_id=self.vacancy_id)
        self.assertEqual(len(applications), self.application_number)


class GetStudentApplicationsViewTest(TestCase):
    user_id = MOCK_USER_ID
    subject = "Math"
    price = 1000
    vacancy_id = 1
    tutors_number = 4

    def setUp(self):
        Profile.objects.create(pk=self.user_id)
        for tutor_number in range(1, self.tutors_number + 1):
            tutor_id = self.user_id + tutor_number
            vacancy_id = tutor_number
            Profile.objects.create(pk=tutor_id)
            Vacancy.objects.create(
                owner_id=tutor_id,
                subject=self.subject,
                price=self.price
            )
            Application.objects.create(
                vacancy_id=vacancy_id,
                student_id=self.user_id
            )

    def test(self):
        response = client.get(
            "/api/v1/get_student_applications/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        applications = Application.objects.filter(student_id=self.user_id)
        self.assertEqual(len(applications), self.tutors_number)


class AcceptApplicationViewTest(TestCase):
    user_id = MOCK_USER_ID
    student_id = user_id + 1
    subject = "Math"
    price = 1000
    application_id = 1
    vacancy_id = 1

    def setUp(self):
        Profile.objects.create(pk=self.user_id)
        student = Profile.objects.create(pk=self.student_id)
        vacancy = Vacancy.objects.create(
            owner_id=self.user_id,
            subject=self.subject,
            price=self.price
        )
        Application.objects.create(
            vacancy=vacancy,
            student=student
        )

    def test(self):
        response = client.post(
            "/api/v1/accept_application/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": MOCK_USER_ID,
                "application_id": self.application_id
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        applications = Application.objects.filter(
            vacancy_id=self.vacancy_id
        )
        self.assertEqual(len(applications), 0)
        notifications = Notification.objects.filter(
            profile_id=self.student_id
        )
        self.assertEqual(len(notifications), 1)
        students = Students.objects.filter(
            tutor_id=self.user_id
        )
        self.assertEqual(len(students), 1)


class RejectApplicationViewTest(TestCase):
    user_id = MOCK_USER_ID
    student_id = user_id + 1
    subject = "Math"
    price = 1000
    application_id = 1
    vacancy_id = 1

    def setUp(self):
        Profile.objects.create(pk=self.user_id)
        student = Profile.objects.create(pk=self.student_id)
        vacancy = Vacancy.objects.create(
            owner_id=self.user_id,
            subject=self.subject,
            price=self.price
        )
        Application.objects.create(
            vacancy=vacancy,
            student=student
        )

    def test(self):
        response = client.post(
            "/api/v1/reject_application/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": self.user_id,
                "application_id": self.application_id
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        applications = Application.objects.filter(
            vacancy_id=self.vacancy_id
        )
        self.assertEqual(len(applications), 0)
        notifications = Notification.objects.filter(
            profile_id=self.student_id
        )
        self.assertEqual(len(notifications), 1)

