from enum import Enum, unique

from django.db import models


@unique
class NotificationEventChoice(Enum):
    STUDENT_APPLICATION_CREATION = 0
    STUDENT_APPLICATION_ACCEPT = 1
    STUDENT_APPLICATION_REJECT = 2
    LESSON_CREATION = 3
    DELETION_FROM_STUDENTS = 4
    LESSON_CHANGING = 5
    LESSON_DELETION = 6
    LESSON_APPLICATION_CREATION = 7
    LESSON_APPLICATION_ACCEPT = 8
    LESSON_APPLICATION_REJECT = 9


class Profile(models.Model):
    profile_id = models.IntegerField(
        primary_key=True,
        unique=True,
        blank=False
    )
    creation_time = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    experience = models.TextField(null=True, blank=True, max_length=100)
    education = models.TextField(null=True, blank=True, max_length=100)
    city = models.TextField(null=True, blank=True, max_length=50)
    district = models.TextField(null=True, blank=True, max_length=50)
    street = models.TextField(null=True, blank=True, max_length=50)
    metro_station = models.TextField(null=True, blank=True, max_length=50)
    description = models.TextField(null=True, blank=True, max_length=100)

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
    price = models.IntegerField()

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


class StudentApplication(models.Model):
    student_application_id = models.AutoField(primary_key=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    vacancy = models.ForeignKey(
        Vacancy, on_delete=models.CASCADE,
        related_name='student_application_vacancy'
    )
    student = models.ForeignKey(
        Profile, on_delete=models.CASCADE,
        related_name='student_application_student'
    )

    class Meta:
        unique_together = (('vacancy', 'student'), )

    def __str__(self):
        return 'created: {} | vacancy: {} | student: {}'.format(
            self.creation_time.strftime('%B %d %Y %H:%M'),
            self.vacancy_id,
            self.student_id
        ).capitalize()


class LessonApplication(models.Model):
    lesson_application_id = models.AutoField(primary_key=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE,
        related_name='lesson_application_lesson'
    )
    student = models.ForeignKey(
        Profile, on_delete=models.CASCADE,
        related_name='lesson_application_student'
    )
    beginning_time = models.DateTimeField()
    ending_time = models.DateTimeField()

    class Meta:
        unique_together = (('lesson', 'student'), )

    def __str__(self):
        return 'created: {} | lesson: {} | student: {}'.format(
            self.creation_time.strftime('%B %d %Y %H:%M'),
            self.lesson_id,
            self.student_id
        ).capitalize()


class Notification(models.Model):
    notification_id = models.AutoField(primary_key=True)
    creation_time = models.DateTimeField(auto_now_add=True)
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
    student_application = models.ForeignKey(
        StudentApplication, on_delete=models.CASCADE,
        null=True, blank=True
    )
    lesson_application = models.ForeignKey(
        LessonApplication, on_delete=models.CASCADE,
        null=True, blank=True
    )
    tutor = models.ForeignKey(
        Profile, on_delete=models.CASCADE,
        null=True, blank=True
    )
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE,
        null=True, blank=True
    )
    seen = models.BooleanField(default=False)

    def __str__(self):
        return 'profile: {} | event: {} | seen: {}'.format(
            self.profile_id,
            NotificationEventChoice(self.event).name,
            self.seen
        ).capitalize()
