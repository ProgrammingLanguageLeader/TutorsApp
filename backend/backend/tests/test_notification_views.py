from django.conf import settings
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.status import HTTP_200_OK

from backend.models import Profile
from backend.models import Vacancy
from backend.models import StudentApplication
from backend.models import Notification
from backend.models import NotificationEventChoice
from backend.tests.constants import MOCK_USER_ID
from backend.tests.constants import MOCK_SIGNED_USER_ID
from backend.tests.constants import MOCK_VK_APP_SECRET


settings.VK_APP_SECRET = MOCK_VK_APP_SECRET
client = APIClient()


class GetNotificationsViewTest(TestCase):
    user_id = MOCK_USER_ID
    subject = "Math"
    price = 1000
    application_number = 8
    notification_number = 8

    def setUp(self):
        Profile.objects.create(pk=self.user_id)
        vacancy = Vacancy.objects.create(
            owner_id=self.user_id,
            subject=self.subject,
            price=self.price
        )
        for student_number in range(1, self.application_number + 1):
            student_id = self.user_id + student_number
            Profile.objects.create(pk=student_id)
            student_application = StudentApplication.objects.create(
                vacancy_id=vacancy.vacancy_id,
                student_id=student_id
            )
            Notification.objects.create(
                profile_id=self.user_id,
                student_application=student_application,
                event=NotificationEventChoice.APPLICATION_CREATION.value
            )

    def test(self):
        response = client.get(
            "/api/v1/get_notifications/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": self.user_id
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        notifications = Notification.objects.filter(
            profile_id=self.user_id
        )
        self.assertEqual(len(notifications), self.application_number)


class MarkNotificationAsSeenViewTest(TestCase):
    user_id = MOCK_USER_ID
    subject = "Math"
    price = 1000
    application_number = 8
    notification_number = 8
    notification_id = 1

    def setUp(self):
        Profile.objects.create(pk=self.user_id)
        vacancy = Vacancy.objects.create(
            owner_id=self.user_id,
            subject=self.subject,
            price=self.price
        )
        for student_number in range(1, self.application_number + 1):
            student_id = self.user_id + student_number
            Profile.objects.create(pk=student_id)
            student_application = StudentApplication.objects.create(
                vacancy_id=vacancy.vacancy_id,
                student_id=student_id
            )
            Notification.objects.create(
                profile_id=self.user_id,
                student_application=student_application,
                event=NotificationEventChoice.APPLICATION_CREATION.value
            )

    def test(self):
        response = client.post(
            "/api/v1/mark_notification_as_seen/",
            {
                "signed_user_id": MOCK_SIGNED_USER_ID,
                "user_id": self.user_id,
                "notification_id": self.notification_id
            },
            format="json"
        )
        self.assertEqual(response.status_code, HTTP_200_OK)
        notifications = Notification.objects.filter(
            profile_id=self.user_id, seen=True
        )
        self.assertEqual(len(notifications), 1)
