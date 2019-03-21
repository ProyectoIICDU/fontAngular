import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, first } from 'rxjs/operators';
import { ElementoService } from './elemento.service';
import {ServicioService} from './servicio.service';
import { UsuarioService } from './servicios/usuario.service';
import { environment } from '../environments/environment';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { EspacioDeportivosComponent } from './espacio-deportivos/espacio-deportivos.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'app';
  user='';
  email='';
  aux='';
  admin=false; // variable que indica si se es admin o si se es usuario común
  login='';
  private users: SocialUser;
  private loggedIn: boolean;
  flagValidado: boolean = false; // flag actúa como una bandera para no validar más de una vez
  
  constructor(
    private router: Router,
    private socialAuthService: AuthService, 
    private usuarioService: UsuarioService,
     private _sharedService: ServicioService
  ) {

    this.socialAuthService.authState.subscribe((user) => {
      this.users = user;
        if (this.user!=null) {
        var str = this.users.email; 
        var partir = str.split("@"); 
        //console.log(partir[1])
        this.aux=partir[1]  
      
        if( this.aux=='unicauca.edu.co')
        {

          this.email = this.users.email; 
          this.user = this.users.name.toLocaleUpperCase(); 
          this.login = partir[0];
          console.log("usuario en sesion:" + this.user);
          
        }
      }
      
      this.loggedIn = (user != null);

      if(!this.flagValidado) {
        this.obtenerRol();
      }

    });
      
  }  

  usuario(){   
    this.socialAuthService.authState.subscribe((user) => {
      this.users = user;
          if (this.user!=null) {
        var str = this.users.email; 
        var partir = str.split("@"); 
        //console.log(partir[1])
        this.aux=partir[1]  
      
        if( this.aux=='unicauca.edu.co')
        {

          this.email = this.users.email; 
          this.user = this.users.name.toLocaleUpperCase(); 
          this.login = partir[0];
        }
      }
      
      this.loggedIn = (user != null);
    });
    
    if(!this.flagValidado) {
      this.obtenerRol();
    }

   }

   public signOuts(): void {
    this.socialAuthService.signOut();
    this.router.navigate(['/login']);
  }

  /**
   * Método que realiza una petición al servidor 
   * y valida si el usuario en sesión es administrador
   */
  obtenerRol() {
    console.log("Usuario validado: "+ this.flagValidado + " usuario a validar: " + this.login);
    if (this.login != '') {
      this.flagValidado = true;
      this.usuarioService.validarRolUsuario(this.login).subscribe((esAdmin) => {
        this.admin = esAdmin;
        this.flagValidado = true;
      });
      console.log("Usuario validado: " + this.flagValidado);
    }
  }


}
