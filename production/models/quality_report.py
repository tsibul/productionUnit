from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from production.models import ProductionReport


class QualityReport(models.Model):
    production = models.ForeignKey(ProductionReport, models.SET_NULL, null=True)
    quantity_checked = models.IntegerField(default=0)
    quantity_approved = models.IntegerField(default=0)
    date_check = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, models.SET_NULL, null=True)
    deleted = models.BooleanField(default=False)

    @staticmethod
    def order_default():
        return ['-date', 'production']

