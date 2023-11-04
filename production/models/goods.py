from django.db import models
from production.models import ColorScheme


class Goods(models.Model):
    """details of item detail# if exist
        name - name of goods
        item_name - item code
        detail_name - name of detail
        detail_place - if prinring possible"""

    name = models.CharField(max_length=200, null=True, blank=True)
    article = models.CharField(max_length=20, null=True, blank=True)
    color_scheme = models.ForeignKey(ColorScheme, models.SET_NULL, null=True)
    details_quantity = models.SmallIntegerField(default=1)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return f"{self.article} {self.name}"

    def __str__(self):
        return f"{self.article} {self.name}"

    class Meta:
        ordering = ['article']

    @staticmethod
    def order_default():
        return ['article']
