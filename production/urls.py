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
    path('dictionary_json_filter/<str:dict_type>/<str:filter_dictionary>/<int:filter_dictionary_id>',
         views.dictionary_json_filter, name='dictionary_json_filter'),
    path('dict_name/<str:dict_type>/<int:dict_id>', views.fetch_dict_str_by_id, name='fetch_dict_str_by_id'),

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
    path('defects_left/<int:quality_report_id>', views.rest_defects_list, name='rest_defects_list'),
    path('quality_report_update/', views.quality_report_update, name='quality_report_update'),

    path('production_admin/', views.production_admin, name='production_admin'),
]
