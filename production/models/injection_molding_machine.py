from django.db import models
from production.models import Producer


class IMM (models.Model):
    plant_code = models.CharField(max_length=2)
    producer = models.ForeignKey(Producer, on_delete=models.SET_NULL, null=True)
    producer_code = models.CharField(max_length=20)
    account_code = models.CharField(max_length=11)
    name = models.CharField(max_length=140)
    imm_model = models.CharField(max_length=140)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return f"{self.producer.name} {self.name} {self.imm_model}"

    def __str__(self):
        return f"{self.producer.name} {self.name} {self.imm_model}"

    class Meta:
        ordering = ['plant_code']

    @staticmethod
    def order_default():
        return ['plant_code']


class EjectorType(models.Model):
    type = models.CharField(max_length=140, blank=True, null=True, unique=True)

    def __repr__(self):
        return f"{self.type}"

    def __str__(self):
        return f"{self.type}"


class ScrewType(models.Model):
    geometry = models.CharField(max_length=140, blank=True, null=True)
    resistance = models.CharField(max_length=140, blank=True, null=True, unique=True)
    bimetallic = models.BooleanField(default=False)

    def __repr__(self):
        bimetallic = ''
        resistance = ''
        if self.bimetallic:
            bimetallic = "биметаллический"
        if self.resistance:
            resistance = self.resistance
        return f"геометрия: {self.geometry} {resistance} {bimetallic}"

    def __str__(self):
        bimetallic = ''
        resistance = ''
        if self.bimetallic:
            bimetallic = "биметаллический"
        if self.resistance:
            resistance = self.resistance
        return f"геометрия: {self.geometry} {resistance} {bimetallic}"


class ClampingUnit(models.Model):
    imm = models.OneToOneField(IMM, on_delete=models.CASCADE, primary_key=True)
    clamping_force_kN = models.IntegerField(null=True, blank=True)
    locking_force_kN = models.IntegerField(null=True, blank=True)
    max_plate_stroke_mm = models.IntegerField(null=True, blank=True)
    min_mold_height_mm = models.IntegerField(null=True, blank=True)
    max_mold_height_mm = models.IntegerField(null=True, blank=True)
    max_plate_distance_mm = models.IntegerField(null=True, blank=True)
    plate_horizontal_mm = models.IntegerField(null=True, blank=True)
    plate_vertical_mm = models.IntegerField(null=True, blank=True)
    bars_horizontal_mm = models.IntegerField(null=True, blank=True)
    bars_vertical_mm = models.IntegerField(null=True, blank=True)
    opening_positions_quantity = models.IntegerField(null=True, blank=True)
    closing_positions_quantity = models.IntegerField(null=True, blank=True)


class Ejector(models.Model):
    imm = models.OneToOneField(IMM, on_delete=models.CASCADE, primary_key=True)
    ejector_type = models.ForeignKey(EjectorType, models.SET_NULL, null=True, blank=True)
    ejector_stoke_mm = models.IntegerField(null=True, blank=True)
    ejector_force_kN = models.IntegerField(null=True, blank=True)
    ejector_backward_kN = models.IntegerField(null=True, blank=True)
    forward_positions_quantity = models.IntegerField(null=True, blank=True)
    backward_positions_quantity = models.IntegerField(null=True, blank=True)


class InjectionUnit(models.Model):
    imm = models.OneToOneField(IMM, on_delete=models.CASCADE, primary_key=True)
    screw_type = models.ForeignKey(ScrewType, models.SET_NULL, null=True, blank=True)
    screw_diameter_mm = models.IntegerField(null=True, blank=True)





