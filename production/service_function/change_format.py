from datetime import datetime

from production.models import Color


def format_datetime_fields(item):
    """
    Format date field and return hex color if exists
    :param item:
    :return:
    change datetime param fo js, returns hex color if exists
    """
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
