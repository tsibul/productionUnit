def user_group_list(request):
    groups = request.user.groups.values_list('name', flat=True)
    user_groups = ', '.join(groups) if groups else ''
    return user_groups
