from django.db import models
from production.models import ColorScheme


class RecipeColorScheme(models.Model):
    name = models.CharField(max_length=140)
    color_scheme = models.ForeignKey(ColorScheme, on_delete=models.SET_NULL, null=True)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['color_scheme', 'name']

    @staticmethod
    def order_default():
        return ['color_scheme', 'name']

