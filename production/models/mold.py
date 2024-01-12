from django.db import models

from production.models import Equipment


class Mold(Equipment):
    class Meta:
        abstract = True
        ordering = ['account_code', 'name']

    mount_time_min = models.IntegerField(default=0)
    release_time_min = models.IntegerField(default=0)
    if_modular = models.BooleanField(default=False)
    plant_no = models.CharField(max_length=80)

    def __repr__(self):
        return self.account_code + " " + self.plant_no + " " + self.name

    def __str__(self):
        return self.account_code + " " + self.plant_no + " " + self.name

    @staticmethod
    def order_default():
        return ['account_code', 'name']


class MoldBase(Equipment):
    length_mm = models.IntegerField()
    width_mm = models.IntegerField()
    if_hot_runner = models.BooleanField(default=False)
    hot_runner_quantity = models.IntegerField(default=0)
    flange_moving_plate_mm = models.IntegerField()
    flange_fix_plate_mm = models.IntegerField()
    changeable_modifier = models.BooleanField(default=True)


class MoldModifier(Mold):
    height_mm = models.IntegerField()
    weight_kg = models.IntegerField()
    if_air = models.BooleanField(default=False)
    air_valves_quantity_moving_plate = models.IntegerField(default=0)
    air_valves_quantity_fixed_plate = models.IntegerField(default=0)
    single_modifier = models.BooleanField(default=True)
    changeable_insert = models.BooleanField(default=True)


class MoldInsert(Mold):
    cavities_quantity = models.IntegerField()
    air_valves_quantity_moving_plate = models.IntegerField(default=0)
    air_valves_quantity_fixed_plate = models.IntegerField(default=0)
    if_hydraulic = models.BooleanField(default=False)
    hydraulic_quantity_moving_plate = models.IntegerField(default=0)
    hydraulic_quantity_fixed_plate = models.IntegerField(default=0)
    single_insert = models.BooleanField(default=True)
