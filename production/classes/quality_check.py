from datetime import datetime

from django.db.models import Sum

from production.models import ProductionReport, QualityReport, QualityReportDefects


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
    defect_event: str
    defect_types: str
    comment: str

    def __init__(self, production_id):
        self.production_id = production_id
        production = ProductionReport.objects.get(id=production_id)
        self.production_date = datetime.strftime(production.date, '%d.%m.%y %H:%M')
        self.produce_user = production.user.username
        self.detail = str(production.detail)
        self.color = str(production.color)
        self.imm = str(production.imm)
        self.imm_code = production.imm.plant_code
        self.quantity = production.quantity
        quality_reports = QualityReport.objects.filter(production=production)
        quality_quantities = quality_reports.aggregate(
            total_checked=Sum('quantity_checked'),
            total_approved=Sum('quantity_approved')
        )
        quantity_checked = quality_quantities['total_checked']
        if not quantity_checked:
            quantity_checked = 0
        quantity_approved = quality_quantities['total_approved']
        if not quantity_approved:
            quantity_approved = 0
        defect_event = quality_reports.values_list('defect_event__name', flat=True).distinct()
        defect_names = QualityReportDefects.objects.filter(quality_report__in=quality_reports).values_list(
            'defect__name', flat=True).distinct()
        comments = quality_reports.values_list('comment', flat=True).distinct()
        self.quantity_checked = quantity_checked
        self.quantity_checking = self.quantity - self.quantity_checked
        self.quantity_approved = quantity_approved
        self.defect = self.quantity_checked - self.quantity_approved
        self.defect_percent = round(self.defect / self.quantity * 100, 2)
        self.defect_event = ', '.join(map(str, defect_event))
        self.defect_types = ', '.join(map(str, defect_names))
        self.comment = ', '.join(map(str, comments))
