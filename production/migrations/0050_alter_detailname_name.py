# Generated by Django 4.2.6 on 2024-01-14 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0049_alter_defectevent_name_alter_defects_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detailname',
            name='name',
            field=models.CharField(max_length=40, unique=True),
        ),
    ]
