# Generated by Django 2.2.12 on 2020-05-17 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("course", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Group",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=256)),
            ],
        ),
    ]
