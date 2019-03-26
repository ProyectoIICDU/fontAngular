import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios';
import { Usuario } from '../modelos';

@Component({
  selector: 'app-validarusuarios',
  templateUrl: './validarusuarios.component.html',
  styleUrls: ['./validarusuarios.component.css']
})
export class ValidarusuariosComponent implements OnInit {
  //Se usa el servicio de usuarios para validar los que esten en el sistema y en que estado se encuentran

  usuarios: Usuario[];
  accion:string = 'Activo';
  mensaje:string = 'Activar';
  iconBtnSubmit:string ='fa fa-save';
  usuarioSelected:Usuario;
  index:number=-1;
  

 //------------------------------------------------------------------------------

 constructor(private usuarioService:UsuarioService) { }

 //------------------------------------------------------------------------------
 
     //llamado después del constructor y después del primer ngOnChanges(), 
     //Se utiliza para las inicializaciones de las variables, evitando hacerlas en el constructor.
     ngOnInit() {
         
         this.usuarioSelected = new Usuario(0, '', '', '', '','','','',new Date("0000-00-00"),'',[]);
         this.getUsuariosNoValidados();
         
     }
 
 //------------------------------------------------------------------------------
     //Se usa el servicio para identificar cuales son los usuarios que son validos
     getUsuariosNoValidados() {
        this.usuarioService.getUsuariosNoValidos().subscribe(usuarios => this.usuarios = usuarios);
      
     }


     //Se identifica el usuario y dependiendo de la accion se muestra un mensaje y realiza una accion
    verUsuario(usuario, accion, index) {
      this.accion = accion;
      this.usuarioSelected= usuario;
      console.log(this.usuarioSelected.idUsuario);
      this.index=index;
      switch(accion) {
          case 'Activo':
              this.mensaje = 'Activar'
              this.iconBtnSubmit = 'fa fa-save';
              break;
          case 'Inactivo':
              this.mensaje = 'Desactivar';
              this.iconBtnSubmit = 'fa fa-save';
              break;
         
      }
    }
    //Cambio el estado del usuario de activo a inactivo
    cambiarEstado(){

      switch(this.accion) {
        case 'Activo':
            this.usuarioSelected.estado="Activo";
            const estado=false;
            this.usuarioService.cambiarEstado(this.usuarioSelected).subscribe(estado1 => estado==estado1);
            this.usuarios.splice(this.index,1);
            break;
        case 'Inactivo':
            this.usuarioSelected.estado="Inactivo";
            const estado2=false;
            this.usuarioService.cambiarEstado(this.usuarioSelected).subscribe(estado1 => estado2==estado1);
            this.usuarios.splice(this.index,1); 
             
            break;
       
    }
    }
}
