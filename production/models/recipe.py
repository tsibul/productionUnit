from django.db import models
from production.models import MasterBatch, Goods, MaterialType, Color


class Recipe(models.Model):
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE)
    color = models.ForeignKey(Color, on_delete=models.CASCADE)
    main_material_type = models.ForeignKey(MaterialType, on_delete=models.CASCADE)
    add_material_doze = models.DecimalField(max_digits=4, decimal_places=2)
    main_master = models.ForeignKey(MasterBatch, on_delete=models.CASCADE, null=True, related_name='main')
    main_master_doze = models.DecimalField(max_digits=4, decimal_places=2)
    add_master = models.ForeignKey(MasterBatch, on_delete=models.CASCADE, null=True, related_name='additional')
    add_master_doze = models.DecimalField(max_digits=4, decimal_places=2)
    comment = models.CharField(max_length=140, blank=True, null=True, default='')
    deleted = models.BooleanField(default=False)

    def __repr__(self):
        return (f"{self.main_material_type}  дробленка {self.add_material_doze}% краситель1 {self.main_master} "
                f"доза {self.main_master_doze}% краситель 2 {self.add_master} доза {self.add_material_doze}%")

    def __str__(self):
        return (f"{self.main_material_type}  дробленка {self.add_material_doze}% краситель1 {self.main_master} "
                f"доза {self.main_master_doze}% краситель 2 {self.add_master} доза {self.add_material_doze}%")

    class Meta:
        ordering = ['goods__article']

    @staticmethod
    def order_default():
        return ['goods__article']
