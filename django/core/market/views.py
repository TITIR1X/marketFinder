import json
from fuzzywuzzy import fuzz
from .models import Category
from django.views import View
from django.http import JsonResponse
from .utils import (
                    build_response,
                    match_category,
                    fetch_categories,
                    get_search_query,
                    group_results_by_path,
                    create_category_result)


def category_search(request):
    query = get_search_query(request)
    
    if not query:
        return JsonResponse({'results': []})

    categories = fetch_categories()
    results = []

    # Busca coincidencias utilizando fuzzywuzzy
    for category in categories:
        score = match_category(query, category)
        if score >= 55:
            results.append(create_category_result(category, score))
    
    # Ordena los resultados por la puntuación de la coincidencia
    results = sorted(results, key=lambda x: x['score'], reverse=True)

    # Agrupa los resultados por el 'path_from_root'
    grouped_results = group_results_by_path(results)

    # Construye la respuesta
    response = build_response(grouped_results)

    return JsonResponse(response)
