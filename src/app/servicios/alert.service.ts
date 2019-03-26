import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class AlertService { //Calse usada en la aplicación para gestionar las alertas 
                            //mostradas para distintas acciones que se van a mostrar
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;
 
    constructor(private router: Router) {
        // borra los mensajes de alerta al cambiar de ruta a menos que el indicador 'keepAfterRouteChange' sea verdadero
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // Se mantiene para un solo cambio de ruta
                    this.keepAfterNavigationChange = false;
                } else {
                    // borrar mensajes de alerta
                    this.subject.next();
                }
            }
        });
    }
    
    //método para mensajes de éxito, recibe el mensaje y un boolean para saber si se activa o no
    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next();
        this.subject.next({ type: 'success', text: message });
    }
    //método para mensajes de fallo, recibe el mensaje a mostrar y un boolena para saber si se activa o no
    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next();
        
        this.subject.next({ type: 'error', text: message });
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    
}