# Generated by Django 2.1.3 on 2018-12-15 21:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('lesson_id', models.AutoField(primary_key=True, serialize=False)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('modification_time', models.DateTimeField(auto_now_add=True)),
                ('beginning_time', models.DateTimeField()),
                ('ending_time', models.DateTimeField()),
                ('price', models.IntegerField()),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='LessonApplication',
            fields=[
                ('lesson_application_id', models.AutoField(primary_key=True, serialize=False)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('beginning_time', models.DateTimeField()),
                ('ending_time', models.DateTimeField()),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lesson_application_lesson', to='backend.Lesson')),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('notification_id', models.AutoField(primary_key=True, serialize=False)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('event', models.IntegerField(choices=[(0, 'STUDENT_APPLICATION_CREATION'), (1, 'STUDENT_APPLICATION_ACCEPT'), (2, 'STUDENT_APPLICATION_REJECT'), (3, 'LESSON_CREATION'), (4, 'DELETION_FROM_STUDENTS'), (5, 'LESSON_CHANGING'), (6, 'LESSON_DEACTIVATION'), (7, 'LESSON_APPLICATION_CREATION'), (8, 'LESSON_APPLICATION_ACCEPT'), (9, 'LESSON_APPLICATION_REJECT'), (10, 'PAYMENT_APPLICATION_CREATION'), (11, 'PAYMENT_APPLICATION_ACCEPT'), (12, 'PAYMENT_APPLICATION_REJECT')])),
                ('seen', models.BooleanField(default=False)),
                ('lesson', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.Lesson')),
                ('lesson_application', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.LessonApplication')),
            ],
        ),
        migrations.CreateModel(
            name='PaymentApplication',
            fields=[
                ('payment_application_id', models.AutoField(primary_key=True, serialize=False)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payment_application_lesson', to='backend.Lesson')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('profile_id', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('experience', models.TextField(blank=True, max_length=100, null=True)),
                ('education', models.TextField(blank=True, max_length=100, null=True)),
                ('city', models.TextField(blank=True, max_length=50, null=True)),
                ('district', models.TextField(blank=True, max_length=50, null=True)),
                ('street', models.TextField(blank=True, max_length=50, null=True)),
                ('metro_station', models.TextField(blank=True, max_length=50, null=True)),
                ('description', models.TextField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('report_id', models.AutoField(primary_key=True, serialize=False)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('ball', models.IntegerField()),
                ('text', models.TextField(max_length=512)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='report_author', to='backend.Profile')),
                ('recipient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='report_recipient', to='backend.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='StudentApplication',
            fields=[
                ('student_application_id', models.AutoField(primary_key=True, serialize=False)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_application_student', to='backend.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='Students',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('students', models.ManyToManyField(to='backend.Profile')),
                ('tutor', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='students_tutor', to='backend.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='Vacancy',
            fields=[
                ('vacancy_id', models.AutoField(primary_key=True, serialize=False)),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('subject', models.CharField(max_length=128)),
                ('ege', models.BooleanField(default=False)),
                ('oge', models.BooleanField(default=False)),
                ('foreign_lang_cert', models.BooleanField(default=False)),
                ('primary_school', models.BooleanField(default=False)),
                ('secondary_school', models.BooleanField(default=False)),
                ('olympiads', models.BooleanField(default=False)),
                ('university', models.BooleanField(default=False)),
                ('home_schooling', models.BooleanField(default=False)),
                ('price', models.IntegerField()),
                ('extra_info', models.TextField(blank=True, max_length=1024, null=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vacancy_owner', to='backend.Profile')),
            ],
        ),
        migrations.AddField(
            model_name='studentapplication',
            name='vacancy',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_application_vacancy', to='backend.Vacancy'),
        ),
        migrations.AddField(
            model_name='paymentapplication',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payment_application_student', to='backend.Profile'),
        ),
        migrations.AddField(
            model_name='notification',
            name='payment_application',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.PaymentApplication'),
        ),
        migrations.AddField(
            model_name='notification',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notification_profile', to='backend.Profile'),
        ),
        migrations.AddField(
            model_name='notification',
            name='student',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notification_student', to='backend.Profile'),
        ),
        migrations.AddField(
            model_name='notification',
            name='student_application',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.StudentApplication'),
        ),
        migrations.AddField(
            model_name='notification',
            name='tutor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notification_tutor', to='backend.Profile'),
        ),
        migrations.AddField(
            model_name='lessonapplication',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lesson_application_student', to='backend.Profile'),
        ),
        migrations.AddField(
            model_name='lesson',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lesson_student', to='backend.Profile'),
        ),
        migrations.AddField(
            model_name='lesson',
            name='tutor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lesson_tutor', to='backend.Profile'),
        ),
        migrations.AlterUniqueTogether(
            name='studentapplication',
            unique_together={('vacancy', 'student')},
        ),
        migrations.AlterUniqueTogether(
            name='paymentapplication',
            unique_together={('lesson', 'student')},
        ),
        migrations.AlterUniqueTogether(
            name='lessonapplication',
            unique_together={('lesson', 'student')},
        ),
    ]
