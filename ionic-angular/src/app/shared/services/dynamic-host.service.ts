import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, startWith, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DynamicHostService {

    showComponent: boolean = false;

    showContainerComponent() {
        this.showComponent = !this.showComponent;
    }

    hideContainerComponent() {
        this.showComponent = false;
    }

    dynamicHost: string = 'https://example.ngrok-free.app/'

    constructor(private http: HttpClient) { }

    setNewHost(host: string) {
        if (host.endsWith('/')) {
            this.dynamicHost = host.slice(0, -1);
        } else {
            this.dynamicHost = host;
        }
        localStorage.setItem('apiHost', this.dynamicHost);
    }

    getHost() {
        return localStorage.getItem('apiHost')
    }

    checkDynamicHost(host: string): Observable<string> {
        const baseUrl = `${host}`;
        if (host.length === 0) {
            return of('waiting');
        }
        return of('connecting').pipe(   // Emitir 'connecting' primero
            startWith('connecting'),    // Estado inicial: "conectando"
            switchMap(() => this.http.get(baseUrl, { responseType: 'text' }).pipe(
                map(() => 'operational'),   // Si hay respuesta, retorna "operational"
                catchError((error: HttpErrorResponse) => {
                    return of('error');     // Retorna "error" en caso de error
                })
            ))
        );
    }


}