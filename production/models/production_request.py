from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from production.models import DetailInGoods, Color, IMM


class ProductionRequest(models.Model):
    detail = models.ForeignKey(DetailInGoods, models.CASCADE)
    color = models.ForeignKey(Color, models.CASCADE,
                              limit_choices_to={'color__color_scheme': models.F('detail__goods__color_scheme')})
    quantity = models.IntegerField(default=1000)
    quantity_left = models.IntegerField(blank=True, null=True)
    date_create = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    if_order = models.BooleanField(default=True)
    closed = models.BooleanField(default=False)
    date_close = models.DateTimeField(null=True, blank=True)
    technical = models.BooleanField(default=False)
    comment = models.CharField(max_length=255, default='', blank=True, null=True)
    deleted = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.quantity_left is None:
            self.quantity_left = self.quantity
        if self.date_create is None:
            self.date_create = timezone.now()
        super().save(*args, **kwargs)

    def __repr__(self):
        return f"{self.detail} {self.color} кол-во {self.quantity} {self.user.last_name}"

    def __str__(self):
        return f"{self.detail} {self.color} кол-во {self.quantity} {self.user.last_name}"

    @staticmethod
    def order_default():
        return ['-date_create', 'detail__goods__name']


class ProductionRequestStartStop(models.Model):
    production_request = models.ForeignKey(ProductionRequest, models.CASCADE)
    date_start = models.DateTimeField(default=timezone.now)
    user_start = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='user_start', null=True)
    imm = models.ForeignKey(IMM, on_delete=models.SET_NULL, null=True)
    date_stop = models.DateTimeField(null=True, blank=True)
    user_stop = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='user_stop', null=True)
    stop_reason = models.CharField(max_length=140, null=True, blank=True)
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return f"{self.production_request} начато {self.date_start.strftime('%d.%m.%y %H:%M')} "

    def __str__(self):
        return f"{self.production_request} начато {self.date_start.strftime('%d.%m.%y %H:%M')} "

    @staticmethod
    def order_default():
        return ['-date_start', '-production_request__date_create']
