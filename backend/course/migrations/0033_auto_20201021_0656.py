# Generated by Django 2.2.16 on 2020-10-21 06:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0032_remove_assignmentprogress_is_opened'),
    ]

    operations = [
        migrations.CreateModel(
            name='Clothing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Electronic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='HomeFurnishing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='PersonalCare',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
            ],
        ),
        migrations.AlterModelOptions(
            name='creditcardassignment',
            options={'verbose_name_plural': 'Credit Cards'},
        ),
        migrations.AlterModelOptions(
            name='housingassignment',
            options={'verbose_name_plural': 'Housings'},
        ),
        migrations.CreateModel(
            name='PersonalCareItems',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('price', models.CharField(max_length=100)),
                ('type', models.PositiveSmallIntegerField(choices=[(0, 'MEN'), (1, 'WOMEN'), (2, 'SOAP_OR_SHAMPOO'), (3, 'MAKE_UP_OR_SKIN_CARE')], default=0)),
                ('personal_care', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='personalcare_items', to='course.PersonalCare')),
            ],
            options={
                'verbose_name_plural': 'Personal Care Items',
            },
        ),
        migrations.CreateModel(
            name='HomeFurnishingItems',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('price', models.CharField(max_length=100)),
                ('type', models.PositiveSmallIntegerField(choices=[(0, 'TV'), (1, 'COMPUTER'), (2, 'FURNITURE'), (3, 'CLEANING')], default=0)),
                ('home_furnishing', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='homefurnishing_items', to='course.HomeFurnishing')),
            ],
            options={
                'verbose_name_plural': 'Home Furnishing Items',
            },
        ),
        migrations.CreateModel(
            name='ElectronicItems',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('price', models.CharField(max_length=100)),
                ('electronic', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='electronic_items', to='course.Electronic')),
            ],
            options={
                'verbose_name_plural': 'Electronic Items',
            },
        ),
        migrations.CreateModel(
            name='ClothingItems',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=3, max_digits=10)),
                ('clothing', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='clothing_items', to='course.Clothing')),
            ],
            options={
                'verbose_name_plural': 'Clothing Items',
            },
        ),
    ]
