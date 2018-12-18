from django.conf import settings
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.status import HTTP_200_OK

from backend.models import Profile
from backend.models import Vacancy
from backend.models import StudentApplication
from backend.models import Notification
from backend.models import Students
from backend.tests.constants import MOCK_VK_USER_ID
from backend.tests.constants import MOCK_SIGN
from backend.tests.constants import MOCK_VK_APP_SECRET
from backend.tests.constants import MOCK_VK_EXECUTION_PARAMS


settings.VK_APP_SECRET = MOCK_VK_APP_SECRET
client = APIClient()


class CreateStudentApplicationViewTest(TestCase):
    user_id = MOCK_VK_USER_ID
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
            "/api/v1/create_student_application/",
            {
                "sign": MOCK_SIGN,
                "user_id": MOCK_VK_USER_ID,
                "vacancy_id": self.vacancy_id,
                **MOCK_VK_EXECUTION_PARAMS,
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        applications = StudentApplication.objects.filter(
            vacancy_id=self.vacancy_id
        )
        self.assertEqual(len(applications), self.application_number)
        application = applications[0]
        self.assertEqual(application.student_id, self.user_id)


class GetTutorApplicationsViewTest(TestCase):
    user_id = MOCK_VK_USER_ID
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
            StudentApplication.objects.create(
                vacancy_id=self.vacancy_id,
                student_id=student_id
            )

    def test(self):
        response = client.get(
            "/api/v1/get_incoming_applications/",
            {
                "sign": MOCK_SIGN,
                "user_id": MOCK_VK_USER_ID,
                **MOCK_VK_EXECUTION_PARAMS,
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        applications = StudentApplication.objects.filter(vacancy_id=self.vacancy_id)
        self.assertEqual(len(applications), self.application_number)


class GetStudentApplicationsViewTest(TestCase):
    user_id = MOCK_VK_USER_ID
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
            StudentApplication.objects.create(
                vacancy_id=vacancy_id,
                student_id=self.user_id
            )

    def test(self):
        response = client.get(
            "/api/v1/get_outgoing_applications/",
            {
                "sign": MOCK_SIGN,
                "user_id": MOCK_VK_USER_ID,
                **MOCK_VK_EXECUTION_PARAMS,
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        applications = StudentApplication.objects.filter(
            student_id=self.user_id
        )
        self.assertEqual(len(applications), self.tutors_number)


class AcceptApplicationViewTest(TestCase):
    user_id = MOCK_VK_USER_ID
    student_id = user_id + 1
    subject = "Math"
    price = 1000
    student_application_id = 1
    vacancy_id = 1

    def setUp(self):
        Profile.objects.create(pk=self.user_id)
        student = Profile.objects.create(pk=self.student_id)
        vacancy = Vacancy.objects.create(
            owner_id=self.user_id,
            subject=self.subject,
            price=self.price
        )
        StudentApplication.objects.create(
            vacancy=vacancy,
            student=student
        )

    def test(self):
        response = client.post(
            "/api/v1/accept_student_application/",
            {
                "sign": MOCK_SIGN,
                "user_id": MOCK_VK_USER_ID,
                "student_application_id": self.student_application_id,
                **MOCK_VK_EXECUTION_PARAMS,
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        applications = StudentApplication.objects.filter(
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
    user_id = MOCK_VK_USER_ID
    student_id = user_id + 1
    subject = "Math"
    price = 1000
    student_application_id = 1
    vacancy_id = 1

    def setUp(self):
        Profile.objects.create(pk=self.user_id)
        student = Profile.objects.create(pk=self.student_id)
        vacancy = Vacancy.objects.create(
            owner_id=self.user_id,
            subject=self.subject,
            price=self.price
        )
        StudentApplication.objects.create(
            vacancy=vacancy,
            student=student
        )

    def test(self):
        response = client.post(
            "/api/v1/reject_student_application/",
            {
                "sign": MOCK_SIGN,
                "user_id": self.user_id,
                "student_application_id": self.student_application_id,
                **MOCK_VK_EXECUTION_PARAMS,
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        applications = StudentApplication.objects.filter(
            vacancy_id=self.vacancy_id
        )
        self.assertEqual(len(applications), 0)
        notifications = Notification.objects.filter(
            profile_id=self.student_id
        )
        self.assertEqual(len(notifications), 1)

