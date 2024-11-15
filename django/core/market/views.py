import json
from .models import Category
from django.db.models import Q
from django.views import View
from django.http import JsonResponse
from market.utils import match_category, create_category_result, group_results_by_path, build_response


def category_search(request):
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