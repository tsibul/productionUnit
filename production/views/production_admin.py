import datetime

from django.shortcuts import render

from production.models import ProductionRequest, ProductionRequestStartStop, ProductionReport, ProductionForRequest, \
    QualityForRequest, QualityReport, QualityReportDefects
from production.service_function import user_group_list, if_admin, badges


def production_admin(request):
    navi = 'admin'
    admin_state = if_admin(request)
    product_request = ProductionRequest.objects.all().order_by('-date_create', 'detail__goods__name').first()
    product_report = ProductionReport.objects.all().order_by('-date', 'detail__goods__name').first()
    request_start_stop = ProductionRequestStartStop.objects.all().order_by('-date_start',
                                                                           '-production_request__date_create').first()
    production_for_request = ProductionForRequest.objects.all().order_by('-production_request__date_create').first()
    quality_for_request = QualityForRequest.objects.all().order_by('-quality_report__date_check').first()
    quality_report = QualityReport.objects.all().order_by('-date_check', '-production__date').first()
    quality_report_defect = QualityReportDefects.objects.all().order_by('-quality_report__date_check').first()
    user_groups = user_group_list(request)
    badge_count = badges()
    context = {'navi': navi, 'product_request': product_request, 'product_report': product_report,
               'request_start_stop': request_start_stop, 'production_for_request': production_for_request,
               'quality_for_request': quality_for_request, 'quality_report': quality_report,
               'quality_report_defect': quality_report_defect,
               'date_now': datetime.datetime.now(), 'user_groups': user_groups,
               'admin_state': admin_state, 'badge_count': badge_count}
    return render(request, 'admin.html', context)
