# Generated by Django 2.2.16 on 2020-10-16 13:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0025_auto_20201015_1023'),
    ]

    operations = [
        migrations.CreateModel(
            name='CreditCardAssignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
                ('min_due', models.PositiveIntegerField(default=0)),
                ('current_balance', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='LifeHappensAssignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('loss', models.DecimalField(decimal_places=3, max_digits=10)),
                ('description', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name_plural': 'Life Happens',
            },
        ),
        migrations.CreateModel(
            name='RestaurantAssignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name_plural': 'Restaurants',
            },
        ),
        migrations.AlterField(
            model_name='assignment',
            name='content_type',
            field=models.ForeignKey(blank=True, limit_choices_to={'model__in': ('housingassignment', 'transportation', 'childcare', 'groceryassignment', 'lifehappensassignment')}, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='content_type_timelines', to='contenttypes.ContentType'),
        ),
        migrations.RemoveField(
            model_name='assignment',
            name='lesson',
        ),
        migrations.AddField(
            model_name='assignment',
            name='lesson',
            field=models.ManyToManyField(blank=True, null=True, related_name='lesson_assignment', to='course.Lesson'),
        ),
        migrations.AlterField(
            model_name='ledger',
            name='initial_balance',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=10),
        ),
        migrations.CreateModel(
            name='RestaurantsItems',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=3, max_digits=10)),
                ('type', models.PositiveSmallIntegerField(choices=[(0, 'FAST_FOOD'), (1, 'SIT_DOWN')], default=0)),
                ('restaurant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='restaurant_items', to='course.RestaurantAssignment')),
            ],
            options={
                'verbose_name_plural': 'Restaurant Items',
            },
        ),
    ]