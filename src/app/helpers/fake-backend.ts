import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
 
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
 
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
 
        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {
 
            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.login === request.body.login && user.password === request.body.password;
                });
 
                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        idUsuario: user.idUsuario,
                        login: user.login,
                        nombres: user.nombres,
                        apellidos: user.apellidos,
                        rol: user.rol,
                        token: 'fake-jwt-token'
                    };
 
                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return Observable.throw('LOGIN O PASSWORD INCORRECTO');
                }
            }

            // create user
            if (request.url.endsWith('/api/usuarios') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;
 
                // validation
                let duplicateUser = users.filter(user => { return user.login === newUser.login; }).length;
                if (duplicateUser) {
                    return Observable.throw('EL LOGIN "' + newUser.login + '" YA EXISTE');
                }
 
                // save new user
                newUser.idUsuario = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
 
                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }    

            // pass through any requests not handled above
            return next.handle(request);
 
        })
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .materialize()
        .delay(500)
        .dematerialize();
    }
}
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};