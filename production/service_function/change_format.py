from datetime import datetime

from production.models import Color


def format_datetime_fields(item):
    """
    Format date field and return hex color if exists
    :param item:
    :return:
    change datetime param fo js, returns hex color if exists
    """
    formatted_item = {}
    item_dict = item.__dict__
    try:
        formatted_item['hex'] = Color.objects.get(id=item.color.id).color_code
    except:
        pass
    for field in item_dict.keys():
        if isinstance(item_dict[field], datetime):
            formatted_item[field] = item_dict[field].strftime('%d.%m.%y %H:%M')
        else:
            if field[0:1] != "_":
                formatted_item[field] = item_dict[field]
                if field[-3:] == "_id":
                    if type(getattr(item, field[0:-3])).__name__ == 'User':
                        formatted_item[field[0:-3]] = getattr(getattr(item, field[0:-3]), 'last_name')
                    else:
                        formatted_item[field[0:-3]] = str(getattr(item, field[0:-3]))
    return formatted_item
