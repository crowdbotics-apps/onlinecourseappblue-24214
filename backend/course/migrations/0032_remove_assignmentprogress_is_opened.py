# Generated by Django 2.2.16 on 2020-10-19 07:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0031_auto_20201019_0703'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assignmentprogress',
            name='is_opened',
        ),
    ]
