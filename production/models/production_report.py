import datetime

from django.db import models
from django.contrib.auth.models import User

from production.models import ProductionRequest, IMM, DetailInGoods, Color


class ProductionReport(models.Model):
    detail = models.ForeignKey(DetailInGoods, models.SET_NULL, null=True)
    color = models.ForeignKey(Color, models.SET_NULL, null=True)
    date = models.DateTimeField(default=datetime.datetime.now())
    imm = models.ForeignKey(IMM, models.SET_NULL, null=True)
    user = models.ForeignKey(User, models.SET_NULL, null=True)
    quantity = models.IntegerField(default=1000)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return f"{self.detail} {self.color} {self.user.username} {self.date} {self.quantity}"

    def __str__(self):
        return f"{self.detail} {self.color} {self.user.username} {self.date} {self.quantity}"

    @staticmethod
    def order_default():
        return ['date', 'imm']
