from django.db import models


class Profile(models.Model):
    vk_id = models.IntegerField(
        primary_key=True,
        unique=True,
        blank=False
    )
    creation_time = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    experience = models.TextField(null=True, blank=True, max_length=4096)
    education = models.TextField(null=True, blank=True, max_length=4096)
    address = models.TextField(null=True, blank=True, max_length=128)
    description = models.TextField(null=True,blank=True, max_length=4096)
    home_schooling = models.BooleanField(default=False)
    activity_time_start = models.TimeField(blank=True, null=True)
    activity_time_end = models.TimeField(blank=True, null=True)
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
        return str(self.vk_id)


class Vacancy(models.Model):
    creation_time = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
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


class Lesson(models.Model):
    creation_time = models.DateTimeField(auto_now_add=True)
    tutor = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='lesson_tutor'
    )
    student = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='lesson_student'
    )
    is_active = models.BooleanField(default=True)
    beginning_time = models.TimeField(null=True, blank=True)
    ending_time = models.TimeField(null=True, blank=True)


class Report(models.Model):
    creation_time = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        Profile, models.CASCADE, related_name='report_author'
    )
    recipient = models.ForeignKey(
        Profile, models.CASCADE, related_name='report_recipient'
    )
    ball = models.IntegerField(null=False)
    text = models.TextField(null=False, max_length=512)


class Application(models.Model):
    creation_time = models.DateTimeField(auto_now_add=True)
    vacancy = models.ForeignKey(
        Vacancy, on_delete=models.CASCADE, related_name='application_vacancy'
    )
    student = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='application_student'
    )
    is_active = models.BooleanField(default=True)
    accepted = models.BooleanField(default=True)
