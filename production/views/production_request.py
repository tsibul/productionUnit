import datetime

from django.shortcuts import render

from production.models import ProductionRequest, DetailInGoods, Color
from production.service_function import user_group_list


def production_request(request):
    navi = 'request'
    product_request = ProductionRequest.objects.filter(deleted=False).order_by('-date_create', 'detail__goods__name')[
                      0:11]
    product_request_end = ProductionRequest.objects.filter(deleted=False).order_by('-date_create',
                                                                                   'detail__goods__name')[11:12]
    color = Color.objects.filter(deleted=False).order_by('color_scheme', 'color_id')
    detail = DetailInGoods.objects.filter(deleted=False).order_by('goods', 'position')
    user_groups = user_group_list(request)
    context = {'navi': navi, 'product_request': product_request, 'product_request_end': product_request_end,
               'color': color, 'detail': detail, 'date_now': datetime.datetime.now(), 'user_groups': user_groups}
    return render(request, 'request.html', context)
