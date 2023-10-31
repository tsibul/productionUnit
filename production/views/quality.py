import json

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from datetime import datetime
from django.urls import reverse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from production.models import ProductionReport, Defects, DefectEvent, QualityReport, QualityReportDefects, \
    ProductionForRequest, ProductionRequest, QualityForRequest
from production.classes import QualityCheck, TotalRequest
from production.views import defects_create


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


def rest_defects_list(request, quality_report_id):
    current_defects = QualityReportDefects.objects.filter(quality_report__id=quality_report_id).values_list(
        'defect__id', flat=True)
    left_defects = list(Defects.objects.filter(deleted=False).exclude(id__in=current_defects).values())
    json_response = json.dumps(left_defects, ensure_ascii=False)
    return JsonResponse(json_response, safe=False)


@csrf_exempt
def quality_report_update(request):
    report_id = request.POST['production']
    report = QualityReport.objects.get(id=report_id)
    comment = request.POST['comment']
    report.comment = comment
    report.save()
    defects_create(request, report)
    return HttpResponse()

