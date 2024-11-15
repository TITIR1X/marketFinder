import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";
import { DynamicHostService } from "../../shared/services/dynamic-host.service";
import { HttpClient } from "@angular/common/http";
import { SearchEngineModel } from "../interfaces/dynamic-search-engine.interface";

@Injectable({
  providedIn: 'root'
})
export class DynamicSearchEngineService {
  selectedSearchEngineModelId: string | undefined = undefined;
  showComponent: boolean = false;
  currentSearchEngine: SearchEngineModel | undefined;

  constructor(
    private http: HttpClient,
    private dynamicHostService: DynamicHostService
  ) {
    this.selectedSearchEngineModelId = localStorage.getItem("selectedSearchEngineModelId") || "";
    this.initSelectedSearchEngineModel();
    this.loadCurrentSearchEngine();
  }

  showContainerComponent() {
    this.showComponent = true;
  }

  hideContainerComponent() {
    this.showComponent = false;
  }

  private loadCurrentSearchEngine(): void {
    if (this.selectedSearchEngineModelId) {
      this.getModelById(this.selectedSearchEngineModelId).subscribe(model => {
        this.currentSearchEngine = model ?? undefined;
      });
    }
  }

  initSelectedSearchEngineModel(modelId?: string): void {
    if (modelId) {
      this.selectedSearchEngineModelId = modelId;
      localStorage.setItem("selectedSearchEngineModelId", modelId);
      this.loadCurrentSearchEngine();
      return;
    }

    // Si no hay ID seleccionado, busca el primero de la lista
    if (!this.selectedSearchEngineModelId) {
      this.getModels().subscribe(response => {
        if (response && response.length > 0) {
          this.selectedSearchEngineModelId = response[0].id;
          localStorage.setItem("selectedSearchEngineModelId", this.selectedSearchEngineModelId);
          this.loadCurrentSearchEngine();
        }
      });
    }
  }

  getModels(): Observable<SearchEngineModel[] | null> {
    const dynamicHost = localStorage.getItem('apiHost') || '';
    if (!dynamicHost) {
      this.dynamicHostService.showContainerComponent();
      return of(null);
    }

    const baseUrl = `${dynamicHost}/search-engine-models/`;
    return this.http.get<SearchEngineModel[] | null>(baseUrl).pipe(
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        return of(null);
      })
    );
  }

  getModelById(modelId: string): Observable<SearchEngineModel | null> {
    return this.getModels().pipe(
      map(response => response?.find(item => item.id === modelId) || null),
      catchError(error => {
        console.error('Error al obtener el modelo por ID:', error);
        return of(null);
      })
    );
  }
}
