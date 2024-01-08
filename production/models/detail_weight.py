from django.db import models
from production.models import DetailInGoods, ProductionReport


class DetailBaseWeight(models.Model):
    detail = models.ForeignKey(DetailInGoods, on_delete=models.CASCADE)
    weightG = models.DecimalField(default=0, decimal_places=1, max_digits=6)
    date_create = models.DateTimeField(auto_now_add=True)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return self.weightG

    def __str__(self):
        return str(self.weightG)

    class Meta:
        ordering = ['detail', '-date_create']

    @staticmethod
    def order_default():
        return ['detail', '-date_create']


class DetailActualWeight(DetailBaseWeight):
    production = models.ForeignKey(ProductionReport, on_delete=models.CASCADE)
