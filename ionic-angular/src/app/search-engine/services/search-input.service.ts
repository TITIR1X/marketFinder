import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CategoryResponse } from '../interfaces/search-result.interface';
import { DynamicHostService } from '../../shared/services/dynamic-host.service';
import { DynamicSearchEngineService } from './dynamic-search-engine.service';

@Injectable({
  providedIn: 'root'
})
export class SearchInputService {

  private storedData: CategoryResponse | null = null;
  // private storedData: CategoryResponse | null = { "categories_from_root": [{ "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos", "score": 92 }, { "id": "MLA1747", "name": "Repuestos Autos y Camionetas", "score": 92 }, { "id": "MLA373359", "name": "Carrocer\u00eda", "score": 92 }, { "id": "MLA430257", "name": "Manijas", "score": 92 }], "score": 92 }, { "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos", "score": 63 }, { "id": "MLA6520", "name": "Accesorios de Auto y Camioneta", "score": 63 }, { "id": "MLA86014", "name": "Accesorios de Exterior", "score": 63 }, { "id": "MLA373364", "name": "Embellecedores", "score": 63 }, { "id": "MLA431761", "name": "Cubre Manijas", "score": 63 }], "score": 63 }, { "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos", "score": 63 }, { "id": "MLA1747", "name": "Repuestos Autos y Camionetas", "score": 63 }, { "id": "MLA373359", "name": "Carrocer\u00eda", "score": 63 }, { "id": "MLA430257", "name": "Manijas", "score": 63 }, { "id": "MLA430258", "name": "Otras Manijas", "score": 63 }], "score": 63 }, { "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos", "score": 57 }, { "id": "MLA2227", "name": "Herramientas para Veh\u00edculos", "score": 57 }, { "id": "MLA412409", "name": "Malacates", "score": 57 }, { "id": "MLA417115", "name": "Manuales", "score": 57 }], "score": 57 }, { "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos", "score": 57 }, { "id": "MLA419936", "name": "Repuestos de L\u00ednea Pesada", "score": 57 }, { "id": "MLA437918", "name": "Frenos", "score": 57 }, { "id": "MLA437921", "name": "Campanas", "score": 57 }], "score": 57 }, { "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos", "score": 55 }, { "id": "MLA2227", "name": "Herramientas para Veh\u00edculos", "score": 55 }, { "id": "MLA60657", "name": "Llaves", "score": 55 }, { "id": "MLA437804", "name": "Fijas", "score": 55 }], "score": 55 }, { "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos", "score": 55 }, { "id": "MLA8531", "name": "Navegadores GPS para Veh\u00edculos", "score": 55 }, { "id": "MLA85803", "name": "Mapas", "score": 55 }], "score": 55 }, { "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos", "score": 55 }, { "id": "MLA402999", "name": "Performance", "score": 55 }, { "id": "MLA437380", "name": "Transmisi\u00f3n", "score": 55 }, { "id": "MLA437382", "name": "Cajas", "score": 55 }], "score": 55 }, { "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos", "score": 55 }, { "id": "MLA1747", "name": "Repuestos Autos y Camionetas", "score": 55 }, { "id": "MLA373144", "name": "Repuestos de Habit\u00e1culo", "score": 55 }, { "id": "MLA433573", "name": "Manijas de Capot", "score": 55 }], "score": 55 }], "categories": [{ "categorie": [{ "id": 1275, "name": "Manijas", "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos" }, { "id": "MLA1747", "name": "Repuestos Autos y Camionetas" }, { "id": "MLA373359", "name": "Carrocer\u00eda" }, { "id": "MLA430257", "name": "Manijas" }], "parent": null, "score": 92 }] }, { "categorie": [{ "id": 429, "name": "Cubre Manijas", "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos" }, { "id": "MLA6520", "name": "Accesorios de Auto y Camioneta" }, { "id": "MLA86014", "name": "Accesorios de Exterior" }, { "id": "MLA373364", "name": "Embellecedores" }, { "id": "MLA431761", "name": "Cubre Manijas" }], "parent": null, "score": 63 }] }, { "categorie": [{ "id": 1274, "name": "Otras Manijas", "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos" }, { "id": "MLA1747", "name": "Repuestos Autos y Camionetas" }, { "id": "MLA373359", "name": "Carrocer\u00eda" }, { "id": "MLA430257", "name": "Manijas" }, { "id": "MLA430258", "name": "Otras Manijas" }], "parent": null, "score": 63 }] }, { "categorie": [{ "id": 903, "name": "Manuales", "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos" }, { "id": "MLA2227", "name": "Herramientas para Veh\u00edculos" }, { "id": "MLA412409", "name": "Malacates" }, { "id": "MLA417115", "name": "Manuales" }], "parent": null, "score": 57 }] }, { "categorie": [{ "id": 3027, "name": "Campanas", "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos" }, { "id": "MLA419936", "name": "Repuestos de L\u00ednea Pesada" }, { "id": "MLA437918", "name": "Frenos" }, { "id": "MLA437921", "name": "Campanas" }], "parent": null, "score": 57 }] }, { "categorie": [{ "id": 890, "name": "Fijas", "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos" }, { "id": "MLA2227", "name": "Herramientas para Veh\u00edculos" }, { "id": "MLA60657", "name": "Llaves" }, { "id": "MLA437804", "name": "Fijas" }], "parent": null, "score": 55 }] }, { "categorie": [{ "id": 1083, "name": "Mapas", "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos" }, { "id": "MLA8531", "name": "Navegadores GPS para Veh\u00edculos" }, { "id": "MLA85803", "name": "Mapas" }], "parent": null, "score": 55 }] }, { "categorie": [{ "id": 1204, "name": "Cajas", "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos" }, { "id": "MLA402999", "name": "Performance" }, { "id": "MLA437380", "name": "Transmisi\u00f3n" }, { "id": "MLA437382", "name": "Cajas" }], "parent": null, "score": 55 }] }, { "categorie": [{ "id": 1834, "name": "Manijas de Capot", "path_from_root": [{ "id": "MLA5725", "name": "Accesorios para Veh\u00edculos" }, { "id": "MLA1747", "name": "Repuestos Autos y Camionetas" }, { "id": "MLA373144", "name": "Repuestos de Habit\u00e1culo" }, { "id": "MLA433573", "name": "Manijas de Capot" }], "parent": null, "score": 55 }] }] }; // Almacena la última respuesta

  constructor(
    private http: HttpClient,
    private dynamicHostService: DynamicHostService,
    private dynamicSearchEngineService: DynamicSearchEngineService
  ) { }

  // Realiza la búsqueda y almacena el resultado
  searchCategory(query: string, searchEngineModel?: string): Observable<CategoryResponse> {
    const dynamicHost = localStorage.getItem('apiHost') || '';
    if (!dynamicHost) {
      this.dynamicHostService.showContainerComponent();
    }

    const baseUrl = `${dynamicHost}/market/category/${this.dynamicSearchEngineService.selectedSearchEngineModelId}/search/`;
    const queryString = query.replace(/\s+/g, '+'); // Reemplaza espacios por '+'
    return this.http.get<CategoryResponse>(`${baseUrl}?query=${queryString}`).pipe(
      tap(response => this.storedData = response) // Almacena la respuesta en storedData
    );
  }

  // Devuelve los datos almacenados, si existen
  getStoredData(): CategoryResponse | null {
    return this.storedData;
  }
}