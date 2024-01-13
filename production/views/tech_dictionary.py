from django.shortcuts import render
from django.utils import timezone

from production.service_function import user_group_list, if_admin, badges


def tech_dictionary(request):
    """
    Return tech data (for static page)
    :param request:
    :return:
    """
    navi = 'tech_dictionary'
    date_now = timezone.now()
    admin_state = if_admin(request)
    user_groups = user_group_list(request)
    badge_count = badges()
    context = {'navi': navi,
               'user_groups': user_groups,
               'admin_state': admin_state, 'badge_count': badge_count,
               'date_now': date_now,
               }
    return render(request, 'tech_dictionary.html', context)
