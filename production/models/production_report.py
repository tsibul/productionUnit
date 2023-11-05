from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from production.models import ProductionRequest, IMM, DetailInGoods, Color


class ProductionReport(models.Model):
    detail = models.ForeignKey(DetailInGoods, models.SET_NULL, null=True)
    color = models.ForeignKey(Color, models.SET_NULL, null=True)
    date = models.DateTimeField(default=timezone.now)
    imm = models.ForeignKey(IMM, models.SET_NULL, null=True)
    user = models.ForeignKey(User, models.SET_NULL, null=True, related_name='user_produced')
    quantity = models.IntegerField(default=1000)
    defect = models.IntegerField(default=0)
    closed = models.BooleanField(default=False)
    date_close = models.DateTimeField(default=None, null=True)
    user_close = models.ForeignKey(User, models.SET_NULL, null=True, related_name='user_checked')
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return f"{self.detail} {self.color} {self.user.username} {self.date} {self.quantity}"

    def __str__(self):
        return f"{self.detail} {self.color} {self.user.username} {self.date} {self.quantity}"

    @staticmethod
    def order_default():
        return ['-date', 'imm']


class ProductionForRequest(models.Model):
    production = models.ForeignKey(ProductionReport, on_delete=models.CASCADE)
    production_request = models.ForeignKey(ProductionRequest, models.SET_NULL, null=True)
    quantity = models.IntegerField()
    deleted = models.BooleanField(default=False)

    @staticmethod
    def order_default():
        return ['date']
