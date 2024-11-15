from django.urls import path
from server_status.views import responseView

urlpatterns = [
    path('response', responseView, name='response_view'),
]
