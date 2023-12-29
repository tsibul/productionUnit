from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone

from production.models import IMM, DetailInGoods, Color, ProductionRequest, ProductionForRequest, \
    ProductionRequestStartStop, ProductionReport
from production.service_function import user_group_list, spread_production_for_requests, technical_request_create, \
    if_admin, state


def index(request):
    navi = 'main'
    admin_state = if_admin(request)
    production_to_approve = ProductionReport.objects.filter(deleted=False, shift_rejected=True).order_by('-date')
    to_approve = production_to_approve.count()
    imm = IMM.objects.filter(deleted=False).order_by('plant_code')
    imm_free = imm.exclude(productionrequeststartstop__date_stop__isnull=True,
                           productionrequeststartstop__date_start__isnull=False)

    on_request, in_work = state()
    user_groups = user_group_list(request)
    context = {'navi': navi, 'imm': imm, 'imm_free': imm_free, 'user_groups': user_groups, 'admin_state': admin_state,
               'production_to_approve': production_to_approve, 'to_approve': to_approve, 'on_request': on_request,
               'in_work': in_work}

    return render(request, 'index.html', context)


def production_start(request):
    color = Color.objects.get(id=request.POST['color'])
    detail = DetailInGoods.objects.get(id=request.POST['detail'])
    imm = IMM.objects.get(id=request.POST['imm'])
    current_user = request.user
    date_now = timezone.now()
    production_request = (ProductionRequest.objects.filter(deleted=False, closed=False, color=color, detail=detail)
                          .order_by('date_create')).first()
    production_start_stop = ProductionRequestStartStop(production_request=production_request, date_start=date_now,
                                                       user_start=current_user, imm=imm)
    production_start_stop.save()
    return HttpResponseRedirect(reverse('production:main'))


def production_stop(request):
    imm = IMM.objects.get(id=request.POST['imm'])
    stop_reason = request.POST['stop_reason']
    current_user = request.user
    date_now = timezone.now()
    production_start_stop = ProductionRequestStartStop.objects.get(date_stop=None, imm=imm, deleted=False)
    production_start_stop.date_stop = date_now
    production_start_stop.user_stop = current_user
    production_start_stop.stop_reason = stop_reason
    production_start_stop.save()
    return HttpResponseRedirect(reverse('production:main'))


def production_report(request):
    color = Color.objects.get(id=request.POST['color'])
    detail = DetailInGoods.objects.get(id=request.POST['detail'])
    imm = IMM.objects.get(id=request.POST['imm'])
    current_user = request.user
    date_now = timezone.now()
    quantity = int(request.POST['quantity'])
    production = ProductionReport(detail=detail, color=color, date=date_now, imm=imm, user=current_user,
                                  quantity=quantity, shift_rejected=False)
    production.save()
    quantity_left = spread_production_for_requests(production, quantity)
    if quantity_left > 0:
        technical_request_create(quantity_left, production)
    return HttpResponseRedirect(reverse('production:main'))


# def shift_approved(request):
#     production = ProductionReport.objects.get(id=request.POST['id'])
#     production.shift_rejected = False
#     production.save()
#     quantity = production.quantity
#     quantity_left = spread_production_for_requests(production, quantity)
#     if quantity_left > 0:
#         technical_request_create(quantity_left, production)
#     return HttpResponseRedirect(reverse('production:main'))
#
#
# def shift_rejected(request):
#     production = ProductionReport.objects.get(id=request.POST['id'])
#     production.deleted = True
#     production.save()
#     return HttpResponseRedirect(reverse('production:main'))
