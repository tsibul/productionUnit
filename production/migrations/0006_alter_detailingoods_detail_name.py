# Generated by Django 4.2.6 on 2023-10-14 22:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0005_recipe_comment_recipe_deleted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detailingoods',
            name='detail_name',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='production.detailname'),
        ),
    ]