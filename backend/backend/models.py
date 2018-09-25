from django.db import models


class Subject(models.Model):
    name = models.TextField(max_length=100)

    def __str__(self):
        return self.name


class Profile(models.Model):
    vk_id = models.IntegerField(
        primary_key=True,
        unique=True,
        blank=False
    )
    active = models.BooleanField(
        default=True
    )
    subjects = models.ManyToManyField(
        Subject,
        null=True
    )
    description = models.TextField(
        null=True,
        max_length=4096
    )
    mobile = models.BooleanField(
        default=False
    )
    activity_time_start = models.TimeField(
        null=True
    )
    activity_time_end = models.TimeField(
        null=True
    )
    latitude = models.FloatField(
        null=True
    )
    longitude = models.FloatField(
        null=True
    )
    distance_learning = models.BooleanField(
        default=False
    )
    ege = models.BooleanField(
        default=False
    )
    oge = models.BooleanField(
        default=False
    )
    foreign_lang_cert = models.BooleanField(
        default=False
    )
    school = models.BooleanField(
        default=False
    )
    university = models.BooleanField(
        default=False
    )


class Vacancy(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    subjects = models.ManyToManyField(
        Subject,
        null=True
    )
    extra_info = models.TextField(
        null=True,
        max_length=1024
    )
    price = models.IntegerField(
        blank=False
    )
    ege = models.BooleanField(default=False)
    oge = models.BooleanField(default=False)
    school = models.BooleanField(default=False)
    university = models.BooleanField(default=False)
    distance_learning = models.BooleanField(default=False)
    active = models.BooleanField(default=True)


class Schedule(models.Model):
    tutor = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='schedule_tutor'
    )
    student = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='schedule_student'
    )
    beginning_time = models.TimeField(
        null=False
    )
    ending_time = models.TimeField(
        null=False
    )
    active = models.BooleanField(
        default=True, blank=False
    )


class Report(models.Model):
    author = models.ForeignKey(
        Profile, models.CASCADE, related_name='report_author'
    )
    recipient = models.ForeignKey(
        Profile, models.CASCADE, related_name='report_recipient'
    )
    ball = models.IntegerField(
        null=False
    )
    text = models.TextField(
        null=False,
        max_length=512
    )
