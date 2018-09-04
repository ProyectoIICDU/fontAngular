import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AutenticacionService {
    constructor(private http: HttpClient) { }
 
    login(login: string, password: string) {
        return this.http.post<any>('/api/authenticate', { login: login, password: password })
            .map(usuario => {
                // login successful if there's a jwt token in the response
                if (usuario && usuario.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(usuario));
                }
 
                return usuario;
            });
    }
 
    logout() {
        localStorage.removeItem('currentUser');
    }
}