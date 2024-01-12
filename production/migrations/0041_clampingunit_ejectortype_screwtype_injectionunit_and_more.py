# Generated by Django 4.2.6 on 2024-01-12 11:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0040_detailbasedata_moldinsert_moldmodifier_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClampingUnit',
            fields=[
                ('imm', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='production.imm')),
                ('clamping_force_kN', models.IntegerField(blank=True, null=True)),
                ('locking_force_kN', models.IntegerField(blank=True, null=True)),
                ('max_plate_stroke_mm', models.IntegerField(blank=True, null=True)),
                ('min_mold_height_mm', models.IntegerField(blank=True, null=True)),
                ('max_mold_height_mm', models.IntegerField(blank=True, null=True)),
                ('max_plate_distance_mm', models.IntegerField(blank=True, null=True)),
                ('plate_horizontal_mm', models.IntegerField(blank=True, null=True)),
                ('plate_vertical_mm', models.IntegerField(blank=True, null=True)),
                ('bars_horizontal_mm', models.IntegerField(blank=True, null=True)),
                ('bars_vertical_mm', models.IntegerField(blank=True, null=True)),
                ('opening_positions_quantity', models.IntegerField(blank=True, null=True)),
                ('closing_positions_quantity', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='EjectorType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(blank=True, max_length=140, null=True, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ScrewType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('geometry', models.CharField(blank=True, max_length=140, null=True)),
                ('resistance', models.CharField(blank=True, max_length=140, null=True, unique=True)),
                ('bimetallic', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='InjectionUnit',
            fields=[
                ('imm', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='production.imm')),
                ('screw_diameter_mm', models.IntegerField(blank=True, null=True)),
                ('screw_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='production.screwtype')),
            ],
        ),
        migrations.CreateModel(
            name='Ejector',
            fields=[
                ('imm', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='production.imm')),
                ('ejector_stoke_mm', models.IntegerField(blank=True, null=True)),
                ('ejector_force_kN', models.IntegerField(blank=True, null=True)),
                ('ejector_backward_kN', models.IntegerField(blank=True, null=True)),
                ('forward_positions_quantity', models.IntegerField(blank=True, null=True)),
                ('backward_positions_quantity', models.IntegerField(blank=True, null=True)),
                ('ejector_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='production.ejectortype')),
            ],
        ),
    ]
