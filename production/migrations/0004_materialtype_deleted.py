# Generated by Django 4.2.6 on 2023-10-13 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0003_recipe'),
    ]

    operations = [
        migrations.AddField(
            model_name='materialtype',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
    ]
