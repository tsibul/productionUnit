from django.db import models
from production.models import Producer


class MaterialType(models.Model):
    name = models.CharField(max_length=40)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

    @staticmethod
    def order_default():
        return ['name']


class Material(models.Model):

    class Meta:
        abstract = True

    material_type = models.ForeignKey(MaterialType, models.SET_NULL, null=True)
    deleted = models.BooleanField(default=False)
    color = models.CharField(max_length=100, null=True, blank=True)


class MainMaterial(Material):
    brand = models.CharField(max_length=100, null=True, blank=True)
    producer = models.ForeignKey(Producer, models.SET_NULL, null=True)
    code = models.CharField(max_length=140)

    def __repr__(self):
        return f"{self.material_type.name} {self.producer.name} {self.brand} {self.code}"

    def __str__(self):
        return f"{self.material_type.name} {self.producer.name} {self.brand} {self.code}"

    class Meta:
        ordering = ['brand']

    @staticmethod
    def order_default():
        return ['brand']


class AddMaterial(Material):

    def __repr__(self):
        return f"дробленка {self.material_type.name} {self.color}"

    def __str__(self):
        return f"дробленка {self.material_type.name} {self.color}"

    class Meta:
        ordering = ['material_type__name']

    @staticmethod
    def order_default():
        return ['material_type__name']


class MasterBatch(Material):
    brand = models.CharField(max_length=100, null=True, blank=True)
    producer = models.ForeignKey(Producer, models.SET_NULL, null=True)
    code = models.CharField(max_length=140)
    doze = models.DecimalField(max_digits=4, decimal_places=2)

    def __repr__(self):
        return f"суперконцентрат {self.color} {self.producer.name} {self.brand} {self.code}"

    def __str__(self):
        return f"суперконцентрат {self.color} {self.producer.name} {self.brand} {self.code}"

    class Meta:
        ordering = ['brand']

    @staticmethod
    def order_default():
        return ['brand']
