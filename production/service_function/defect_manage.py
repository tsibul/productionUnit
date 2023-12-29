from django.utils import timezone

from production.models import QualityReportDefects, Defects, QualityReport


def defects_create(request, quality_report: QualityReport):
    """
    Add list of defects to Quality report
    :param request:
    :param quality_report:
    :return:

    """
    defects = Defects.objects.filter(deleted=False)
    for defect in defects:
        key = str(defect.id)
        if key in request.POST:
            defect_item = QualityReportDefects(quality_report=quality_report, defect_id=key, user=request.user,
                                               date_create=timezone.now())
            defect_item.save()
