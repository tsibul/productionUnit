import datetime

from django.shortcuts import render

from production.service_function import user_group_list, if_admin, badges


def production_admin(request):
    navi = 'admin'
    admin_state = if_admin(request)
    user_groups = user_group_list(request)
    badge_count = badges()
    context = {'navi': navi,
               'date_now': datetime.datetime.now(), 'user_groups': user_groups,
               'admin_state': admin_state, 'badge_count': badge_count}
    return render(request, 'admin.html', context)
