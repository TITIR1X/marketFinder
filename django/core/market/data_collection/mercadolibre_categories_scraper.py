import requests
import json
import time

MERCADOLIBRE_CATEGORIES_URL = "https://api.mercadolibre.com/sites/MLA/categories"

def append_category_to_file(category_info, filename="categories.json"):
    """ Guarda una categoría y sus subcategorías en el archivo JSON sin duplicados por nombre. """
    try:
        with open(filename, 'r+', encoding='utf-8') as file:
            try:
                data = json.load(file)
            except json.JSONDecodeError:
                data = []
            
            # Verificamos si ya existe una categoría con el mismo nombre
            if not any(cat['name'] == category_info['name'] for cat in data):
                data.append(category_info)
                file.seek(0)
                json.dump(data, file, ensure_ascii=False, indent=4)
            # else:
                # print(f"Categoría '{category_info['name']}' ya existe. No se agrega.")

    except FileNotFoundError:
        with open(filename, 'w', encoding='utf-8') as file:
            json.dump([category_info], file, ensure_ascii=False, indent=4)

def fetch_category_details(category_id, retries=5):
    """ Intenta obtener los detalles de una categoría con reintentos en caso de error. """
    url = f"https://api.mercadolibre.com/categories/{category_id}"
    attempt = 0
    
    while attempt < retries:
        try:
            response = requests.get(url)
            response.raise_for_status()  # Lanza una excepción si el código de estado es 4xx o 5xx
            data = response.json()
            category_info = {
                'id': data['id'],
                'name': data['name'],
                'path_from_root': data['path_from_root'],  # Incluye el path_from_root
                'children': []
            }
            
            # Si hay subcategorías, llamamos recursivamente para obtenerlas
            if 'children_categories' in data:
                for child in data['children_categories']:
                    child_info = fetch_category_details(child['id'])
                    category_info['children'].append(child_info)
            
            append_category_to_file(category_info)
                    
            return category_info
        except (requests.exceptions.RequestException, requests.exceptions.ConnectionError) as e:
            print(f"Error al obtener la categoría {category_id}: {e}. Reintentando...")
            time.sleep(60)
            attempt += 1
    print(f"Error persistente al intentar obtener la categoría {category_id}. Se han agotado los intentos.")
    return None

def fetch_categories(url):
    """ Obtiene las categorías principales y llama a `fetch_category_details` para obtener detalles de cada una. """
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        for category in data:
            category_info = fetch_category_details(category['id'])
            if category_info:
                append_category_to_file(category_info)

def get_all_categories():
    """ Función principal que obtiene todas las categorías y subcategorías, incluyendo el path_from_root. """
    fetch_categories(MERCADOLIBRE_CATEGORIES_URL)

get_all_categories()
