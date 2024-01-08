from production.models import ProductionRequest, ProductionReport


def badges():
    request_count = ProductionRequest.objects.filter(deleted=False, closed=False).count()
    report_count = ProductionReport.objects.filter(deleted=False, closed=False).count()
    return [request_count, report_count]
