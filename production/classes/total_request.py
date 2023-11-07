from django.db.models import Sum, Min

from production.models import DetailInGoods, Color, ProductionRequest, ProductionForRequest,  \
    ProductionRequestStartStop, QualityForRequest


class TotalRequest:
    detail: str
    detail_id: int
    color: str
    color_id: int
    hex: str
    quantity: int
    approved: int
    checked: int
    checking: int
    produced: int
    left: int
    if_order: str
    first_date: str
    imm_id: int
    comment: str

    def __init__(self, detail_color):
        detail = DetailInGoods.objects.get(id=detail_color[0])
        color = Color.objects.get(id=detail_color[1])
        self.detail = str(detail)
        self.color = str(color)
        self.hex = color.color_code
        self.detail_id = detail.id
        self.color_id = color.id
        requests = ProductionRequest.objects.filter(deleted=False, detail=detail, color=color, closed=False)
        self.imm_id = 0
        if ProductionRequestStartStop.objects.filter(production_request__in=requests, date_stop=None):
            start_stop = ProductionRequestStartStop.objects.get(production_request__in=requests, date_stop=None)
            self.imm_id = start_stop.imm.id

        requests_initial = requests.aggregate(
            total_if_order=Sum('if_order'),
            min_date=Min('date_create')
        )
        requests_initial.update(requests.filter(technical=False).aggregate(total_quantity=Sum('quantity')))
        produced = 0
        checked = 0
        approved = 0
        left = 0
        comment = " ".join(requests.values_list('comment', flat=True))
        for production_request in requests:
            production_for_request = ProductionForRequest.objects.filter(production_request=production_request)
            quantity_produced = production_for_request.aggregate(quantity_produced=Sum('quantity'))['quantity_produced']
            quantity_left = production_request.quantity_left
            quality_for_request = QualityForRequest.objects.filter(production_request=production_request)
            quality_report = quality_for_request.aggregate(
                checked=Sum('quantity_checked'),
                approved=Sum('quantity_approved')
            )
            if quantity_produced:
                produced += quantity_produced
            if quality_report['checked']:
                checked = quality_report['checked']
            if quality_report['approved']:
                approved = quality_report['approved']
            left += quantity_left

        self.checked = checked
        self.approved = approved
        self.produced = produced
        self.checking = produced - checked
        self.quantity = requests_initial['total_quantity']
        if not self.quantity:
            self.quantity = 0
        self.if_order = 'да' if requests_initial['total_if_order'] else 'нет'
        self.first_date = requests_initial['min_date'].strftime('%Y-%m-%d')
        self.left = left
        self.comment = comment

    def __repr__(self):
        return f"{self.detail} {self.color} {self.quantity}"
