from .models import Category
from django.http import JsonResponse


def match_category(query, category):
    """Compara la consulta con el nombre de la categoría y devuelve un valor de coincidencia basado en la longitud de la coincidencia."""
    query = query.lower()
    category_name = category.name.lower()
    
    # Si la consulta está contenida en el nombre de la categoría, se considera una coincidencia
    if query in category_name:
        return len(query) / len(category_name) * 100  # Puntuación simple: la proporción de coincidencia
    return 0  # No hay coincidencia

def create_category_result(category, score):
    """Crea un diccionario con los detalles de una categoría y su puntuación."""
    return {
        'id': category.id,
        'name': category.name,
        'path_from_root': category.path_from_root,
        'parent': category.parent.id if category.parent else None,
        'score': score,
    }

def group_results_by_path(results):
    """Agrupa los resultados de búsqueda por su 'path_from_root'."""
    grouped_results = {}
    for result in results:
        path = result.get('path_from_root', [])
        
        # Asegúrate de que 'path' sea una lista y conviértelo en un string si es necesario
        if isinstance(path, list):
            path_with_score = [
                {'id': entry['id'], 'name': entry['name'], 'score': result['score']}
                for entry in path
            ]
            path_tuple = tuple((entry['id'], entry['name']) for entry in path)
        
            if path_tuple not in grouped_results:
                grouped_results[path_tuple] = {
                    'path_from_root': path_with_score,
                    'categorie': []
                }
            
            grouped_results[path_tuple]['categorie'].append(result)

    return grouped_results

def build_response(grouped_results):
    """Construye la respuesta JSON con los resultados agrupados."""
    response = {
        'categories_from_root': [
            {
                'path_from_root': entry['path_from_root'],
                'score': entry['path_from_root'][0]['score']
            }
            for entry in grouped_results.values()
        ],
        'categories': [
            {'categorie': entry['categorie']} for entry in grouped_results.values()
        ]
    }
    return response

def category_search(request):
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
