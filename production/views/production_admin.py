import datetime

from django.shortcuts import render

from production.models import ProductionRequest, ProductionRequestStartStop, ProductionReport


def production_admin(request):
    navi = 'admin'
    product_request = ProductionRequest.objects.all().order_by('-date_create', 'detail__goods__name').first()
    product_report = ProductionReport.objects.all().order_by('-date', 'detail__goods__name').first()
    request_start_stop = ProductionRequestStartStop.objects.all().order_by('-production_request__date_create',
                                                                           '-date_start').first()
    try:
        user_groups = str(request.user.groups.values_list('name')[0]).replace('(', '').replace(')', '')
    except:
        user_groups = ''
    context = {'navi': navi, 'product_request': product_request, 'product_report': product_report,
               'request_start_stop': request_start_stop,
               'date_now': datetime.datetime.now(), 'user_groups': user_groups}
    return render(request, 'admin.html', context)
