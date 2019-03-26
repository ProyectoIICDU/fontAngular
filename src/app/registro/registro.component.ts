import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { AlertService, UsuarioService } from '../servicios/index';
 
@Component({
    moduleId: module.id,
    templateUrl: 'registro.component.html'
})
 
export class RegistroComponent {
    model: any = {};
    loading = false;
 
    constructor(
        private router: Router,
        private userService: UsuarioService,
        private alertService: AlertService) { }
 
    /**
     * Método para realizar un registro en la aplicacion usando fake-login
     */
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('USUARIO REGISTRADO EXITOSAMENTE', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}