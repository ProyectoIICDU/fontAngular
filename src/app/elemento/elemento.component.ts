import { Component, OnInit } from '@angular/core';
import { Elemento } from '../elemento'; 

import { Deporte } from '../deporte'; 

import { ElementoService } from '../elemento.service';

@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html',
  styleUrls: ['./elemento.component.css']
})
export class ElementoComponent implements OnInit {

  option1 = true;
  option2 = false;
  option3 = false;
  control= false;
  elementoSelected: Elemento; // Objeto donde se almacena el espacio deportivo seleccionado para VER, EDITAR o ELIMINAR
  deporteSelected: Deporte; //
  deportesSelect: Deporte[];
  arraydeportesSelected: Deporte[];
  // Esta variable permite determinar si los inputs del formulario son requeridos o no, en caso de no ser requeridos
  // se establece que son de solo lectura.
  required:boolean = true; 

  // Esta variable permite determinar la accion del formulario, la cual corresponde con la opcion seleccionada por el usuario:
  // Ver, Editar, Elimnar, Registrar
  accion:string = 'Detalle';

  // Esta variable determina el icono a utilizar para el boton enviar (submit) del formulario
  iconBtnSubmit:string = '';

  constructor(private elementoService:ElementoService) { }
  

  ngOnInit() {
    
    
  }
  getEspaciosDeportivos() {
          
  }
  setNuevo() {      
    this.elementoSelected = new Elemento(0, '', '', '',0,'', '',1,'');
    this.accion = 'Registrar'; // se inicializa la accion en Registrar para que el formulario quede configurado para realizar registro de un espacio deportivo
    this.elementoService.getDeportes().subscribe(deportes => this.deportesSelect = deportes);
    this.required = true; // se inicializa en "true" ya que al hacer registros los campos deben ser requeridos
    this.iconBtnSubmit = 'fa fa-save';
  }
  onFilteroption1(ischecked: boolean) {
    this.option1 = true;
    this.option2 = false;
    this.option3 = false;
  }
  onFilteroption2(ischecked: boolean) {
    this.option2 = true;
    this.option1 = false;
    this.option3 = false;

   
  }
  onFilteroption3(ischecked: boolean) {
    this.option2 = false;
    this.option1 = false;
    this.option3 = true;

   
  }
  enviarFormulario(): void {
    
    if (confirm("¿ DESEA " + this.accion.toUpperCase() + " ESTE ELEMENTO DEPORTIVO ?")) {
        switch (this.accion) {
            case "Registrar":
                console.log("REGISTRANDO...");
                if(this.option1==true){this.elementoSelected.tipo="normal";}
                else{if(this.option2==true){this.elementoSelected.tipo="medicinal";}
                else{this.elementoSelected.tipo="uniforme";}}
                this.elementoSelected.deporte = this.deporteSelected.nombre; 
                // Se consume el web service "guardarEspacioDeportivo", el nuevo espacio deportivo es anexado a la lista de esapacios deportivos "espacios".
                this.elementoService.guardarElementoDeportivo(this.elementoSelected); 
                break;
            case "Actualizar":
                console.log("ACTUALIZANDO...");
                // Se consume el web service "actualizarEspacioDeportivo", en caso de ser exito el web service retornara true y se recargara la pagina, en caso contrario mostrara un mensaje de error.
                this.elementoService.actualizarEspacioDeportivo(this.elementoSelected).subscribe(ok => {
                    if (ok) {
                        window.location.reload();
                    } else {
                        alert("SE HA PRESENTADO UN ERROR, POR FAVOR INTENTE NUEVAMENTE.");
                    }
                });
                break;
            case "Eliminar":
                console.log("ELIMINANDO...");
                // Se consume el web service "eliminarEspacioDeportivo", en caso de ser exito el web service retornara true y se recargara la pagina, en caso contrario mostrara un mensaje de error.
                this.elementoService.eliminarEspacioDeportivo(this.elementoSelected.idEspacio).subscribe(ok => {
                    if (ok) {
                        window.location.reload();
                    } else {
                        alert("SE HA PRESENTADO UN ERROR, POR FAVOR INTENTE NUEVAMENTE.");
                    }
                });
                break;
            default:
                break;
        }
//            console.log('save: ' + newEspacio);
    }      
}

}
