import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class FreRequestService {

    constructor(private http: HttpClient) {}


    public addPerson(obj: any): Observable<any> {
        return this.http.post<any>(`${environment.apiURL}addPerson`, obj);
    }

    public uptPerson(obj: any, id: number): Observable<any> {
        const obc = {
            obj,
            id
        };

        return this.http.post<any>(`${environment.apiURL}uptPerson`, obc);
    }

    public getPerson(): Observable<any> {
        return this.http.get<any>(`${environment.apiURL}getPerson`);
    }

    public delPerson(id: any): Observable<any> {
        return this.http.post<any>(`${environment.apiURL}delPerson`, id);
    }
}
