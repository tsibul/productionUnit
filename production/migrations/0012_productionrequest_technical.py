# Generated by Django 4.2.6 on 2023-10-21 23:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0011_productionreport_defect'),
    ]

    operations = [
        migrations.AddField(
            model_name='productionrequest',
            name='technical',
            field=models.BooleanField(default=False),
        ),
    ]
