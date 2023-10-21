import json

from django.core.serializers import serialize
from django.db.models import Sum, Min
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone

from production.models import IMM, DetailInGoods, Color, ProductionRequest, ProductionForRequest, QualityReport, \
    ProductionRequestStartStop


class TotalRequests:
    detail: str
    detail_id: int
    color: str
    color_id: int
    quantity: int
    approved: int
    checking: int
    left: int
    if_order: str
    first_date: str
    imm_id: int

    def __init__(self, detail_color):
        detail = DetailInGoods.objects.get(id=detail_color[0])
        color = Color.objects.get(id=detail_color[1])
        self.detail = str(detail)
        self.color = str(color)
        self.detail_id = detail.id
        self.color_id = color.id
        requests = ProductionRequest.objects.filter(deleted=False, detail=detail, color=color, closed=False)
        try:
            start_stop = ProductionRequestStartStop.objects.get(production_request__in=requests, date_stop=None)
            self.imm_id = start_stop.imm.id
        except:
            self.imm_id = 0
        requests_initial = requests.aggregate(
            total_quantity=Sum('quantity'),
            total_if_order=Sum('if_order'),
            min_date=Min('date_create')
        )
        produced = 0
        production_list = []
        for production_request in requests:
            production_for_request = ProductionForRequest.objects.filter(production_request=production_request)
            quantity_produced = production_for_request.aggregate(quantity_produced=Sum('quantity'))['quantity_produced']
            if quantity_produced:
                produced += quantity_produced
            production_list = production_list + list(production_for_request.values_list('production', flat=True))
        checked = 0
        approved = 0
        for production in production_list:
            quality_report = QualityReport.objects.filter(production=production).aggregate(
                checked=Sum('quantity_checked'),
                approved=Sum('quantity_approved')
            )
            if quality_report['checked']:
                checked += quality_report['checked']
            if quality_report['approved']:
                approved += quality_report['approved']
        self.approved = approved
        self.checking = produced - checked
        self.quantity = requests_initial['total_quantity']

        self.if_order = 'да' if requests_initial['total_if_order'] else 'нет'
        self.first_date = requests_initial['min_date'].strftime('%Y-%m-%d')
        self.left = self.quantity - self.approved - self.checking


def index(request):
    navi = 'main'
    imm = IMM.objects.filter(deleted=False).order_by('plant_code')
    imm_free = imm.exclude(productionrequeststartstop__date_stop__isnull=True)
    context = {'navi': navi, 'imm': imm, 'imm_free': imm_free}
    return render(request, 'index.html', context)


def production_state(request, in_work):
    on_request = (ProductionRequest.objects.filter(deleted=False, closed=False).order_by('detail')
                  .values_list('detail', 'color').distinct())
    requests = []
    for item in on_request:
        total_request = TotalRequests(item)
        if in_work and total_request.imm_id:
            requests.append(TotalRequests(item))
        elif not in_work and not total_request.imm_id:
            requests.append(TotalRequests(item))
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
