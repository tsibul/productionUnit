# Generated by Django 4.2.6 on 2024-01-12 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0042_immtype_injectionunit_heat_insulation_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ejectortype',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='immtype',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='screwtype',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
    ]
