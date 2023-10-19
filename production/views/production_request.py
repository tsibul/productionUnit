import datetime

from django.shortcuts import render

from production.models import ProductionRequest, DetailInGoods, Color


def production_request(request):
    navi = 'request'
    product_request = ProductionRequest.objects.filter(deleted=False).order_by('-date_create', 'detail__goods__name')[
                      0:19]
    product_request_end = ProductionRequest.objects.filter(deleted=False).order_by('-date_create',
                                                                                   'detail__goods__name')[19:20]
    color = Color.objects.filter(deleted=False).order_by('color_scheme', 'color_id')
    detail = DetailInGoods.objects.filter(deleted=False).order_by('goods', 'position')
    context = {'navi': navi, 'product_request': product_request, 'product_request_end': product_request_end,
               'color': color, 'detail': detail, 'date_now': datetime.datetime.now()}
    return render(request, 'request.html', context)