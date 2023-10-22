from datetime import datetime

from django.db.models import Sum

from production.models import ProductionReport, QualityReport


class QualityCheck:
    production_id: int
    production_date: str
    produce_user: str
    imm: str
    imm_code: str
    detail: str
    color: str
    quantity: int
    quantity_checked: int
    quantity_approved: int
    defect: int
    defect_percent: float

    def __init__(self, production_id):
        self.production_id = production_id
        production = ProductionReport.objects.get(id=production_id)
        self.production_date = datetime.strftime(production.date, '%d.%m.%y %H:%M')
        self.produce_user = production.user
        self.detail = production.detail
        self.color = production.color
        self.imm = production.imm
        self.imm_code = production.imm.plant_code
        self.quantity = production.quantity
        quality_reports = QualityReport.objects.filter(production=production)
        quality_quantities = quality_reports.aggregate(
            total_checked=Sum('quantity_checked'),
            total_approved=Sum('quantity_approved')
        )
        self.quantity_checked = quality_quantities['total_checked']
        self.quantity_approved = quality_quantities['total_approved']
        self.defect = self.quantity_checked - self.quantity_approved
        self.defect_percent = round(self.defect / self.quantity * 100, 2)
