# Generated by Django 2.1.1 on 2018-11-18 16:43

import backend.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_auto_20181029_2339'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.IntegerField(choices=[(backend.models.NotificationEventChoice(0), 0), (backend.models.NotificationEventChoice(1), 1), (backend.models.NotificationEventChoice(2), 2), (backend.models.NotificationEventChoice(3), 3), (backend.models.NotificationEventChoice(4), 4), (backend.models.NotificationEventChoice(5), 5)])),
                ('seen', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Students',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('students', models.ManyToManyField(to='backend.Profile')),
                ('tutor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='students_tutor', to='backend.Profile')),
            ],
        ),
        migrations.RemoveField(
            model_name='application',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='lesson',
            name='is_active',
        ),
        migrations.AddField(
            model_name='application',
            name='answer_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='lesson',
            name='modification_time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='application',
            name='accepted',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='beginning_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='ending_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='vacancy',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vacancy_owner', to='backend.Profile'),
        ),
        migrations.AddField(
            model_name='notification',
            name='application',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.Application'),
        ),
        migrations.AddField(
            model_name='notification',
            name='lesson',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.Lesson'),
        ),
        migrations.AddField(
            model_name='notification',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notification_profile', to='backend.Profile'),
        ),
    ]