from datetime import datetime

from production.models import Color


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