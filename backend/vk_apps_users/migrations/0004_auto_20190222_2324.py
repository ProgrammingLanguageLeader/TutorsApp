# Generated by Django 2.1.7 on 2019-02-22 23:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vk_apps_users', '0003_auto_20190210_0054'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vkappsuser',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='user'),
        ),
    ]
