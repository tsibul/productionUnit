# Generated by Django 4.2.6 on 2024-01-14 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0054_remove_moldinsert_air_valves_quantity_fixed_plate_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='clampingunit',
            name='flange_fixed_mm',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='clampingunit',
            name='flange_moving_mm',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
