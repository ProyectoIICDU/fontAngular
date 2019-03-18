import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ElementoService } from './elemento.service';
import {ServicioService} from './servicio.service';
import { environment } from '../environments/environment';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'app';
  user=''
  email=''
  aux=''
  private users: SocialUser;
  private loggedIn: boolean;
  
  constructor(
    private router: Router,
    private socialAuthService: AuthService, 
     private _sharedService: ServicioService
  ) {

    this.socialAuthService.authState.subscribe((user) => {
      this.users = user;
        if (this.user!=null) {
        var str = this.users.email; 
        var partir = str.split("@"); 
        console.log(partir[1])
        this.aux=partir[1]  
      
        if( this.aux=='unicauca.edu.co')
        {

          this.email = this.users.email; 
          this.user = this.users.name.toLocaleUpperCase(); 
          console.log(this.user+" este es")
        }
      }
      
      this.loggedIn = (user != null);
      });

  }  

  usuario(){   
    this.socialAuthService.authState.subscribe((user) => {
      this.users = user;
          if (this.user!=null) {
        var str = this.users.email; 
        var partir = str.split("@"); 
        console.log(partir[1])
        this.aux=partir[1]  
      
        if( this.aux=='unicauca.edu.co')
        {

          this.email = this.users.email; 
          this.user = this.users.name.toLocaleUpperCase(); 
        }
      }
      
      this.loggedIn = (user != null);
      });
    
   }
   public signOuts(): void {
    this.socialAuthService.signOut();
    this.router.navigate(['/login']);
  }


}
