# Generated by Django 2.2a1 on 2019-02-14 21:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0004_auto_20190214_2101'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='target_content_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notification_target_content_type', to='contenttypes.ContentType'),
        ),
        migrations.AlterField(
            model_name='notification',
            name='target_object_id',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
