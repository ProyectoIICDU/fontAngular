import { Component, OnInit } from '@angular/core';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router, ActivatedRoute } from '@angular/router';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Importacion para instanciar objetos tipo EspaciodeportivoService.
*
* Permite la conexion con los web services implementados en el lado servidor
*
*/
import { AlertService, AutenticacionService } from '../servicios/index';

//************************************************************************************************************************************************************

/**
* Este componente permite gestionar el inicio de sesion de usuario
*
*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
	model: any = {}; // variable con formato JSON donde se almacena el login y el password digitado por el usuario
    loading = false; 
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AutenticacionService,
        private alertService: AlertService) { }
 
    ngOnInit() {
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
    iniciarSesion() {
        console.log('Iniciando Sesion');
        this.loading = true;
        this.authenticationService.login(this.model.login, this.model.password) // llamado al metodo login del servicio de autenticacion "authenticationService"
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]); // si el login es exitoso lo redirecciona a la pagina principal o de inicio
                },
                error => {
                    this.alertService.error(error); // se muestra una alerta al usuario con el mensaje de error proveniente del metodo login del servicio de autenticacion
                    this.loading = false;
                    console.log("LOGIN O PASSWORD INCORRECTOS");
                });
    }

}
