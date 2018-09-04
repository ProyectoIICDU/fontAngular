import { Component, OnInit } from '@angular/core';
import { AlertService } from '../servicios/index';
 
@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})
 
/**
* Clase para instanciar objetos tipo AlertService.
*
* Permite mostrar mensajes de alerta al usuario
*
*/
export class AlertComponent {
    message: any;
 
    constructor(private alertService: AlertService) { }
 
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}