from production import models


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
                foreign_model_objects = foreign_model.objects.all()
                filtered_foreign = filter(lambda obj: compare_objects(obj, search_string), foreign_model_objects)
                field_name = field.name + '__in'
                dict_items = dict_items | filter_items.filter(**{field_name: filtered_foreign})
                print()
    dict_items = dict_items.distinct()[id_no: id_no + 20]
    return dict_items


def compare_objects(obj, search_string):
    return search_string in str(obj)