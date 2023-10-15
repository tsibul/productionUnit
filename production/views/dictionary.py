import json
from datetime import timedelta, date

from django.core.serializers import serialize
from django.db.models import Max
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from production import models
from production.models import (ColorScheme, Color, Goods, DetailName, DetailInGoods, MainMaterial, AddMaterial,
                               MaterialType, MasterBatch, Country, Producer, Recipe, IMM)


def dictionary(request):
    navi = 'dictionary'
    color_group = ColorScheme.objects.filter(deleted=False).order_by('scheme_name')
    color = Color.objects.filter(deleted=False).order_by('color_scheme', 'color_id')[0:19]
    color_end = Color.objects.filter(deleted=False).order_by('color_scheme', 'color_id')[19:20]
    country = Country.objects.filter(deleted=False).order_by('name')
    producer = Producer.objects.filter(deleted=False).order_by('name')
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
    context = {'navi': navi, 'color_group': color_group, 'country': country, 'producer': producer, 'detail': detail,
               'color': color, 'detail_in_goods': detail_in_goods, 'detail_in_goods_end': detail_in_goods_end,
               'color_end': color_end, 'material_type': material_type, 'masterbatch': masterbatch,
               'main_material': main_material,
               'main_material_end': main_material_end,
               'goods': goods, 'add_material': add_material,
               'add_material_end': add_material_end, 'imm': imm,
               'recipe': recipe, 'recipe_end': recipe_end}
    return render(request, 'dictionary.html', context)


@csrf_exempt
def dictionary_update(request, dict_type):
    dict_id = request.POST['id']
    dict_model = getattr(models, dict_type)
    field_list = [f.name for f in dict_model._meta.get_fields()]
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
    dict_element.save()
    return HttpResponse()


def dictionary_json(request, dict_type, id_no, order, search_string):
    dict_items = dict_additional_filter(dict_type, order, id_no, search_string)
    json_dict = serialize('python', dict_items)
    json_dict = json.dumps(json_dict, ensure_ascii=False, default=str)
    return JsonResponse(json_dict, safe=False)


def dict_additional_filter(dict_type, order, id_no, search_string):  # костыль
    border_date = date.today() - timedelta(days=1100)
    dict_model = getattr(models, dict_type)
    if order == 'default':
        order = dict_model.order_default()
    if search_string == 'default':
        dict_items = dict_model.objects.filter(deleted=False).order_by(*order)
    else:
        search_string = search_string.replace('_', ' ')
        filter_items = dict_model.objects.filter(deleted=False).order_by(*order)
        dict_items = filter_items.filter(id=0)
        for field in dict_model._meta.get_fields():
            if field.get_internal_type() == 'CharField':
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


# def customer_group_json(request):
#     customer_groups = CustomerGroups.objects.filter(deleted=False).order_by('group_name')
#     json_dict = serialize('python', customer_groups)
#     json_dict = json.dumps(json_dict, ensure_ascii=False, default=str)
#     return JsonResponse(json_dict, safe=False)


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
