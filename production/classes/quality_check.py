from datetime import datetime

from django.db.models import Sum
from django.core import serializers

from production.models import ProductionReport, QualityReport, QualityReportDefects
from production.classes import QualityDetail


class QualityCheck:
    production_id: int
    production_date: str
    produce_user: str
    imm: str
    imm_code: str
    detail: str
    color: str
    hex: str
    quantity: int
    quantity_checked: int
    quantity_approved: int
    quantity_approved_defect: int
    defect: int
    defect_percent: float
    # defect_event: str
    # defect_types: str
    # comment: str
    quality_reports: []

    def __init__(self, production_id):
        self.production_id = production_id
        production = ProductionReport.objects.get(id=production_id)
        self.production_date = datetime.strftime(production.date, '%d.%m.%y %H:%M')
        self.produce_user = production.user.last_name
        self.detail = str(production.detail)
        self.color = str(production.color)
        self.hex = production.color.color_code
        self.imm = str(production.imm)
        self.imm_code = production.imm.plant_code
        self.quantity = production.quantity
        quality_reports = QualityReport.objects.filter(production=production)
        quality_quantities = quality_reports.aggregate(
            total_checked=Sum('quantity_checked'),
            total_approved=Sum('quantity_approved'),
            total_approved_defect=Sum('quantity_approved_defect')
        )
        self.quality_reports = [QualityDetail(report.id).__dict__ for report in quality_reports]
        quantity_checked = quality_quantities['total_checked']
        if not quantity_checked:
            quantity_checked = 0
        quantity_approved = quality_quantities['total_approved']
        if not quantity_approved:
            quantity_approved = 0
        quantity_approved_defect = quality_quantities['total_approved_defect']
        if not quantity_approved_defect:
            quantity_approved_defect = 0
        # defect_event = quality_reports.values_list('defect_event__name', flat=True).distinct()
        # defect_names = QualityReportDefects.objects.filter(quality_report__in=quality_reports).values_list(
        #     'defect__name', flat=True).distinct()
        # comments = quality_reports.values_list('comment', flat=True).distinct()
        self.quantity_checked = quantity_checked
        self.quantity_checking = self.quantity - self.quantity_checked
        self.quantity_approved = quantity_approved
        self.quantity_approved_defect = quantity_approved_defect
        self.defect = self.quantity_checked - self.quantity_approved
        self.defect_percent = round((self.defect + self.quantity_approved_defect) / self.quantity * 100, 2)
        # self.defect_event = ', '.join(map(str, defect_event))
        # self.defect_types = ', '.join(map(str, defect_names))
        # self.comment = ', '.join(map(str, comments))


# def serialize_quality_report(quality_report):
#     data = serializers.serialize('python', [quality_report])
#     quality_report_data = data[0]['fields']
#
#     # Форматируем поле 'date_check' как строку в формате "d.m.Y H:i"
#     quality_report_data['date_check'] = quality_report_data['date_check'].strftime("%d.%m.%Y %H:%M")
#
#     # Удаляем поле '_state'
#     quality_report_data.pop('_state', None)
#
#     return quality_report_data