import { Component, OnInit } from '@angular/core';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
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


export class LoginComponent  {
	model: any = {}; // variable con formato JSON donde se almacena el login y el password digitado por el usuario
    loading = false; 
    returnUrl: string;
    correo=""
    private user: SocialUser;
    private loggedIn: boolean;
    
    constructor(
    
        private route: ActivatedRoute,
        private socialAuthService: AuthService, 
        private router: Router,
        private authenticationService: AutenticacionService,
        private alertService: AlertService) { }
 
        ngOnInit() {
            this.socialAuthService.authState.subscribe((user) => {
              this.user = user;
              this.loggedIn = (user != null);
              this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            });
        }
    iniciarSesion() {
        console.log('Iniciando Sesion');
        this.loading = true;
      
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
        if (this.user!=null) {
            var str = this.user.email; 
            var partir = str.split("@"); 
            console.log(partir[1])
            this.correo=partir[1]    
            console.log(this.user.name);
        }
    }
        redireccionar(){

            this.router.navigate([this.returnUrl]);
            
        }
        
    

}
