from django.db.models import Sum
from django.utils import timezone

from production.models import ProductionReport, ProductionRequest, QualityForRequest, QualityReport


def review_requests(production_item: ProductionReport, quantity_checked_current: int, quantity_approved_current: int):
    """
    Change quantity left in requests
    :param production_item:
    :param quantity_checked_current:
    :param quantity_approved_current:
    :return:
    """
    production_requests = ProductionRequest.objects.filter(deleted=False, closed=False, detail=production_item.detail,
                                                           color=production_item.color).order_by('-date_create')
    quantity_defect = quantity_checked_current - quantity_approved_current
    quantity_defect = review_technical_requests(production_requests, quantity_defect)
    if quantity_defect:
        review_nontechnical_requests(production_requests, quantity_defect)
    return


def review_technical_requests(production_requests, quantity_defect: int):
    """
    Changes quantity left non technical requests according to defects quantity
    :param production_requests: requests aggregated from quality control
    :param quantity_defect: quantity of production with defects
    :return:
    """
    for tech_request in production_requests.filter(technical=True):
        if quantity_defect < tech_request.quantity:
            tech_request.quantity = tech_request.quantity - quantity_defect
            tech_request.save()
            quantity_defect = 0
            break
        else:
            quantity_defect = quantity_defect - tech_request.quantity
            tech_request.quantity = 0
            tech_request.deleted = True
            tech_request.save()
    return quantity_defect


def review_nontechnical_requests(production_requests, quantity_defect: int):
    """
    Changes quantity left in non technical requests according to defects quantity
    :param production_requests: requests aggregated from quality control
    :param quantity_defect: quantity of production with defects
    :return:
    """
    for production_request in production_requests.filter(technical=False):
        if quantity_defect < production_request.quantity - production_request.quantity_left:
            production_request.quantity_left = production_request.quantity_left + quantity_defect
            production_request.save()
            break
        else:
            quantity_defect = quantity_defect - production_request.quantity + production_request.quantity_left
            production_request.quantity_left = production_request.quantity
            production_request.save()
            if not quantity_defect:
                break


def quality_for_request_create(production_item: ProductionReport, quality_report: QualityReport,
                               quantity_checked_current: int, quantity_approved_current: int):
    """
    Unassemble quality report between requests
    :param production_item: from Production Report
    :param quality_report: Quality report corresponding to Production Report
    :param quantity_checked_current: quality check result
    :param quantity_approved_current: quality check result
    :return:
    """
    production_requests = ProductionRequest.objects.filter(deleted=False, closed=False, detail=production_item.detail,
                                                           color=production_item.color).order_by('date_create')
    for production_request in production_requests:
        request_quantity_approved = QualityForRequest.objects.filter(
            production_request=production_request).aggregate(request_total_approved=Sum('quantity_approved'))[
            'request_total_approved']
        if not request_quantity_approved:
            request_quantity_approved = 0
        request_approved_left = production_request.quantity - request_quantity_approved
        quality_for_request = QualityForRequest(production_request=production_request,
                                                quality_report=quality_report)
        if quantity_approved_current <= request_approved_left:
            quality_for_request.quantity_checked = quantity_checked_current
            quality_for_request.quantity_approved = quantity_approved_current
            quality_for_request.save()
            if quantity_approved_current == request_approved_left:
                production_request.closed = True
                production_request.date_close = timezone.now()
                production_request.save()
            break
        else:
            quality_for_request.quantity_checked = request_approved_left
            quality_for_request.quantity_approved = request_approved_left
            quality_for_request.save()
            quantity_approved_current = quantity_approved_current - request_approved_left
            quantity_checked_current = quantity_checked_current - request_approved_left
            production_request.closed = True
            production_request.date_close = timezone.now()
            production_request.save()
            if not quantity_checked_current:
                break
