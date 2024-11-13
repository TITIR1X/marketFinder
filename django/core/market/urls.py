from django.urls import path
from market.views import  category_search
from market.data_collection.views import load_categories_from_json, CleanDuplicateCategories

urlpatterns = [
    path('load-categories/', load_categories_from_json, name='load_categories'),
    path('clean-duplicates/', CleanDuplicateCategories, name='clean_duplicates'),

    path('category/search/', category_search, name='category_search'),
]