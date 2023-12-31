import json

from production.classes import TotalRequest
from production.models import ProductionRequest, ProductionForRequest, ProductionRequestStartStop


def state():
    """
    Filter not closed request and aggregate them
    :return: on-request — request in the queue in-work — request making in IMMs
    """
    reqs = (ProductionRequest.objects.filter(deleted=False, closed=False).order_by('detail')
            .values_list('detail', 'color').distinct())
    in_work = []
    on_request = []
    for item in reqs:
        total_request = TotalRequest(item)
        if total_request.imm_id:
            in_work.append(TotalRequest(item))
        else:
            on_request.append(TotalRequest(item))
    ser_on_request = [on_req.__dict__ for on_req in on_request]
    ser_on_request = sorted(ser_on_request, key=lambda order: (order['first_date'], order['detail']))
    ser_in_work = [in_wrk.__dict__ for in_wrk in in_work]
    return json.dumps(ser_on_request), json.dumps(ser_in_work)


def spread_production_for_requests(production, quantity):
    """
    Spread production for requests aggregated in mane page
    :param production: production produced
    :param quantity: quantity produced
    :return: quantity left to produce
    """
    production_request = (
        ProductionRequest.objects.filter(deleted=False, closed=False, color=production.color,
                                         detail=production.detail).exclude(quantity_left=0).order_by('date_create'))
    for i, pr_request in enumerate(production_request):
        quantity_left = pr_request.quantity_left
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
            pr_request.quantity_left = 0
            pr_request.save()
            quantity = quantity - quantity_left
            production_start_stop = ProductionRequestStartStop.objects.get(production_request=pr_request,
                                                                           imm=production.imm,
                                                                           date_stop=None, deleted=False)
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
    """
    Create a technical request if quantity produced more than ordered
    :param quantity: quantity exceeded order quantity
    :param production: production which was produced
    :return: void (save technical request
    """
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


