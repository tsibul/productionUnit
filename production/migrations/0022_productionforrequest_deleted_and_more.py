# Generated by Django 4.2.6 on 2023-11-05 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0021_alter_addmaterial_options_alter_color_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='productionforrequest',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='productionrequeststartstop',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
    ]
