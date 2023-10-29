import json

from django.db.models import Sum
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone

from production.models import IMM, DetailInGoods, Color, ProductionRequest, ProductionForRequest, \
    ProductionRequestStartStop, ProductionReport
from production.classes import TotalRequest


def index(request):
    navi = 'main'
    imm = IMM.objects.filter(deleted=False).order_by('plant_code')
    imm_free = imm.exclude(productionrequeststartstop__date_stop__isnull=True,
                           productionrequeststartstop__date_start__isnull=False)
    user_groups = str(request.user.groups.values_list('name')[0]).replace('(', '').replace(')', '')
    context = {'navi': navi, 'imm': imm, 'imm_free': imm_free, 'user_groups': user_groups}
    return render(request, 'index.html', context)


def production_state(request, in_work):
    on_request = (ProductionRequest.objects.filter(deleted=False, closed=False).order_by('detail')
                  .values_list('detail', 'color').distinct())
    requests = []
    for item in on_request:
        total_request = TotalRequest(item)
        if in_work and total_request.imm_id:
            requests.append(TotalRequest(item))
        elif not in_work and not total_request.imm_id:
            requests.append(TotalRequest(item))
    serialized_requests = [request.__dict__ for request in requests]
    serialized_requests = sorted(serialized_requests, key=lambda order: (order['detail'], order['first_date']))
    json_response = json.dumps(serialized_requests, ensure_ascii=False)
    return JsonResponse(json_response, safe=False)


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
    production_start_stop = ProductionRequestStartStop.objects.get(date_stop=None, imm=imm)
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
                                  quantity=quantity)
    production.save()
    quantity_left = spread_production_for_requests(production, quantity)
    if quantity_left > 0:
        technical_request_create(quantity_left, production)
    return HttpResponseRedirect(reverse('production:main'))


def spread_production_for_requests(production, quantity):
    production_request = (
        ProductionRequest.objects.filter(deleted=False, closed=False, color=production.color,
                                         detail=production.detail).exclude(quantity_left=0).order_by('date_create'))
    for i, pr_request in enumerate(production_request):
        # production_for_request = ProductionForRequest.objects.filter(production_request=pr_request)
        # quantity_produced = production_for_request.aggregate(quantity_produced=Sum('quantity'))['quantity_produced']
        quantity_left = pr_request.quantity_left
        # if not quantity_produced:
        #     quantity_produced = 0
        # if pr_request.quantity - quantity_produced - quantity > 0:
        if quantity_left - quantity > 0:
            production_for_request_new = ProductionForRequest(production=production, production_request=pr_request,
                                                              quantity=quantity)
            production_for_request_new.save()
            pr_request.quantity_left = pr_request.quantity_left - quantity
            pr_request.save()
            quantity = 0
            break
        else:
            production_for_request_new = ProductionForRequest(production=production, production_request=pr_request,
                                                              quantity=quantity_left)
            production_for_request_new.save()
            # pr_request.closed = True
            # pr_request.date_close = date_now
            pr_request.quantity_left = 0
            pr_request.save()
            quantity = quantity - quantity_left
            production_start_stop = ProductionRequestStartStop.objects.get(production_request=pr_request,
                                                                           imm=production.imm,
                                                                           date_stop=None)
            production_start_stop.date_stop = production.date
            production_start_stop.user_stop = production.user
            production_start_stop.stop_reason = 'заказ выполнен'
            production_start_stop.save()
            if quantity == 0:
                break
            if i + 1 == production_request.count():
                break
            pr_request_next = production_request[i + 1]
            production_start_stop_new = ProductionRequestStartStop(production_request=pr_request_next,
                                                                   date_start=production.date,
                                                                   user_start=production.user,
                                                                   imm=production.imm)
            production_start_stop_new.save()
    return quantity


def technical_request_create(quantity, production):
    technical_request = ProductionRequest(detail=production.detail, color=production.color, quantity=quantity,
                                          quantity_left=0,
                                          date_create=production.date, user=production.user, if_order=False,
                                          technical=True)
    technical_request.save()
    technical_request_start_stop = ProductionRequestStartStop(production_request=technical_request,
                                                              date_start=production.date, user_start=production.user,
                                                              imm=production.imm,
                                                              date_stop=production.date, user_stop=production.user,
                                                              stop_reason='технический заказ выполнен')
    technical_request_start_stop.save()
    technical_request_production_for_request = ProductionForRequest(production=production, quantity=quantity,
                                                                    production_request=technical_request)
    technical_request_production_for_request.save()
