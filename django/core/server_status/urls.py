from django.urls import path
from market.views import  category_search
from server_status.views import responseView

urlpatterns = [
    path('response', responseView, name='category_search'),
]
