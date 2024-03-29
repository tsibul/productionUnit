import json

from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone

from production.models import ProductionReport, Defects, DefectEvent, QualityReport
from production.classes import QualityCheck
from production.service_function import user_group_list, defects_create, review_requests, quality_for_request_create, \
    if_admin, compare_objects, badges


def production(request):
    navi = 'production'
    admin_state = if_admin(request)
    user_groups = user_group_list(request)
    defects = Defects.objects.filter(deleted=False).order_by('name')
    defect_event = DefectEvent.objects.filter(deleted=False).order_by('name')
    badge_count = badges()

    context = {'navi': navi, 'user_groups': user_groups, 'defects': defects, 'defect_event': defect_event,
               'admin_state': admin_state, 'badge_count': badge_count}
    return render(request, 'production.html', context)


def production_list(request, first_record, order, unclosed, search_string):
    if order == 'default':
        order = '-date'
    last_record = first_record + 20
    filter_list = ProductionReport.objects.filter(deleted=False, shift_rejected=False).order_by(order)
    if unclosed:
        filter_list = filter_list.filter(closed=False)
    if search_string != 'default':
        search_string = search_string.replace('_', ' ')
        prod_list = filter_list.filter(id=0)
        for field in ProductionReport._meta.get_fields():
            if field.get_internal_type() == 'CharField' or field.get_internal_type() == 'DateTimeField':
                field_name = field.name + '__icontains'
                prod_list = prod_list | filter_list.filter(**{field_name: search_string})
            elif field.get_internal_type() == 'ForeignKey':
                foreign_model = field.related_model
                foreign_model_objects = foreign_model.objects.all()
                filtered_foreign = filter(lambda obj: compare_objects(str(obj).lower(), search_string.lower()),
                                          foreign_model_objects)
                field_name = field.name + '__in'
                prod_list = prod_list | filter_list.filter(**{field_name: filtered_foreign})
    else:
        prod_list = filter_list
    prod_list = prod_list.distinct()[first_record:last_record]
    requests = []
    for item in prod_list:
        requests.append(QualityCheck(item.id))
    serialized_requests = [request.__dict__ for request in requests]
    json_response = json.dumps(serialized_requests, ensure_ascii=False)
    return JsonResponse(json_response, safe=False)


def production_acceptance(request):
    production_item = ProductionReport.objects.get(id=request.POST['production'])
    quantity_checked = request.POST['quantity_checked']
    quantity_approved = request.POST['quantity_approved']
    quantity_approved_defect = request.POST['quantity_approved_defect']
    date_check = timezone.now()
    user = request.user
    comment = request.POST['comment']
    defect_event = request.POST['defect_event']
    quality_report = QualityReport(production=production_item, quantity_checked=quantity_checked,
                                   quantity_approved=quantity_approved, date_check=date_check, user=user,
                                   defect_event_id=defect_event, comment=comment,
                                   quantity_approved_defect=quantity_approved_defect)
    quality_report.save()

    production_item.defect = production_item.defect + int(quantity_checked) - int(quantity_approved)
    if production_item.quantity == QualityCheck(production_item.id).quantity_checked:
        production_item.closed = True
        production_item.date_close = timezone.now()
        production_item.user_close = user
    production_item.save()

    review_requests(production_item, int(quantity_checked), int(quantity_approved))
    quality_for_request_create(production_item, quality_report, int(quantity_checked), int(quantity_approved))
    defects_create(request, quality_report)
    return HttpResponseRedirect(reverse('production:production'))
