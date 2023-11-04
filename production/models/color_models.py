from django.db import models


class ColorScheme(models.Model):
    """ color scheme IV, Grant, Eco """
    scheme_name = models.CharField(max_length=13)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return self.scheme_name

    def __str__(self):
        return str(self.scheme_name)

    class Meta:
        ordering = ['scheme_name']

    @staticmethod
    def order_default():
        return ['scheme_name']


class Color(models.Model):
    """ id - (07)
        name - name
        pantone - pantone color
        code - HEX"""
    color_id = models.CharField(max_length=10)
    pantone = models.CharField(max_length=20, default='')
    color_name = models.CharField(max_length=60)
    color_code = models.CharField(max_length=7)
    color_scheme = models.ForeignKey(ColorScheme, models.SET_NULL, null=True)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return f"{self.color_id} {self.color_name}"

    def __str__(self):
        return f"{self.color_id} {self.color_name}"

    class Meta:
        ordering = ['color_scheme', 'color_id']

    @staticmethod
    def order_default():
        return ['color_scheme', 'color_id']
