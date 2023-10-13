from django.db import models


class Country(models.Model):
    name = models.CharField(max_length=40, default='РФ')
    deleted = models.BooleanField(default=False)