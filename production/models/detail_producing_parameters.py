from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from production.models import DetailBaseData, Color, IMM


class DetailProducingParameters(models.Model):
    imm = models.ForeignKey(IMM, models.SET_NULL, null=True, blank=True)
    color = models.ForeignKey(Color, models.SET_NULL, null=True, blank=True)
    detail_base_data = models.ForeignKey(DetailBaseData, models.SET_NULL, null=True, blank=True)
    deleted = models.BooleanField(default=False)

    class Meta:
        ordering = ['imm', 'detail_base_data__detail_in_goods']

    @staticmethod
    def order_default():
        return ['imm', 'detail_base_data__detail_in_goods']


class MoldTemperature(models.Model):
    detail_producing_parameters = models.OneToOneField(DetailProducingParameters, on_delete=models.CASCADE, null=True)
    imm_page = models.IntegerField(null=True, blank=True)
    core_temperature = models.DecimalField(max_digits=5, decimal_places=1, null=True, blank=True)
    cavity_temperature = models.DecimalField(max_digits=5, decimal_places=1, null=True, blank=True)


class ImmZonesTemperature(models.Model):
    mold_temperature = models.ForeignKey(MoldTemperature, on_delete=models.CASCADE)
    zone_no = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(6)])
    zone_temperature = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)

    class Meta:
        ordering = ['zone_no']

    @staticmethod
    def order_default():
        return ['zone_no']


class HotRunnerZonesTemperature(models.Model):
    mold_temperature = models.ForeignKey(MoldTemperature, on_delete=models.CASCADE)
    zone_no = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(32)])
    zone_temperature = models.DecimalField(max_digits=6, decimal_places=2)

    class Meta:
        ordering = ['zone_no']

    @staticmethod
    def order_default():
        return ['zone_no']


class MaterialLoading(models.Model):
    detail_producing_parameters = models.OneToOneField(DetailProducingParameters, on_delete=models.CASCADE, null=True)
    imm_page = models.IntegerField(null=True, blank=True)
    position_mm = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    pressure_bar = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)
    speed_mm_sec = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)
    back_pressure_bar = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)
    decompression_mm = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)


class MaterialInjection(models.Model):
    detail_producing_parameters = models.OneToOneField(DetailProducingParameters, on_delete=models.CASCADE, null=True)
    imm_page = models.IntegerField(null=True, blank=True)
    pressure_bar = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)
    injection_time_sec = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)
    position_before_switch_mm = models.DecimalField(max_digits=4, decimal_places=1, default=0.0, null=True, blank=True)


class MaterialInjectionPosition(models.Model):
    material_injection = models.ForeignKey(MaterialInjection, on_delete=models.CASCADE, null=True, blank=True)
    position_no = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(6)])
    position_mm = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    injection_speed_mm_sec = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)

    class Meta:
        ordering = ['position_no']

    @staticmethod
    def order_default():
        return ['position_no']


class MoldHolding(models.Model):
    detail_producing_parameters = models.OneToOneField(DetailProducingParameters, on_delete=models.CASCADE, null=True)
    imm_page = models.IntegerField(null=True, blank=True)
    position_mm = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    speed_percent = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    holding_time_sec = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    start_pressure_bar = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    end_pressure_bar = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)


class ClampingUnitParameters(models.Model):
    detail_producing_parameters = models.OneToOneField(DetailProducingParameters, on_delete=models.CASCADE, null=True)
    imm_page = models.IntegerField(null=True, blank=True)
    clamping_force_kN = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)


class ClampingUnitMoving(models.Model):
    clamping_unit_parameters = models.ForeignKey(ClampingUnitParameters, on_delete=models.CASCADE, null=True,
                                                 blank=True)
    position_no = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(5)])
    position_mm = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    opening = models.BooleanField(default=False)

    class Meta:
        ordering = ['opening', 'position_no']

    @staticmethod
    def order_default():
        return ['opening', 'position_no']


class MoldProtectionParameters(models.Model):
    detail_producing_parameters = models.OneToOneField(DetailProducingParameters, on_delete=models.CASCADE, null=True)
    imm_page = models.IntegerField(null=True, blank=True)
    mold_protection_start_mm = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)
    mold_protection_end_mm = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)
    mold_protection_force_kN = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)
    mold_protection_time_sec = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)


class HydraulicCoresParameters(models.Model):
    detail_producing_parameters = models.OneToOneField(DetailProducingParameters, on_delete=models.CASCADE, null=True)
    imm_page = models.IntegerField(null=True, blank=True)


class HydraulicCoresMoving(models.Model):
    hydraulic_core_parameters = models.ForeignKey(HydraulicCoresParameters, on_delete=models.CASCADE, null=True,
                                                  blank=True)
    forward = models.BooleanField(default=True)
    core_no = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(5)])
    pressure_bar = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)
    position_mm = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    speed_mm_sec = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)
    time_sec = models.DecimalField(max_digits=6, decimal_places=1, default=0.0, null=True, blank=True)

    class Meta:
        ordering = ['core_no', 'forward']

    @staticmethod
    def order_default():
        return ['core_no', 'forward']


class EjectorParameters(models.Model):
    detail_producing_parameters = models.OneToOneField(DetailProducingParameters, on_delete=models.CASCADE, null=True)
    imm_page = models.IntegerField(null=True, blank=True)
    pressure_bar = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    speed_mm_sec = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    timeout_forward_sec = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    timeout_backward_sec = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    stroke_quantity = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(3)], null=True)
    position_forward_mm = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    position_backward_mm = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)


class CoolingParameters(models.Model):
    detail_producing_parameters = models.OneToOneField(DetailProducingParameters, on_delete=models.CASCADE, null=True)
    imm_page = models.IntegerField(null=True, blank=True)
    timeout_loading_sec = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    cooling_time_sec = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
    imm_time_sec = models.DecimalField(max_digits=5, decimal_places=1, default=0.0, null=True, blank=True)
