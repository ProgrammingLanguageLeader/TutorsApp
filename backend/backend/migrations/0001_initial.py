# Generated by Django 2.1.1 on 2018-09-24 22:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('vk_id', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('active', models.BooleanField(default=True)),
                ('description', models.TextField(max_length=4096, null=True)),
                ('mobile', models.BooleanField(default=False)),
                ('activity_time_start', models.TimeField(null=True)),
                ('activity_time_end', models.TimeField(null=True)),
                ('latitude', models.FloatField(null=True)),
                ('longitude', models.FloatField(null=True)),
                ('distance_learning', models.BooleanField(default=False)),
                ('ege', models.BooleanField(default=False)),
                ('oge', models.BooleanField(default=False)),
                ('foreign_lang_cert', models.BooleanField(default=False)),
                ('school', models.BooleanField(default=False)),
                ('university', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ball', models.IntegerField()),
                ('text', models.TextField(max_length=512)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='report_author', to='backend.Profile')),
                ('recipient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='report_recipient', to='backend.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('beginning_time', models.TimeField()),
                ('ending_time', models.TimeField()),
                ('active', models.BooleanField(default=True)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='schedule_student', to='backend.Profile')),
                ('tutor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='schedule_tutor', to='backend.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Vacancy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('extra_info', models.TextField(max_length=1024, null=True)),
                ('price', models.IntegerField()),
                ('ege', models.BooleanField(default=False)),
                ('oge', models.BooleanField(default=False)),
                ('school', models.BooleanField(default=False)),
                ('university', models.BooleanField(default=False)),
                ('distance_learning', models.BooleanField(default=False)),
                ('active', models.BooleanField(default=True)),
                ('subjects', models.ManyToManyField(null=True, to='backend.Subject')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Profile')),
            ],
        ),
        migrations.AddField(
            model_name='profile',
            name='subjects',
            field=models.ManyToManyField(null=True, to='backend.Subject'),
        ),
    ]
