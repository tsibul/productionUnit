from django.db import models

from production.models import Producer


class Equipment(models.Model):

    account_code = models.CharField(max_length=14, default="01")
    producer = models.ForeignKey(Producer, models.SET_NULL, null=True, default=None)
    producer_code = models.CharField(max_length=20, null=True, blank=True, default=None)
    name = models.CharField(max_length=140)
    producer_model = models.CharField(max_length=80, null=True, blank=True, default=None)
    deleted = models.BooleanField(default=False)

