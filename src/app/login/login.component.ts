/**
 * Importacion servicios de angular
 */
import { Component, OnInit , EventEmitter, Input, Output} from '@angular/core';

/**
 * Importacion de servicio de enrutador
 */
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Importacion de Servicios necesarios para la autenticación con Google
 */
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {ServicioService} from '../servicio.service';

/**
* Importacion para instanciar objetos tipo EspaciodeportivoService.
* Permite la conexion con los web services implementados en el lado servidor
*
*/
import { AlertService, AutenticacionService,UsuarioService } from '../servicios/index';


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
    loading = false;  // bandera para saber si se está cargando o no
    returnUrl: string; // url de retorno
    correo=""; // correo del usuario en sesión
    private user: SocialUser; // usuario que está en sesión en el sistema
    private loggedIn: boolean; // flag para saber si hay un usuario logueado o no
     
    constructor(
        private _sharedService: ServicioService,
        private route: ActivatedRoute,
        private socialAuthService: AuthService, 
        private router: Router,
        private authenticationService: AutenticacionService,
        private alertService: AlertService,
        private service: UsuarioService) { }
 
    /**
     * Método que se activa al cargar el módulo
     */
    ngOnInit() {
        this.socialAuthService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            
        });
    }

    /**
     * Método que se usa para iniciar la sesion haciendo uso de los servicios
     * de angular-social-login
     */
    iniciarSesion() {
        console.log('Iniciando Sesion');
        this.loading = true;
        
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
        console.log('PASO');
        this.socialAuthService.authState.subscribe((user) => {
            this.user = user;
            if (this.user!=null) {
            
                var str = this.user.email; 
                var partir = str.split("@"); 
                console.log(partir[1])
                this.correo=partir[1]  
                if(this.correo!='unicauca.edu.co')
                {

                    this.signOut();
                }
                console.log(this.user.name);
                
            }
            
            this.loggedIn = (user != null);
            });
      
    }

    /**
     * Método que redirecciona al sistema 
     */
    redireccionar(){
        
        this.router.navigate([this.returnUrl]);
        this._sharedService.emitChange(this.user.name+'/'+this.user.email);
    }
    
    /**
     * Método que provee la libreria angular-social-login 
     * para hacer un cierre de sesión
     */    
    signOut(): void {
        this.socialAuthService.signOut();
    }

}
