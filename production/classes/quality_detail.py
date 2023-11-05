from production.models import QualityReport, QualityReportDefects


class QualityDetail:
    production_id: int
    date_check: str
    user: str
    quantity_checked: int
    quantity_approved: int
    quantity_approved_defect: int
    quantity_defect: int
    defect_percent: float
    defects: str
    comment: str
    defect_event: str

    def __init__(self, quality_report_id: int):
        quality_report = QualityReport.objects.get(id=quality_report_id)
        self.production_id = quality_report_id
        self.date_check = quality_report.date_check.strftime('%d.%m.%y %H:%M')
        self.user = quality_report.user.last_name
        self.quantity_checked = quality_report.quantity_checked
        self.quantity_approved = quality_report.quantity_approved
        self.quantity_approved_defect = quality_report.quantity_approved_defect
        self.quantity_defect = self.quantity_checked - self.quantity_approved
        self.defect_percent = round(
            (self.quantity_defect + self.quantity_approved_defect) / self.quantity_checked * 100, 2)
        self.defects = ', '.join(
            QualityReportDefects.objects.filter(quality_report=quality_report).values_list('defect__name', flat=True))
        self.comment = quality_report.comment
        self.defect_event = quality_report.defect_event.name
