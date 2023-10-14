from django.db import models
from production.models import Goods


class DetailName(models.Model):
    name = models.CharField(max_length=40)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name


class DetailInGoods(models.Model):
    goods = models.ForeignKey(Goods, models.SET_NULL, null=True)
    detail_name = models.ForeignKey(DetailName, models.SET_NULL, null=True)
    position = models.SmallIntegerField(default=1)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return f"{self.goods.article}.{self.position} {self.detail_name.name}"

    def __str__(self):
        return f"{self.goods.article}.{self.position} {self.detail_name.name}"

    @staticmethod
    def order_default():
        return ['goods__article', 'position']
