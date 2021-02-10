# Generated by Django 2.2.16 on 2020-10-15 10:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contenttypes', '0002_remove_content_type_name'),
        ('course', '0023_assignment'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChildCare',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='GroceryAssignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name_plural': 'Groceries',
            },
        ),
        migrations.CreateModel(
            name='HousingAssignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name_plural': 'Housing',
            },
        ),
        migrations.CreateModel(
            name='Transportation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
            ],
        ),
        migrations.RenameField(
            model_name='assignment',
            old_name='is_completed',
            new_name='inline',
        ),
        migrations.AddField(
            model_name='assignment',
            name='content_type',
            field=models.ForeignKey(blank=True, limit_choices_to={'model__in': ('housingassignment', 'transportation', 'childcare', 'groceryassignment')}, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='content_type_timelines', to='contenttypes.ContentType'),
        ),
        migrations.AddField(
            model_name='assignment',
            name='max_range',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='assignment',
            name='min_range',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='assignment',
            name='object_id',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='assignment',
            name='lesson',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lesson_assignment', to='course.Lesson'),
        ),
        migrations.CreateModel(
            name='TransportItems',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('total', models.CharField(max_length=100)),
                ('type', models.PositiveSmallIntegerField(choices=[(0, 'NEW'), (1, 'USED')], default=0)),
                ('transportation', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='transport_items', to='course.Transportation')),
            ],
            options={
                'verbose_name_plural': 'Transportation Items',
            },
        ),
        migrations.CreateModel(
            name='Ledger',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('initial_balance', models.DecimalField(decimal_places=3, max_digits=10)),
                ('saving', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('housing', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('transportation', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('child_care', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('groceries', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('life_happens', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('dining_out', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('credit_card', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('electronics', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('clothing', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('personal_care', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('home_furnishings', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('entertainment', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='course_ledger', to='course.Course')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='HousingItems',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=3, max_digits=10)),
                ('house', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='house_items', to='course.HousingAssignment')),
            ],
            options={
                'verbose_name_plural': 'Housing items',
            },
        ),
        migrations.CreateModel(
            name='GroceryItems',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=3, max_digits=10)),
                ('grocery', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='grocery_items', to='course.GroceryAssignment')),
            ],
            options={
                'verbose_name_plural': 'Grocery Items',
            },
        ),
        migrations.CreateModel(
            name='ChildCareItems',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('price', models.CharField(max_length=100)),
                ('type', models.PositiveSmallIntegerField(choices=[(0, 'REQUIRED_COST'), (1, 'ADD_ONS')], default=0)),
                ('child_care', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='childcare_items', to='course.ChildCare')),
            ],
            options={
                'verbose_name_plural': 'Child Care Items',
            },
        ),
    ]
