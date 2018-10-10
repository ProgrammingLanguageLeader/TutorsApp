from django.db import models


class Profile(models.Model):
    vk_id = models.IntegerField(
        primary_key=True,
        unique=True,
        blank=False
    )
    is_active = models.BooleanField(default=True)
    experience = models.TextField(null=True, max_length=4096)
    education = models.TextField(null=True, max_length=4096)
    address = models.TextField(null=True, max_length=128)
    description = models.TextField(null=True, max_length=4096)
    home_schooling = models.BooleanField(default=False)
    activity_time_start = models.TimeField(null=True)
    activity_time_end = models.TimeField(null=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    distance_learning = models.BooleanField(default=False)
    ege = models.BooleanField(default=False)
    oge = models.BooleanField(default=False)
    foreign_lang_cert = models.BooleanField(default=False)
    primary_school = models.BooleanField(default=False)
    secondary_school = models.BooleanField(default=False)
    olympiads = models.BooleanField(default=False)
    university = models.BooleanField(default=False)

    def __str__(self):
        return self.vk_id


class Vacancy(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    subject = models.CharField(max_length=128, null=True)
    ege = models.BooleanField(default=False)
    oge = models.BooleanField(default=False)
    foreign_lang_cert = models.BooleanField(default=False)
    primary_school = models.BooleanField(default=False)
    secondary_school = models.BooleanField(default=False)
    olympiads = models.BooleanField(default=False)
    university = models.BooleanField(default=False)
    home_schooling = models.BooleanField(default=False)
    price = models.IntegerField(blank=False)
    extra_info = models.TextField(null=True, max_length=1024)


class Lesson(models.Model):
    tutor = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='lesson_tutor'
    )
    student = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='lesson_student'
    )
    is_active = models.BooleanField(default=True)
    beginning_time = models.TimeField(null=True)
    ending_time = models.TimeField(null=True)


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
