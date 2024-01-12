# Generated by Django 4.2.6 on 2024-01-09 01:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0037_alter_detailbaseweight_weight_g'),
    ]

    operations = [
        migrations.CreateModel(
            name='Equipment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account_code', models.CharField(default='01', max_length=14)),
                ('producer_code', models.CharField(blank=True, default=None, max_length=20, null=True)),
                ('deleted', models.BooleanField(default=False)),
                ('producer', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='production.producer')),
            ],
        ),
        migrations.CreateModel(
            name='MoldBase',
            fields=[
                ('equipment_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='production.equipment')),
                ('plant_no', models.CharField(max_length=80)),
                ('mold_base', models.CharField(max_length=140)),
                ('height_mm', models.IntegerField()),
                ('width_mm', models.IntegerField()),
                ('if_hot_runner', models.BooleanField(default=False)),
                ('hot_runner_no', models.IntegerField(default=0)),
                ('flange_moving_plate_mm', models.IntegerField()),
                ('flange_fix_plate_mm', models.IntegerField()),
                ('single_modifier', models.BooleanField(default=True)),
            ],
            bases=('production.equipment',),
        ),
        migrations.CreateModel(
            name='AccountInfoEquipment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year_production', models.IntegerField(blank=True, null=True)),
                ('date_received', models.DateField(blank=True, null=True)),
                ('date_start', models.DateField(blank=True, null=True)),
                ('start_cost', models.IntegerField(blank=True, null=True)),
                ('amortization', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('equipment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='production.equipment')),
            ],
        ),
    ]
