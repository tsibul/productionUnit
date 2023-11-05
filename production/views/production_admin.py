import datetime

from django.shortcuts import render

from production.models import ProductionRequest, ProductionReport


def production_admin(request):
    navi = 'admin'
    product_request = ProductionRequest.objects.all().order_by('-date_create', 'detail__goods__name').first()
    product_report = ProductionReport.objects.all().order_by('-date', 'detail__goods__name').first()
    try:
        user_groups = str(request.user.groups.values_list('name')[0]).replace('(', '').replace(')', '')
    except:
        user_groups = ''
    context = {'navi': navi, 'product_request': product_request,
               'product_report': product_report,
               'date_now': datetime.datetime.now(), 'user_groups': user_groups}
    return render(request, 'admin.html', context)
