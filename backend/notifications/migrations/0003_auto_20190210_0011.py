# Generated by Django 2.2a1 on 2019-02-10 00:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0002_auto_20190128_1553'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notification',
            options={'ordering': ('-id',), 'verbose_name': 'Notification', 'verbose_name_plural': 'Notifications'},
        ),
    ]
