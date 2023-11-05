import json
from datetime import datetime

from django.contrib.auth.models import User
from django.db import models as models_rec

from django.db.models import Max
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from production import models
from production.models import (ColorScheme, Color, Goods, DetailName, DetailInGoods, MainMaterial, AddMaterial,
                               MaterialType, MasterBatch, Country, Producer, Recipe, IMM, Defects, DefectEvent)


def dictionary(request):
    navi = 'dictionary'
    color_group = ColorScheme.objects.filter(deleted=False).order_by('scheme_name')
    color = Color.objects.filter(deleted=False).order_by('color_scheme', 'color_id')[0:19]
    color_end = Color.objects.filter(deleted=False).order_by('color_scheme', 'color_id')[19:20]
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
    try:
        user_groups = str(request.user.groups.values_list('name')[0]).replace('(', '').replace(')', '')
    except:
        user_groups = ''
    context = {'navi': navi, 'color_group': color_group, 'country': country, 'producer': producer, 'detail': detail,
               'color': color, 'detail_in_goods': detail_in_goods, 'detail_in_goods_end': detail_in_goods_end,
               'color_end': color_end, 'material_type': material_type, 'masterbatch': masterbatch,
               'main_material': main_material,
               'main_material_end': main_material_end,
               'goods': goods, 'add_material': add_material,
               'add_material_end': add_material_end, 'imm': imm,
               'recipe': recipe, 'recipe_end': recipe_end, 'user_groups': user_groups, 'defects': defects,
               'defect_event': defect_event}

    return render(request, 'dictionary.html', context)


@csrf_exempt
def dictionary_update(request, dict_type):
    dict_id = request.POST['id']
    dict_model = getattr(models, dict_type)
    field_list = [f.name for f in dict_model._meta.get_fields()]
    current_user = request.user
    if dict_id != '0':
        dict_element = dict_model.objects.get(id=dict_id)
    else:
        dict_element = dict_model()
    for field in field_list:
        if field in request.POST.keys() and field != 'id':
            model_field = dict_model._meta.get_field(field)
            if model_field.get_internal_type() == 'ForeignKey':
                setattr(dict_element, field, model_field.related_model.objects.get(id=request.POST[field]))
            elif model_field.get_internal_type() == 'Boolean':
                setattr(dict_element, field, False)
                if request.POST[field]:
                    setattr(dict_element, field, True)
            else:
                setattr(dict_element, field, request.POST[field])
    if 'user' in field_list:
        setattr(dict_element, 'user', current_user)
    dict_element.save()
    return HttpResponse()


def dictionary_json(request, dict_type, id_no, order, search_string, show_deleted):
    dict_items = dict_additional_filter(dict_type, order, id_no, search_string, show_deleted)
    formatted_dict_items = [format_datetime_fields(item) for item in dict_items.values()]
    json_dict = json.dumps(formatted_dict_items, ensure_ascii=False, default=str)
    return JsonResponse(json_dict, safe=False)


def format_datetime_fields(item):
    try:
        item['hex'] = Color.objects.get(id=item['color_id']).color_code
    except:
        pass
    formatted_item = {}
    for field_name, field_value in item.items():
        if isinstance(field_value, datetime):
            formatted_item[field_name] = field_value.strftime('%d.%m.%y %H:%M')
        else:
            formatted_item[field_name] = field_value
    return formatted_item


def dict_additional_filter(dict_type, order, id_no, search_string, show_deleted):  # костыль
    dict_model = getattr(models, dict_type)
    if order == 'default':
        order = dict_model.order_default()
    if show_deleted:
        filter_items = dict_model.objects.all().order_by(*order)
    else:
        filter_items = dict_model.objects.filter(deleted=False).order_by(*order)
    if search_string == 'default':
        dict_items = filter_items
    else:
        search_string = search_string.replace('_', ' ')
        dict_items = filter_items.filter(id=0)
        for field in dict_model._meta.get_fields():
            if field.get_internal_type() == 'CharField' or field.get_internal_type() == 'DateTimeField':
                field_name = field.name + '__icontains'
                dict_items = dict_items | filter_items.filter(**{field_name: search_string})
            elif field.get_internal_type() == 'ForeignKey':
                foreign_model = field.related_model
                for key in foreign_model._meta.get_fields():
                    if key.get_internal_type() == 'CharField':
                        field_name = field.name + '__' + key.name + '__icontains'
                        dict_items = dict_items | filter_items.filter(**{field_name: search_string})
    dict_items = dict_items.distinct()[id_no: id_no + 20]
    return dict_items


def dictionary_delete(request, dict_type, id_no):
    dict_model = getattr(models, dict_type)
    dict_element = dict_model.objects.get(id=id_no)
    dict_element.deleted = True
    dict_element.save()
    return HttpResponse()


def dictionary_last_id(request, dict_type):
    dict_model = getattr(models, dict_type)
    last_id = dict_model.objects.filter(deleted=False).aggregate(Max('id'))
    json_dict = json.dumps(last_id, ensure_ascii=False, default=str)
    return JsonResponse(json_dict, safe=False)


def fetch_user_by_id(request, user_id):
    user_name = User.objects.get(id=user_id).last_name
    return JsonResponse(user_name, safe=False)


def fetch_dict_str_by_id(request, dict_type, dict_id):
    dict_model = getattr(models, dict_type)
    dict_str = str(dict_model.objects.get(id=dict_id))
    return JsonResponse(dict_str, safe=False)


def dictionary_json_filter(request, dict_type, filter_dictionary, filter_dictionary_id):
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


def linking_filter(model1, model2, model2_id):
    linking = find_linking_model(model1, model2)
    linking1 = cut_linking_pass(linking[0])
    linking2 = cut_linking_pass(linking[1])
    item2 = linking2[0][0].objects.get(id=model2_id)
    for i in range(len(linking2) - 1):
        item2 = getattr(item2, linking2[i + 1][1])
    item1 = [item2]
    for i in range(len(linking1) - 2, -1, -1):
        param_name = linking1[i + 1][1]
        kwargs = {f'{param_name}__in': item1}
        item1 = list(linking1[i][0].objects.filter(**kwargs).filter(deleted=False))
    return item1


def find_linking_model(model1, model2, field_name1=None, field_name2=None, visited1=None, visited2=None, path1=None,
                       path2=None):
    if visited1 is None:
        visited1 = set()
    if visited2 is None:
        visited2 = set()
    if path1 is None:
        path1 = []
    if path2 is None:
        path2 = []

    visited1.add((model1, field_name1))
    path1.append((model1, field_name1))

    visited2.add((model2, field_name2))
    path2.append((model2, field_name2))

    if (model1, field_name1) == (model2, field_name2):
        return path1, path2

    fields1 = model1._meta.get_fields()
    fields2 = model2._meta.get_fields()

    for field1 in fields1:
        if isinstance(field1, models_rec.ForeignKey):
            related_model = field1.related_model
            if related_model not in visited1:
                linking_path1, linking_path2 = find_linking_model(related_model, model2, field1.name, field_name2,
                                                                  visited1, visited2, path1, path2)
                if linking_path1:
                    return linking_path1, linking_path2

    for field2 in fields2:
        if isinstance(field2, models_rec.ForeignKey):
            related_model = field2.related_model
            if related_model not in visited2:
                linking_path1, linking_path2 = find_linking_model(model1, related_model, field_name1, field2.name,
                                                                  visited1, visited2, path1, path2)
                if linking_path2:
                    return linking_path1, linking_path2

    visited1.remove((model1, field_name1))
    visited2.remove((model2, field_name2))
    return None


def cut_linking_pass(linking_path):
    result_path = []
    for elem in linking_path:
        if elem not in result_path:
            result_path.append(elem)
    return result_path
