import json
from market.models import Category
from django.http import JsonResponse

def load_categories_from_json(request, filename='categories.json'):
    """ Carga las categorías desde un archivo JSON y las guarda en la base de datos. """
    # Leer el archivo JSON
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            categories_data = json.load(file)
    except FileNotFoundError:
        return JsonResponse({"error": "El archivo JSON no se encuentra."}, status=404)

    # Función recursiva para guardar categorías y subcategorías
    def save_category(data, parent=None):
        # Comprobar si la categoría tiene el nombre "Otros" o cualquier otro nombre que desees omitir
        if data['name'] == "Otros":
            return  # Omitir la creación de esta categoría
        
        # Verificar si ya existe una categoría con el mismo nombre y mismo padre
        if Category.objects.filter(name=data['name'], parent=parent).exists():
            return  # Si ya existe, omitir la creación de la categoría
        
        # Crear la nueva categoría
        category = Category.objects.create(
            name=data['name'],
            path_from_root=data['path_from_root'],
            parent=parent
        )
        
        # Guardar las subcategorías
        for child_data in data.get('children', []):
            save_category(child_data, parent=category)
    
    # Guardar cada categoría desde el archivo JSON
    for category_data in categories_data:
        save_category(category_data)

    return JsonResponse({"message": "Categorías cargadas exitosamente."})


def CleanDuplicateCategories(request):
    # Obtener todos los nombres de categoría sin duplicados
    unique_names = Category.objects.values_list('name', flat=True).distinct()
    
    for name in unique_names:
        # Obtener todas las categorías con el mismo nombre
        categories_with_same_name = Category.objects.filter(name=name)
        
        # Eliminar todas las categorías excepto una
        categories_with_same_name.exclude(id=categories_with_same_name.first().id).delete()
    
    return JsonResponse({'status': 'success', 'message': 'Duplicates cleaned up successfully'})
