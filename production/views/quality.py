import json

from django.http import JsonResponse
from django.shortcuts import render
from datetime import datetime
from django.urls import reverse
from django.utils import timezone

from production.models import ProductionReport, Defects, DefectEvent, QualityReport, QualityReportDefects, \
    ProductionForRequest, ProductionRequest, QualityForRequest
from production.classes import QualityCheck, TotalRequest


def quality_report(request):
    navi = 'quality'
    try:
        user_groups = str(request.user.groups.values_list('name')[0]).replace('(', '').replace(')', '')
    except:
        user_groups = ''
    defects = Defects.objects.filter(deleted=False).order_by('name')
    defect_event = DefectEvent.objects.filter(deleted=False).order_by('name')
    context = {'navi': navi, 'user_groups': user_groups, 'defects': defects, 'defect_event': defect_event}
    return render(request, 'quality.html', context)


def quality_list(request, date_start, date_end):
    date_st = timezone.make_aware(datetime.strptime(date_start, '%Y-%m-%d'))
    date_en = timezone.make_aware(datetime.strptime(date_end, '%Y-%m-%d'))
    prod_list = ProductionReport.objects.filter(deleted=False, date__gte=date_st, date__lte=date_en).order_by('date')
    requests = []
    for item in prod_list:
        requests.append(QualityCheck(item.id))
    serialized_requests = [request.__dict__ for request in requests]
    json_response = json.dumps(serialized_requests, ensure_ascii=False)
    return JsonResponse(json_response, safe=False)
