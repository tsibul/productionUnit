from django.db import models


class Defects(models.Model):
    name = models.CharField(max_length=120)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name

    @staticmethod
    def order_default():
        return ['name']


class DefectEvent(models.Model):
    name = models.CharField(max_length=120)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name

    @staticmethod
    def order_default():
        return ['name']


