import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 



/**
* Clase de autenticacion de la sesion.
*
* Verifica que la sesion de usuario este activa, en caso de estarlo retorna "true", en caso contrario "false"
*
*/
@Injectable()
export class Autenticacion implements CanActivate {
 
    constructor(private router: Router) { }
    /**
    * Metodo que  Verifica que el usuario se encuentre activo
    *
    */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) { // Verifica que el usuario se encuentre activo
            return true;
        }        
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }}); // El usuario no esta activo por lo tanto se redirecciona a la pagina de login
        return false;
    }
}