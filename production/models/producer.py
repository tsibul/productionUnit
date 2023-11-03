from django.db import models
from production.models import Country


class Producer(models.Model):
    name = models.CharField(max_length=140)
    stock_address = models.CharField(max_length=250, blank=True, null=True)
    phone = models.CharField(max_length=40, blank=True, null=True)
    mail = models.CharField(max_length=140, blank=True, null=True)
    contact = models.CharField(max_length=250, blank=True, null=True)
    country = models.ForeignKey(Country, models.SET_NULL, null=True)
    comment = models.CharField(max_length=250, blank=True, null=True)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return f"{self.name} {self.country.name}"

    def __str__(self):
        return f"{self.name} {self.country.name}"

    class Meta:
        ordering = ['name']

    @staticmethod
    def order_default():
        return ['name']
