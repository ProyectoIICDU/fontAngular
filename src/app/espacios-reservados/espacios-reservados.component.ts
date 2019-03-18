import { Component, OnInit } from '@angular/core';
import { ReservaUsuario } from '../reservausuario';
import { EspaciosreservadosService} from '../espaciosreservados.service';
import { SocialUser } from "angularx-social-login";
import { AuthService } from "angularx-social-login";

@Component({
  selector: 'app-espacios-reservados',
  templateUrl: './espacios-reservados.component.html',
  styleUrls: ['./espacios-reservados.component.css']
})

export class EspaciosReservadosComponent implements OnInit {

  reservados: ReservaUsuario[];
  user=''
  email=''
  aux=''
  private users: SocialUser;
  private loggedIn: boolean;
  constructor(private espacioReservas:EspaciosreservadosService,private socialAuthService: AuthService) { 
    

  }

 ngOnInit(): void {
  
  this.getEspaciosReservados();
  

  }

  getEspaciosReservados() {
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
          this.user = this.users.name; 
          this.espacioReservas.cargarEspaciosReservados(this.email.split("@")[0]).subscribe(reservados => this.reservados = reservados);       
          this.reservados=[];
        }
      }
      
      this.loggedIn = (user != null);
      });
      
    //ME TOCA OBTENER EL USUARIO PARA ENVIARLO EN EL PARAMETRO
    
  }


 
}