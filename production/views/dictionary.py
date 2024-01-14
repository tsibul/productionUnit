import json

from django.db.models import Max
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from production import models

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
    user_groups = user_group_list(request)
    badge_count = badges()

    context = {'navi': navi, 'badge_count': badge_count,
               'user_groups': user_groups, 'admin_state': admin_state}
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
        dict_element = dict_model.objects.get(pk=dict_id)
    else:
        dict_element = dict_model()
    for field in field_list:
        if field in request.POST.keys() and field != 'id' and request.POST[field] != '':
            model_field = dict_model._meta.get_field(field)
            if model_field.get_internal_type() == 'ForeignKey' or model_field.get_internal_type() == 'OneToOneField':
                if request.POST[field] != 'null':
                    setattr(dict_element, field, model_field.related_model.objects.get(pk=request.POST[field]))
            elif model_field.get_internal_type() == 'BooleanField':
                setattr(dict_element, field, False)
                if request.POST[field]:
                    setattr(dict_element, field, request.POST[field])
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
    dict_element = dict_model.objects.get(pk=id_no)
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
    last_id = dict_model.objects.filter(deleted=False).aggregate(Max('pk'))
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
