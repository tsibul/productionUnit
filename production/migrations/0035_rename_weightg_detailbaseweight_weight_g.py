# Generated by Django 4.2.6 on 2024-01-08 11:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0034_alter_detailbaseweight_options_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='detailbaseweight',
            old_name='weightG',
            new_name='weight_g',
        ),
    ]