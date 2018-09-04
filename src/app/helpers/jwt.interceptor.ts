import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
 
/**
* Clase encargada de interceptar las peticiones http hechas al servidor y agregar al header del http el token (JWT - Jason Web Token) del usuario.
*
*/
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser')); // Se obtine la informacion del usuario actual
        if (request.url.indexOf('CRUD_Escenarios') == -1){
            if (currentUser && currentUser.token) { // se valida que el usuario actual exista y ademas que tenga asignado el token
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token}` // Se agrega la autorizacion con el token al header del http
                    }
                });
            }            
        } 
        return next.handle(request);
    }
}