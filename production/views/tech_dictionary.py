from django.shortcuts import render
from django.utils import timezone

from production.models import DetailInGoods, Recipe, RecipeDetail, IMM, RecipeColorScheme, DetailBaseData, \
    DetailActualData, ImmType, ScrewType, EjectorType
from production.service_function import user_group_list, if_admin, badges


def tech_dictionary(request):
    """
    Return first 20 records of each tech_dictionary, sorted by default (for static page)
    :param request:
    :return:
    """
    navi = 'tech_dictionary'
    date_now = timezone.now()
    admin_state = if_admin(request)
    detail_in_goods = DetailInGoods.objects.filter(deleted=False).order_by('goods__article', 'position')[0:19]
    detail_in_goods_end = DetailInGoods.objects.filter(deleted=False).order_by('goods__article', 'position')[19:20]
    recipe_color_scheme = RecipeColorScheme.objects.filter(deleted=False).order_by('color_scheme', 'name')
    recipe = Recipe.objects.filter(deleted=False).order_by('recipe_color_scheme', 'color')[0:19]
    recipe_end = Recipe.objects.filter(deleted=False).order_by('recipe_color_scheme', 'color')[19:20]
    recipe_detail = RecipeDetail.objects.filter(deleted=False).order_by('recipe_color_scheme', 'color')[0:19]
    recipe_detail_end = RecipeDetail.objects.filter(deleted=False).order_by('recipe_color_scheme', 'color')[19:20]
    imm = IMM.objects.filter(deleted=False).order_by('plant_code')
    detail_base_data = DetailBaseData.objects.filter(deleted=False).order_by('detail_in_goods', '-date_create')[
                         0:19]
    detail_base_data_end = DetailBaseData.objects.filter(deleted=False).order_by('detail_in_goods', '-date_create')[
                             19:20]
    detail_actual_data = DetailActualData.objects.filter(deleted=False).order_by('detail_in_goods', '-date_create')[
                           0:19]
    detail_actual_data_end = DetailActualData.objects.filter(deleted=False).order_by('detail_in_goods',
                                                                                         '-date_create')[19:20]

    imm_type = ImmType.objects.filter(deleted=False).order_by('type')
    ejector_type = EjectorType.objects.filter(deleted=False).order_by('type')
    screw_type = ScrewType.objects.filter(deleted=False).order_by('geometry')
    user_groups = user_group_list(request)
    badge_count = badges()
    context = {'navi': navi, 'detail_in_goods': detail_in_goods, 'detail_in_goods_end': detail_in_goods_end,
               'imm': imm, 'recipe': recipe, 'recipe_end': recipe_end, 'user_groups': user_groups,
               'admin_state': admin_state, 'badge_count': badge_count, 'recipe_color_scheme': recipe_color_scheme,
               'recipe_detail': recipe_detail, 'date_now': date_now, 'recipe_detail_end': recipe_detail_end,
               'detail_base_data': detail_base_data, 'detail_base_data_end': detail_base_data_end,
               'detail_data_weight': detail_actual_data, 'detail_actual_data_end': detail_actual_data_end,
               'imm_type': imm_type, 'screw_type': screw_type, 'ejector_type': ejector_type}
    return render(request, 'tech_dictionary.html', context)