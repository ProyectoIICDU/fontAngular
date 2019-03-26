import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AutenticacionService {
    constructor(private http: HttpClient) { }
    //Este servicio tiene el método para verificar si hay una sesión iniciada 
    login(login: string, password: string) {
        return this.http.post<any>('/api/authenticate', { login: login, password: password })
            .map(usuario => {
                // Inicio de sesión exitoso si hay un token jwt en la respuesta
                if (usuario && usuario.token) {
                    // Almacena los detalles del usuario y el token jwt en el 
                    //almacenamiento local para mantener al usuario conectado
                    //entre las actualizaciones de página
                    localStorage.setItem('currentUser', JSON.stringify(usuario));
                }
 
                return usuario;
            });
    }
 
    logout() {
        localStorage.removeItem('currentUser');
    }
}