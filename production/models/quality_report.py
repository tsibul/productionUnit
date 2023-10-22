from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from production.models import ProductionReport, Defects, DefectEvent


class QualityReport(models.Model):
    production = models.ForeignKey(ProductionReport, models.SET_NULL, null=True)
    quantity_checked = models.IntegerField(default=0)
    quantity_approved = models.IntegerField(default=0)
    date_check = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, models.SET_NULL, null=True)
    defect_event = models.ForeignKey(DefectEvent, models.SET_NULL, null=True)
    comment = models.CharField(max_length=255, default='')
    deleted = models.BooleanField(default=False)

    @staticmethod
    def order_default():
        return ['-date', 'production']


class QualityReportDefects(models.Model):
    quality_report = models.ForeignKey(QualityReport, on_delete=models.CASCADE)
    defect = models.ForeignKey(Defects, models.SET_NULL, null=True)
    deleted = models.BooleanField(default=False)

    @staticmethod
    def order_default():
        return ['-quality_report__date_check']
