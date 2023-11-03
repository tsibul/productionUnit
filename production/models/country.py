from django.db import models


class Country(models.Model):
    name = models.CharField(max_length=40, default='РФ')
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

    @staticmethod
    def order_default():
        return ['name']
