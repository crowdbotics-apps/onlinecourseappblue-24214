# Generated by Django 2.2.16 on 2020-10-01 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0019_auto_20201001_0706'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='media',
            field=models.FileField(upload_to=''),
        ),
        migrations.AlterField(
            model_name='recording',
            name='media',
            field=models.FileField(upload_to=''),
        ),
    ]
