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
    user_groups = str(request.user.groups.values_list('name')[0]).replace('(', '').replace(')', '')
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

    quality_for_request_create(production_item, quality_report, int(quantity_checked), int(quantity_approved))
    defects_create(request, quality_report)

    # review_requests(production_item)

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
        # elif quantity_approved_current < request_approved_left:
        #     quality_for_request = QualityForRequest(production_request=production_request,
        #                                             quality_report=quality_report,
        #                                             quantity_checked=production_request.quantity,
        #                                             quantity_approved=quantity_approved_current)
        #     quantity_approved_current = 0
        #     quantity_checked_current = quantity_checked_current - request_checked_left
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
            if not quantity_approved_current:
                break
        quality_for_request.save()


def review_requests(production_item: ProductionReport):
    # detail = production_item.detail.id
    # color = production_item.color.id
    # total_requests = TotalRequest((detail, color))
    # quantity_checked = total_requests.checked
    # quantity_approved = total_requests.approved
    # quantity_rejected = quantity_checked - quantity_approved
    # production_for_requests = ProductionForRequest.objects.filter(production=production_item)
    # production_requests = ProductionRequest.objects.filter(
    #     id__in=production_for_requests.values_list('production_request', flat=True), date_close=None)
    # if quantity_approved:
    #     for production_request in production_requests.order_by('date_create'):
    #         quantity_approved = quantity_approved - production_request.quantity
    #         if quantity_approved <= 0:
    #             break
    #         production_request.closed = True
    #         production_request.date_close = timezone.now()
    #         production_request.save()
    # if quantity_rejected:
    #     for production_request in production_requests.order_by('-date_create'):
    #         pass
    return
