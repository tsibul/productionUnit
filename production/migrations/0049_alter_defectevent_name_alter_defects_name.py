# Generated by Django 4.2.6 on 2024-01-14 06:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0048_alter_colorscheme_scheme_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='defectevent',
            name='name',
            field=models.CharField(max_length=120, unique=True),
        ),
        migrations.AlterField(
            model_name='defects',
            name='name',
            field=models.CharField(max_length=120, unique=True),
        ),
    ]