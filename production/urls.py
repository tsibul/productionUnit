from django.urls import path
from . import views


app_name = 'production'

urlpatterns = [
    path('accounts/login/', views.custom_login, name='custom_login'),
    path('accounts/logout/', views.custom_logout, name='custom_logout'),

    path('', views.index, name='main'),

    path('dictionary/', views.dictionary, name='dictionary'),
    path('dictionary_last_id/<str:dict_type>', views.dictionary_last_id, name='dictionary_last_id'),
    path('dict_update/<str:dict_type>', views.dictionary_update, name='dictionary_update'),
    path('dict_delete/<str:dict_type>/<int:id_no>', views.dictionary_delete, name='dictionary_delete'),
    path('json_dict_next_20/<str:dict_type>/<int:id_no>/<str:order>/<str:search_string>', views.dictionary_json,
         name='dictionary_json'),
    path('user_name/<int:user_id>', views.fetch_user_by_id, name='views.fetch_user_by_id'),

    path('production_request/', views.production_request, name='production_request'),

    path('production_state/<int:in_work>', views.production_state, name='production_state'),
    path('production_start/', views.production_start, name='production_start'),
    path('production_stop/', views.production_stop, name='production_stop'),
    path('production_report/', views.production_report, name='production_report'),

    path('production/', views.production, name='production'),
    path('production_list/<int:first_record>/<str:order>', views.production_list, name='production_list'),
    path('production_acceptance/', views.production_acceptance, name='production_acceptance'),

    path('quality_report/', views.quality_report, name='quality_report'),
    path('quality_list/<str:date_start>/<str:date_end>', views.quality_list, name='quality_list'),

    #
    # path('imports/', views.imports, name='imports'),
    # path('import_file/', views.import_file, name='import_file'),
    # path('edit_temporary_base/', views.edit_temporary_base, name='edit_temporary_base'),
    # path('import_new_customers/', views.customers_new_to_main_db, name='import_new_customers'),
    # path('import_changed_customers/', views.customer_change_to_customer, name='import_changed_customers'),
    # path('reassign_periods/', views.reassign_report_periods, name='reassign_periods'),
    #
    # path('admin/', views.admin, name='admin_site'),
    # path('customer_export/', views.customer_export, name='customer_export'),
    # path('goods_export/', views.goods_export, name='goods_export'),
    # path('customer_group_json/', views.customer_group_json, name='customer_group_json'),

]
