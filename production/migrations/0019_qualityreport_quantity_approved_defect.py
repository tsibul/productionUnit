# Generated by Django 4.2.6 on 2023-10-30 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0018_productionreport_closed_productionreport_date_close_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='qualityreport',
            name='quantity_approved_defect',
            field=models.IntegerField(default=0),
        ),
    ]
