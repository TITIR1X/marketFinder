from django.urls import path
from market.views import  category_search
from market.data_collection.views import load_categories_from_json, CleanDuplicateCategories, get_search_engine_models

urlpatterns = [
    #path('load-categories/', load_categories_from_json, name='load_categories'),
    #path('clean-duplicates/', CleanDuplicateCategories, name='clean_duplicates'),

    path('category/search/', category_search, name='category_search'),
    path('search-engine-models/', get_search_engine_models, name='get_search_engine_models'),
]
