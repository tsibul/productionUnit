# Generated by Django 4.2.6 on 2023-10-22 22:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0014_qualityreport_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='qualityreport',
            name='defect_event',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='production.defectevent'),
        ),
    ]
