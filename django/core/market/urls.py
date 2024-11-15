from django.urls import path
from market.views import search_engine_mt1, search_engine_mt2, get_search_engine_models
from market.data_collection.views import load_categories_from_json, CleanDuplicateCategories

urlpatterns = [
    #path('market/load-categories/', load_categories_from_json, name='load_categories'),
    #path('market/clean-duplicates/', CleanDuplicateCategories, name='clean_duplicates'),

    path('market/category/MT1/search/', search_engine_mt1, name='search_engine_mt1'),
    path('market/category/MT2/search/', search_engine_mt2, name='search_engine_mt2'),
    path('search-engine-models/', get_search_engine_models, name='get_search_engine_models'),
]