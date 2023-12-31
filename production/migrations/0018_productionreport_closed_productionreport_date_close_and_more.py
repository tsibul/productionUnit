# Generated by Django 4.2.6 on 2023-10-29 06:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('production', '0017_rename_qualityforrequests_qualityforrequest'),
    ]

    operations = [
        migrations.AddField(
            model_name='productionreport',
            name='closed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='productionreport',
            name='date_close',
            field=models.DateTimeField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='productionreport',
            name='user_close',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user_checked', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='productionreport',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user_produced', to=settings.AUTH_USER_MODEL),
        ),
    ]
