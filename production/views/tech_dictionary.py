from django.shortcuts import render
from production.models import DetailInGoods, Recipe, IMM
from production.service_function import user_group_list, if_admin, badges


def tech_dictionary(request):
    """
    Return first 20 records of each dictionary, sorted by default (for static page)
    :param request:
    :return:
    """
    navi = 'tech_dictionary'
    admin_state = if_admin(request)
    detail_in_goods = DetailInGoods.objects.filter(deleted=False).order_by('goods__article', 'position')[0:19]
    detail_in_goods_end = DetailInGoods.objects.filter(deleted=False).order_by('goods__article', 'position')[19:20]
    recipe = Recipe.objects.filter(deleted=False).order_by('goods__article')[0:19]
    recipe_end = Recipe.objects.filter(deleted=False).order_by('goods__article')[19:20]
    imm = IMM.objects.filter(deleted=False).order_by('plant_code')
    user_groups = user_group_list(request)
    badge_count = badges()
    context = {'navi': navi, 'detail_in_goods': detail_in_goods, 'detail_in_goods_end': detail_in_goods_end,
               'imm': imm, 'recipe': recipe, 'recipe_end': recipe_end, 'user_groups': user_groups,
               'admin_state': admin_state, 'badge_count': badge_count}
    return render(request, 'tech_dictionary.html', context)


