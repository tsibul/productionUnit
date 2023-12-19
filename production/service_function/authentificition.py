def user_group_list(request):
    """ return list of user groups for current user \n
    :param request:
    :return: list of user groups for current user as a string
    """
    groups = request.user.groups.values_list('name', flat=True)
    user_groups = ', '.join(groups) if groups else ''
    return user_groups


def if_admin(request):
    return request.user.groups.filter(name='admin').exists()

