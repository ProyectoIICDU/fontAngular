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

  option1 = false;
  option2 = false;
  option3 = false;
  control= false;
  espacios: Elemento[]; // En este array se almacenan los espacios deportivos registrados en la BD.
  espacioSelected: Elemento; // Objeto donde se almacena el espacio deportivo seleccionado para VER, EDITAR o ELIMINAR
  deporteSelected: String; //

   // Esta variable permite determinar si los inputs del formulario son requeridos o no, en caso de no ser requeridos
    // se establece que son de solo lectura.
    required:boolean = true; 

    // Esta variable permite determinar la accion del formulario, la cual corresponde con la opcion seleccionada por el usuario:
    // Ver, Editar, Elimnar, Registrar
    accion:string = 'Detalle';

    // Esta variable determina el icono a utilizar para el boton enviar (submit) del formulario
    iconBtnSubmit:string = '';

    constructor() { }

  ngOnInit() {
    
    
  }
  getEspaciosDeportivos() {
          
}
  setNuevo() {      
    this.espacioSelected = new Elemento(0, '', '', '',[],[], '');
    this.accion = 'Registrar'; // se inicializa la accion en Registrar para que el formulario quede configurado para realizar registro de un espacio deportivo
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
}
