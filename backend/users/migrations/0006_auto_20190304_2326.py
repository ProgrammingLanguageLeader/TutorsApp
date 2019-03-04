# Generated by Django 2.1.7 on 2019-03-04 23:26

from django.db import migrations, models
import utils.validators


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20190302_1911'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='city',
            field=models.TextField(blank=True, max_length=50, validators=[utils.validators.AlphabetSymbolsAndSpacesValidator()], verbose_name='city'),
        ),
    ]
