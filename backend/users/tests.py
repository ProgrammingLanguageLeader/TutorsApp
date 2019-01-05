from django.test import TestCase

from users.models import User


class UserTest(TestCase):
    admin_username = 'admin'
    admin_email = 'admin@tutors-app.ru'
    admin_first_name = 'Test Admin'
    admin_last_name = 'User'
    common_username = 'user'
    common_email = 'user@tutors-app.ru'
    common_first_name = 'Test Common'
    common_last_name = 'User'
    password = 'ffdfsdfsereagh124'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def setUp(self):
        User.objects.create(,
        User.objects.create_superuser(
            username=self.admin_username,
            email=self.admin_email,
            password=self.password,
            first_name=self.admin_first_name,
            last_name=self.admin_last_name
        )

    def test_common_user(self):
        user = User.objects.get(email=self.common_email)
        self.assertEqual(user.username, self.common_username)
        self.assertEqual(user.email, self.common_email)
        self.assertEqual(user.first_name, self.common_first_name)
        self.assertEqual(user.last_name, self.common_last_name)

    def test_admin_user(self):
        user = User.objects.get(username=self.admin_username)
        self.assertEqual(user.username, self.admin_username)
        self.assertEqual(user.email, self.admin_email)
        self.assertEqual(user.first_name, self.admin_first_name)
        self.assertEqual(user.last_name, self.admin_last_name)
