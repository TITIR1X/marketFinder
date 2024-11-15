import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, startWith, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DynamicHostService {

    dynamicHost: string = ''
    showComponent: boolean = false;

    showContainerComponent() {
        this.showComponent = !this.showComponent;
    }

    hideContainerComponent() {
        this.showComponent = false;
    }


    constructor(private http: HttpClient) { }

    setNewHost(host: string) {
        let cleanedHost = host.split('/').slice(0, 3).join('/');
        this.dynamicHost = cleanedHost;
        localStorage.setItem('apiHost', this.dynamicHost);
    }


    getHost(): Observable<string> {
        const host = localStorage.getItem('apiHost') || '';  // Default to empty string if no host is found
        return this.checkDynamicHost(host).pipe(
            switchMap(status => {
                if (status !== 'operational') {
                    this.showContainerComponent();  // If not operational, show the component
                }
                return of(status);  // Return the status so it can be used elsewhere if needed
            })
        );
    }

    
    checkDynamicHost(host: string): Observable<string> {
        let baseUrl = `${host}`;
        let cleanedHost = baseUrl.split('/').slice(0, 3).join('/');

        if (host.length === 0) {
            return of('waiting');
        }

        return of('connecting').pipe(   // Emitir 'connecting' primero
            startWith('connecting'),    // Estado inicial: "conectando"
            switchMap(() => this.http.get<{ status: number, codeToMatch: string }>(`${cleanedHost}/response`, { responseType: 'json' }).pipe(
                map((response) => {
                    // Verificar si el status es 200 y codeToMatch es "018352"
                    if (response.status === 200 && response.codeToMatch === "018352") {
                        return 'operational';
                    }
                    return 'error'; // En cualquier otro caso, retornar "error"
                }),
                catchError((error: HttpErrorResponse) => {
                    return of('error'); // Retorna "error" en caso de error
                })
            ))
        );
    }



}