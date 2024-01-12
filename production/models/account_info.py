from django.db import models

from production.models import Equipment


class AccountInfoEquipment(models.Model):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    year_production = models.IntegerField(null=True, blank=True)
    date_received = models.DateField(null=True, blank=True)
    date_start = models.DateField(null=True, blank=True)
    start_cost = models.IntegerField(null=True, blank=True)
    amortization = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
