import json
from datetime import date
# from fuzzywuzzy import fuzz
from .models import Category
from django.db.models import Q
from django.views import View
from django.http import JsonResponse
from market.utils import match_category, create_category_result, group_results_by_path, build_response


def search_engine_mt1(request):
    """Vista que maneja la búsqueda de categorías según la consulta dada."""
    query = request.GET.get('query', '').strip()
    
    if not query:
        return JsonResponse({'results': []})

    categories = Category.objects.all()
    results = []

    # Busca coincidencias utilizando una comparación simple
    for category in categories:
        score = match_category(query, category)
        if score >= 55:  # Solo agregar categorías con una puntuación suficientemente alta
            results.append(create_category_result(category, score))
    
    # Agrupa los resultados por el 'path_from_root'
    grouped_results = group_results_by_path(results)

    # Construye la respuesta
    response = build_response(grouped_results)

    return JsonResponse(response)



# def search_engine_mt2(request):
#     query = request.GET.get('query', '').strip()
    
#     if not query:
#         return JsonResponse({'results': []})

#     categories = Category.objects.all()
#     results = []

#     # Busca coincidencias utilizando fuzzywuzzy
#     for category in categories:
#         score = fuzz.ratio(query.lower(), category.name.lower())
#         if score >= 55:
#             results.append({
#                 'id': category.id,
#                 'name': category.name,
#                 'path_from_root': category.path_from_root,
#                 'parent': category.parent.id if category.parent else None,
#                 'score': score,
#             })
    
#     # Ordena los resultados por la puntuación de la coincidencia
#     results = sorted(results, key=lambda x: x['score'], reverse=True)

#     # Agrupa los resultados por el 'path_from_root'
#     grouped_results = {}
#     for result in results:
#         path_with_score = [
#             {'id': entry['id'], 'name': entry['name'], 'score': result['score']}
#             for entry in result['path_from_root']
#         ]
        
#         path_tuple = tuple((entry['id'], entry['name']) for entry in result['path_from_root'])
#         if path_tuple not in grouped_results:
#             grouped_results[path_tuple] = {
#                 'path_from_root': path_with_score,
#                 'categorie': []
#             }
        
#         grouped_results[path_tuple]['categorie'].append(result)

#     # Construye la respuesta
#     response = {
#         'categories_from_root': [
#             {
#                 'path_from_root': entry['path_from_root'],
#                 'score': entry['path_from_root'][0]['score']
#             }
#             for entry in grouped_results.values()
#         ],
#         'categories': [
#             {'categorie': entry['categorie']} for entry in grouped_results.values()
#         ]
#     }

#     return JsonResponse(response)

def get_search_engine_models(request):
    models = [
        {
            'id': 'MT1',
            'version': '1.0',
            'name': 'Modelo T1',
            'description': 'Búsqueda de categorías con filtro utilizando la librería Q de Django',
        },
        {
            'id': 'MT2',
            'version': '2.0',
            'name': 'Modelo T2',
            'description': 'Búsqueda avanzada de categorías utilizando la librería fuzzywuzzy para coincidencias más precisas',
        },
    ]
    
    return JsonResponse(models, safe=False)