from django.db import models
from production.models import DetailInGoods, ProductionReport


class DetailBaseWeight(models.Model):
    detail_in_goods = models.ForeignKey(DetailInGoods, on_delete=models.CASCADE)
    weight_g = models.DecimalField(default=0, decimal_places=3, max_digits=9)
    date_create = models.DateTimeField(auto_now_add=True)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return self.weight_g

    def __str__(self):
        return str(self.weight_g)

    class Meta:
        ordering = ['detail_in_goods', '-date_create']

    @staticmethod
    def order_default():
        return ['detail_in_goods', '-date_create']


class DetailActualWeight(DetailBaseWeight):
    production = models.ForeignKey(ProductionReport, on_delete=models.CASCADE)
