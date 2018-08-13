from django.conf.urls import url, include
from rest_framework import routers
from core.views import api

api_router = routers.DefaultRouter()
api_router.register(r'users', api.ProfileViewSet)
api_router.register(r'auth_users', api.AuthUserViewSet)
api_router.register(r'auth_groups', api.AuthUserGroupViewSet)
api_router.register(r'projects', api.ProjectViewSet)
api_router.register(r'models', api.CoreModelViewSet)
api_router.register(r'labels', api.LabelViewSet)
api_router.register(r'data', api.DataViewSet)
api_router.register(r'data_labels', api.DataLabelViewSet)
api_router.register(r'data_predictions', api.DataPredictionViewSet)
api_router.register(r'queue', api.QueueViewSet)
api_router.register(r'assigned_data', api.AssignedDataViewSet)

urlpatterns = [
    url(r'^', include(api_router.urls)),
    url(r'^progressbarupload/', include('progressbarupload.urls')),
    url(r'^get_card_deck/(?P<project_pk>\d+)/$', api.get_card_deck),
    url(r'^get_label_history/(?P<project_pk>\d+)/$', api.get_label_history),
    url(r'^annotate_data/(?P<data_pk>\d+)/$', api.annotate_data),
    url(r'^modify_label/(?P<data_pk>\d+)/$', api.modify_label),
    url(r'^modify_label_to_skip/(?P<data_pk>\d+)/$', api.modify_label_to_skip),
    url(r'^label_skew_label/(?P<data_pk>\d+)/$', api.label_skew_label),
    url(r'^label_admin_label/(?P<data_pk>\d+)/$', api.label_admin_label),
    url(r'^get_irr_metrics/(?P<project_pk>\d+)/$', api.get_irr_metrics),
    url(r'^heat_map_data/(?P<project_pk>\d+)/$', api.heat_map_data),
    url(r'^perc_agree_table/(?P<project_pk>\d+)/$', api.perc_agree_table),
    url(r'^discard_data/(?P<data_pk>\d+)/$', api.discard_data),
    url(r'^restore_data/(?P<data_pk>\d+)/$', api.restore_data),
    url(r'^recycle_bin_table/(?P<project_pk>\d+)/$', api.recycle_bin_table),
    url(r'^skip_data/(?P<data_pk>\d+)/$', api.skip_data),
    url(r'^check_admin_in_progress/(?P<project_pk>\d+)/$', api.check_admin_in_progress),
    url(r'^enter_coding_page/(?P<project_pk>\d+)/$', api.enter_coding_page),
    url(r'^leave_coding_page/(?P<project_pk>\d+)/$', api.leave_coding_page),
    url(r'^download_data/(?P<project_pk>\d+)/$', api.download_data),
    url(r'^download_model/(?P<project_pk>\d+)/$', api.download_model),
    url(r'^label_distribution/(?P<project_pk>\d+)/$', api.label_distribution),
    url(r'^label_distribution_inverted/(?P<project_pk>\d+)/$', api.label_distribution_inverted),
    url(r'^label_timing/(?P<project_pk>\d+)/$', api.label_timing),
    url(r'^data_coded_table/(?P<project_pk>\d+)/$', api.data_coded_table),
    url(r'^data_predicted_table/(?P<project_pk>\d+)/$', api.data_predicted_table),
    url(r'^data_unlabeled_table/(?P<project_pk>\d+)/$', api.data_unlabeled_table),
    url(r'^data_admin_table/(?P<project_pk>\d+)/$', api.data_admin_table),
    url(r'^data_admin_counts/(?P<project_pk>\d+)/$', api.data_admin_counts),
    url(r'^data_change_log_table/(?P<project_pk>\d+)/$', api.data_change_log_table),
    url(r'^model_metrics/(?P<project_pk>\d+)/$', api.model_metrics),
]
