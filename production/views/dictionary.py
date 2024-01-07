import json

from django.db.models import Max
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from production import models
from production.models import (ColorScheme, Color, Goods, DetailName, DetailInGoods, MainMaterial, AddMaterial,
                               MaterialType, MasterBatch, Country, Producer, Recipe, IMM, Defects, DefectEvent)
from production.service_function import user_group_list, linking_filter, format_datetime_fields, dict_additional_filter, \
    if_admin, badges


def dictionary(request):
    """
    Return first 20 records of each dictionary, sorted by default (for static page)
    :param request:
    :return:
    """
    navi = 'dictionary'
    admin_state = if_admin(request)
    color_group = ColorScheme.objects.filter(deleted=False).order_by('scheme_name')
    color = Color.objects.filter(deleted=False).order_by('color_scheme', 'code')[0:19]
    color_end = Color.objects.filter(deleted=False).order_by('color_scheme', 'code')[19:20]
    country = Country.objects.filter(deleted=False).order_by('name')
    producer = Producer.objects.filter(deleted=False).order_by('name')
    defects = Defects.objects.filter(deleted=False).order_by('name')
    defect_event = DefectEvent.objects.filter(deleted=False).order_by('name')
    detail = DetailName.objects.filter(deleted=False).order_by('name')
    detail_in_goods = DetailInGoods.objects.filter(deleted=False).order_by('goods__article', 'position')[0:19]
    detail_in_goods_end = DetailInGoods.objects.filter(deleted=False).order_by('goods__article', 'position')[19:20]
    material_type = MaterialType.objects.filter(deleted=False).order_by('name')
    main_material = MainMaterial.objects.filter(deleted=False).order_by('brand')[0:19]
    main_material_end = MainMaterial.objects.filter(deleted=False).order_by('brand')[19:20]
    add_material = AddMaterial.objects.filter(deleted=False).order_by('material_type__name')[0:19]
    add_material_end = AddMaterial.objects.filter(deleted=False).order_by('material_type__name')[19:20]
    masterbatch = MasterBatch.objects.filter(deleted=False).order_by('brand')
    goods = Goods.objects.filter(deleted=False).order_by('article')
    recipe = Recipe.objects.filter(deleted=False).order_by('goods__article')[0:19]
    recipe_end = Recipe.objects.filter(deleted=False).order_by('goods__article')[19:20]
    imm = IMM.objects.filter(deleted=False).order_by('plant_code')
    user_groups = user_group_list(request)
    badge_count = badges()

    context = {'navi': navi, 'color_group': color_group, 'country': country, 'producer': producer, 'detail': detail,
               'color': color, 'detail_in_goods': detail_in_goods, 'detail_in_goods_end': detail_in_goods_end,
               'color_end': color_end, 'material_type': material_type, 'masterbatch': masterbatch,
               'main_material': main_material, 'badge_count': badge_count,
               'main_material_end': main_material_end,
               'goods': goods, 'add_material': add_material,
               'add_material_end': add_material_end, 'imm': imm,
               'recipe': recipe, 'recipe_end': recipe_end, 'user_groups': user_groups, 'defects': defects,
               'defect_event': defect_event, 'admin_state': admin_state}
    return render(request, 'dictionary.html', context)


@csrf_exempt
def dictionary_update(request, dict_type):
    """
    Update the dictionary
    :param request:
    :param dict_type:
    :return:
    """
    dict_id = request.POST['id']
    dict_model = getattr(models, dict_type)
    field_list = [f.name for f in dict_model._meta.get_fields()]
    current_user = request.user
    if dict_id != '0':
        dict_element = dict_model.objects.get(id=dict_id)
    else:
        dict_element = dict_model()
    for field in field_list:
        if field in request.POST.keys() and field != 'id' and request.POST[field] != '':
            model_field = dict_model._meta.get_field(field)
            if model_field.get_internal_type() == 'ForeignKey':
                setattr(dict_element, field, model_field.related_model.objects.get(id=request.POST[field]))
            elif model_field.get_internal_type() == 'BooleanField':
                setattr(dict_element, field, False)
                # if request.POST[field]:
                #     setattr(dict_element, field, request.POST[field])
            else:
            # elif (model_field.get_internal_type() == 'DateTimeField' and request.POST[field] != '' or
            #       model_field.get_internal_type() != 'DateTimeField'):
                setattr(dict_element, field, request.POST[field])
    if 'user' in field_list:
        setattr(dict_element, 'user', current_user)
    dict_element.save()
    return HttpResponse()


def dictionary_json(request, dict_type, id_no, order, search_string, show_deleted, unclosed):
    """
    Returns table filtered 20 records fron id_no
    :param unclosed:
    :param request:
    :param dict_type: table of DB
    :param id_no: id of record from which start
    :param order: order of dictionary
    :param search_string: filtering string
    :param show_deleted: for admin purpose true default true
    :return:
    """
    dict_items = dict_additional_filter(dict_type, order, id_no, search_string, show_deleted, unclosed)
    formatted_dict_items = [format_datetime_fields(item) for item in dict_items]
    return JsonResponse(formatted_dict_items, safe=False)


def dictionary_delete(request, dict_type, id_no):
    """
    Delete record from table by record id
    :param request:
    :param dict_type: name of table
    :param id_no: id of record to delete
    :return:
    """
    dict_model = getattr(models, dict_type)
    dict_element = dict_model.objects.get(id=id_no)
    dict_element.deleted = True
    dict_element.save()
    return HttpResponse()


def dictionary_last_id(request, dict_type):
    """
    Finding last id in table of DB
    :param request:
    :param dict_type: table of DB
    :return: Json
    """
    dict_model = getattr(models, dict_type)
    last_id = dict_model.objects.filter(deleted=False).aggregate(Max('id'))
    json_dict = json.dumps(last_id, ensure_ascii=False, default=str)
    return JsonResponse(json_dict, safe=False)


def dictionary_json_filter(request, dict_type, filter_dictionary, filter_dictionary_id):
    """
    Using for table connection if we find item in second table in second table
    filter parent table by it
    :param request:
    :param dict_type:
    :param filter_dictionary:
    :param filter_dictionary_id:
    :return:
    """
    if dict_type == 'default':
        formatted_dict_items = []
        json_dict = json.dumps(formatted_dict_items, ensure_ascii=False, default=str)
        return JsonResponse(json_dict, safe=False)
    dict_model = getattr(models, dict_type)
    if filter_dictionary != 'default':
        filter_model = getattr(models, filter_dictionary)
        filter_item = linking_filter(dict_model, filter_model, filter_dictionary_id)
    else:
        filter_item = dict_model.objects.all()
    formatted_dict_items = [{item.id: str(item)} for item in filter_item]
    json_dict = json.dumps(formatted_dict_items, ensure_ascii=False, default=str)
    return JsonResponse(json_dict, safe=False)
