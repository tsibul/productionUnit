import json

from django.db.models import Sum
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone

from production.models import IMM, DetailInGoods, Color, ProductionRequest, ProductionForRequest, \
    ProductionRequestStartStop, ProductionReport
from production.classes import TotalRequests


def production(request):
    navi = 'production'
    user_groups = str(request.user.groups.values_list('name')[0]).replace('(', '').replace(')', '')
    context = {'navi': navi, 'user_groups': user_groups}
    return render(request, 'production.html', context)


