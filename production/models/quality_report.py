from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from production.models import ProductionReport, Defects, DefectEvent, ProductionRequest


class QualityReport(models.Model):
    production = models.ForeignKey(ProductionReport, models.SET_NULL, null=True)
    quantity_checked = models.IntegerField(default=0)
    quantity_approved = models.IntegerField(default=0)
    quantity_approved_defect = models.IntegerField(default=0)  # approved with defect
    date_check = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, models.SET_NULL, null=True)
    defect_event = models.ForeignKey(DefectEvent, models.SET_NULL, null=True)
    comment = models.CharField(max_length=255, default='')
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return (f"{self.date_check.strftime('%d.%m.%y %H:%M')} {self.production.detail}|{self.production.color} "
                f"проверено {self.quantity_checked} принято {self.quantity_approved}")

    def __str__(self):
        return (f"{self.date_check.strftime('%d.%m.%y %H:%M')} {self.production.detail}|{self.production.color} "
                f"проверено {self.quantity_checked} принято {self.quantity_approved}")

    @staticmethod
    def order_default():
        return ['-date_check', '-production__date']


class QualityReportDefects(models.Model):
    quality_report = models.ForeignKey(QualityReport, on_delete=models.CASCADE)
    defect = models.ForeignKey(Defects, models.SET_NULL, null=True)
    date_create = models.DateTimeField(default=None, null=True)
    user = models.ForeignKey(User, models.SET_NULL, null=True)
    deleted = models.BooleanField(default=False)

    @staticmethod
    def order_default():
        return ['-quality_report__date_check']


class QualityForRequest(models.Model):
    quality_report = models.ForeignKey(QualityReport, on_delete=models.CASCADE)
    production_request = models.ForeignKey(ProductionRequest, models.SET_NULL, null=True)
    quantity_checked = models.IntegerField(default=0)
    quantity_approved = models.IntegerField(default=0)
    deleted = models.BooleanField(default=False)

    @staticmethod
    def order_default():
        return ['-quality_report__date_check']
