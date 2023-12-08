from django.http import HttpResponse
from django.shortcuts import render
from django.utils import timezone

from production.models import ProductionRequest, DetailInGoods, Color, ProductionRequestStartStop
from production.service_function import user_group_list


def production_request(request):
    """ Create list of production requests for db \n
    :param request: Http request
    :return: first 12 records from db (last will be with last-record=12 in html)
    """
    navi = 'request'
    product_request = ProductionRequest.objects.filter(deleted=False).order_by('-date_create', 'detail__goods__name')[
                      0:11]
    product_request_end = ProductionRequest.objects.filter(deleted=False).order_by('-date_create',
                                                                                   'detail__goods__name')[11:12]
    color = Color.objects.filter(deleted=False).order_by('color_scheme', 'color_id')
    detail = DetailInGoods.objects.filter(deleted=False).order_by('goods', 'position')
    user_groups = user_group_list(request)
    context = {'navi': navi, 'product_request': product_request, 'product_request_end': product_request_end,
               'color': color, 'detail': detail, 'date_now': timezone.now(), 'user_groups': user_groups}
    return render(request, 'request.html', context)


def production_request_close(request, request_id):
    product_request = ProductionRequest.objects.get(id=request_id)
    start_stop = ProductionRequestStartStop.objects.filter(production_request=product_request).first()
    print(start_stop, start_stop.date_start, start_stop.date_stop)
    if start_stop is None or start_stop.date_start and not start_stop.date_stop:
        current_user = request.user
        current_date = timezone.now()
        product_request.comment = product_request.comment + " закрыто " + current_user.last_name
        product_request.closed = True
        product_request.date_close = current_date
        product_request.save()
    return HttpResponse()
