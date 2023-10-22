import json

from django.db.models import Sum
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone

from production.models import IMM, DetailInGoods, Color, ProductionRequest, ProductionForRequest, \
    ProductionRequestStartStop, ProductionReport
from production.classes import QualityCheck


def production(request):
    navi = 'production'
    user_groups = str(request.user.groups.values_list('name')[0]).replace('(', '').replace(')', '')
    context = {'navi': navi, 'user_groups': user_groups}
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



