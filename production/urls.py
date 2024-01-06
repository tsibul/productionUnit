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
    path(
        'json_dict_next_20/<str:dict_type>/<int:id_no>/<str:order>/<str:search_string>/<int:show_deleted>/<int:unclosed>',
        views.dictionary_json, name='dictionary_json'),
    path('dictionary_json_filter/<str:dict_type>/<str:filter_dictionary>/<int:filter_dictionary_id>',
         views.dictionary_json_filter, name='dictionary_json_filter'),

    path('production_request/', views.production_request, name='production_request'),
    path('production_request_close/<int:request_id>', views.production_request_close, name='production_request_close'),

    path('production_start/', views.production_start, name='production_start'),
    path('production_stop/', views.production_stop, name='production_stop'),
    path('production_report/', views.production_report, name='production_report'),

    path('production/', views.production, name='production'),
    path('production_list/<int:first_record>/<str:order>/<int:unclosed>/<str:search_string>', views.production_list,
         name='production_list'),
    path('production_acceptance/', views.production_acceptance, name='production_acceptance'),

    path('quality_report/', views.quality_report, name='quality_report'),
    path('quality_list/<str:date_start>/<str:date_end>', views.quality_list, name='quality_list'),
    path('defects_left/<int:quality_report_id>', views.rest_defects_list, name='rest_defects_list'),
    path('quality_report_update/', views.quality_report_update, name='quality_report_update'),

    path('production_admin/', views.production_admin, name='production_admin'),
]
