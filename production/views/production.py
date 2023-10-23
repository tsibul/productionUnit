import json

from django.db.models import Sum
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone

from production.models import ProductionReport, Defects, DefectEvent, QualityReport, QualityReportDefects
from production.classes import QualityCheck


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
    defects = Defects.objects.filter(deleted=False)
    for defect in defects:
        key = str(defect.id)
        if key in request.POST:
            defect_item = QualityReportDefects(quality_report=quality_report, defect_id=key)
            defect_item.save()

    return HttpResponseRedirect(reverse('production:production'))
