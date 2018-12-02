from enum import Enum, unique

from django.db import models


@unique
class NotificationEventChoice(Enum):
    APPLICATION_CREATION = 0
    APPLICATION_ANSWER = 1
    LESSON_CREATION = 2
    DELETION_FROM_STUDENTS = 3
    LESSON_CHANGING = 4
    LESSON_DELETION = 5


class Profile(models.Model):
    profile_id = models.IntegerField(
        primary_key=True,
        unique=True,
        blank=False
    )
    creation_time = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    experience = models.TextField(null=True, blank=True, max_length=4096)
    education = models.TextField(null=True, blank=True, max_length=4096)
    address = models.TextField(null=True, blank=True, max_length=128)
    description = models.TextField(null=True, blank=True, max_length=4096)
    home_schooling = models.BooleanField(default=False)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    distance_learning = models.BooleanField(default=False)
    ege = models.BooleanField(default=False)
    oge = models.BooleanField(default=False)
    foreign_lang_cert = models.BooleanField(default=False)
    primary_school = models.BooleanField(default=False)
    secondary_school = models.BooleanField(default=False)
    olympiads = models.BooleanField(default=False)
    university = models.BooleanField(default=False)

    def __str__(self):
        return 'profile ID: {} | created: {} | active: {}'.format(
            self.profile_id,
            self.creation_time.strftime('%B %d %Y %H:%M'),
            self.is_active
        ).capitalize()


class Students(models.Model):
    tutor = models.OneToOneField(
        Profile, on_delete=models.CASCADE,
        related_name='students_tutor'
    )
    students = models.ManyToManyField(Profile)

    def __str__(self):
        return 'tutor: {} | {} students'.format(
            self.tutor_id,
            self.students.count()
        ).capitalize()


class Vacancy(models.Model):
    vacancy_id = models.AutoField(primary_key=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        Profile, on_delete=models.CASCADE,
        related_name='vacancy_owner'
    )
    is_active = models.BooleanField(default=True)
    subject = models.CharField(max_length=128)
    ege = models.BooleanField(default=False)
    oge = models.BooleanField(default=False)
    foreign_lang_cert = models.BooleanField(default=False)
    primary_school = models.BooleanField(default=False)
    secondary_school = models.BooleanField(default=False)
    olympiads = models.BooleanField(default=False)
    university = models.BooleanField(default=False)
    home_schooling = models.BooleanField(default=False)
    price = models.IntegerField(blank=False)
    extra_info = models.TextField(null=True, blank=True, max_length=1024)

    def __str__(self):
        return 'created: {} | owner: {}'.format(
            self.creation_time.strftime('%B %d %Y %H:%M'),
            self.owner_id
        ).capitalize()


class Lesson(models.Model):
    lesson_id = models.AutoField(primary_key=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now_add=True)
    tutor = models.ForeignKey(
        Profile, on_delete=models.CASCADE,
        related_name='lesson_tutor'
    )
    student = models.ForeignKey(
        Profile, on_delete=models.CASCADE,
        related_name='lesson_student'
    )
    beginning_time = models.DateTimeField()
    ending_time = models.DateTimeField()

    def __str__(self):
        return 'tutor: {} | student: {} | created: {}'.format(
            self.tutor_id,
            self.student_id,
            self.creation_time.strftime('%B %d %Y %H:%M')
        )


class Report(models.Model):
    report_id = models.AutoField(primary_key=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        Profile, models.CASCADE, related_name='report_author'
    )
    recipient = models.ForeignKey(
        Profile, models.CASCADE, related_name='report_recipient'
    )
    ball = models.IntegerField(null=False)
    text = models.TextField(null=False, max_length=512)

    def __str__(self):
        return 'created: {} | author: {} | recipient: {}'.format(
            self.creation_time.strftime('%B %d %Y %H:%M'),
            self.author_id,
            self.recipient_id
        ).capitalize()


class Application(models.Model):
    application_id = models.AutoField(primary_key=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    answer_time = models.DateTimeField(null=True, blank=True)
    vacancy = models.ForeignKey(
        Vacancy, on_delete=models.CASCADE,
        related_name='application_vacancy'
    )
    student = models.ForeignKey(
        Profile, on_delete=models.CASCADE,
        related_name='application_student'
    )
    accepted = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return 'created: {} | from: {} | accepted: {}'.format(
            self.creation_time.strftime('%B %d %Y %H:%M'),
            self.student_id,
            self.accepted
        ).capitalize()


class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE,
        related_name='notification_profile'
    )
    event = models.IntegerField(
        choices=[
            (event.value, event.name)
            for event in NotificationEventChoice
        ]
    )
    application = models.ForeignKey(
        Application, on_delete=models.CASCADE,
        null=True, blank=True
    )
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE,
        null=True, blank=True
    )
    seen = models.BooleanField(default=False)

    def __str__(self):
        return 'profile: {} | seen: {}'.format(
            self.profile_id,
            self.seen
        ).capitalize()
