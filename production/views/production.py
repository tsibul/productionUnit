import json

from django.db.models import Sum
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone

from production.models import ProductionReport, Defects, DefectEvent, QualityReport, QualityReportDefects, \
    ProductionForRequest, ProductionRequest, QualityForRequest
from production.classes import QualityCheck, TotalRequest


def production(request):
    navi = 'production'
    try:
        user_groups = str(request.user.groups.values_list('name')[0]).replace('(', '').replace(')', '')
    except:
        user_groups = ''
    defects = Defects.objects.filter(deleted=False).order_by('name')
    defect_event = DefectEvent.objects.filter(deleted=False).order_by('name')
    context = {'navi': navi, 'user_groups': user_groups, 'defects': defects, 'defect_event': defect_event}
    return render(request, 'production.html', context)


def production_list(request, first_record, order):
    if order == 'default':
        order = '-date'
    last_record = first_record + 19
    prod_list = ProductionReport.objects.filter(deleted=False).order_by(order)[first_record:last_record]
    requests = []
    for item in prod_list:
        requests.append(QualityCheck(item.id))
    serialized_requests = [request.__dict__ for request in requests]
    json_response = json.dumps(serialized_requests, ensure_ascii=False)
    return JsonResponse(json_response, safe=False)


def production_acceptance(request):
    production_item = ProductionReport.objects.get(id=request.POST['production'])
    quantity_checked = request.POST['quantity_checked']
    quantity_approved = request.POST['quantity_approved']
    date_check = timezone.now()
    user = request.user
    comment = request.POST['comment']
    defect_event = request.POST['defect_event']
    quality_report = QualityReport(production=production_item, quantity_checked=quantity_checked,
                                   quantity_approved=quantity_approved, date_check=date_check, user=user,
                                   defect_event_id=defect_event, comment=comment)
    quality_report.save()

    production_item.defect = production_item.defect + int(quantity_checked) - int(quantity_approved)
    if production_item.quantity == QualityCheck(production_item.id).quantity_checked:
        production_item.closed = True
        production_item.date_close = timezone.now()
        production_item.user_close = user
    production_item.save()

    review_requests(production_item, int(quantity_checked), int(quantity_approved))
    quality_for_request_create(production_item, quality_report, int(quantity_checked), int(quantity_approved))
    defects_create(request, quality_report)
    return HttpResponseRedirect(reverse('production:production'))


def defects_create(request, quality_report: QualityReport):
    defects = Defects.objects.filter(deleted=False)
    for defect in defects:
        key = str(defect.id)
        if key in request.POST:
            defect_item = QualityReportDefects(quality_report=quality_report, defect_id=key)
            defect_item.save()


def quality_for_request_create(production_item: ProductionReport, quality_report: QualityReport,
                               quantity_checked_current: int, quantity_approved_current: int):
    production_requests = ProductionRequest.objects.filter(deleted=False, closed=False, detail=production_item.detail,
                                                           color=production_item.color).order_by('date_create')
    for production_request in production_requests:
        request_quantity_approved = QualityForRequest.objects.filter(
            production_request=production_request).aggregate(request_total_approved=Sum('quantity_approved'))[
            'request_total_approved']
        if not request_quantity_approved:
            request_quantity_approved = 0
        request_approved_left = production_request.quantity - request_quantity_approved

        if quantity_approved_current < request_approved_left:
            quality_for_request = QualityForRequest(production_request=production_request,
                                                    quality_report=quality_report,
                                                    quantity_checked=quantity_checked_current,
                                                    quantity_approved=quantity_approved_current)
            quality_for_request.save()
            break
        elif quantity_approved_current == request_approved_left:
            quality_for_request = QualityForRequest(production_request=production_request,
                                                    quality_report=quality_report,
                                                    quantity_checked=quantity_checked_current,
                                                    quantity_approved=quantity_approved_current)
            quality_for_request.save()
            production_request.closed = True
            production_request.date_close = timezone.now()
            production_request.save()
            break
        else:
            quality_for_request = QualityForRequest(production_request=production_request,
                                                    quality_report=quality_report,
                                                    quantity_checked=request_approved_left,
                                                    quantity_approved=request_approved_left)
            quality_for_request.save()
            quantity_approved_current = quantity_approved_current - request_approved_left
            quantity_checked_current = quantity_checked_current - request_approved_left
            production_request.closed = True
            production_request.date_close = timezone.now()
            production_request.save()
            if not quantity_checked_current:
                break


def review_requests(production_item: ProductionReport, quantity_checked_current: int, quantity_approved_current: int):
    production_requests = ProductionRequest.objects.filter(deleted=False, closed=False, detail=production_item.detail,
                                                           color=production_item.color).order_by('-date_create')
    quantity_defect = quantity_checked_current - quantity_approved_current
    quantity_defect = review_technical_requests(production_requests, quantity_defect)
    if quantity_defect:
        review_nontechnical_requests(production_requests, quantity_defect)
    return


def review_technical_requests(production_requests, quantity_defect: int):
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
