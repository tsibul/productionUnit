# Generated by Django 4.2.6 on 2024-01-14 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0050_alter_detailname_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goods',
            name='article',
            field=models.CharField(blank=True, max_length=20, null=True, unique=True),
        ),
    ]