from django.db.models import Sum, Min

from production.models import DetailInGoods, Color, ProductionRequest, ProductionForRequest, QualityReport, \
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
            total_if_order=Sum('if_order'),
            min_date=Min('date_create')
        )
        requests_initial.update(requests.filter(technical=False).aggregate(total_quantity=Sum('quantity')))
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
