# Generated by Django 2.2.16 on 2020-10-18 14:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('course', '0029_auto_20201016_1631'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='initial_balance',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=10),
        ),
        migrations.CreateModel(
            name='AssignmentProgress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_opened', models.BooleanField(default=False)),
                ('assignment', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='assignment_progress', to='course.Lesson')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Assignment Progress',
            },
        ),
    ]
