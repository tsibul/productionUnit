from django.db import models
from production.models import Producer


class IMM (models.Model):
    plant_code = models.CharField(max_length=2)
    producer = models.ForeignKey(Producer, on_delete=models.SET_NULL, null=True)
    producer_code = models.CharField(max_length=20)
    account_code = models.CharField(max_length=11)
    name = models.CharField(max_length=140)
    imm_model = models.CharField(max_length=140)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return f"{self.producer.name} {self.name} {self.imm_model}"

    def __str__(self):
        return f"{self.producer.name} {self.name} {self.imm_model}"

    @staticmethod
    def order_default():
        return ['plant_id']
