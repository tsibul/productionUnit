# Generated by Django 4.2.6 on 2024-01-07 06:49

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0028_remove_recipe_add_material_doze_recipe_closed_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='date_create',
            field=models.DateField(blank=True, default=django.utils.timezone.now, null=True),
        ),
    ]
