import { Component, OnInit } from '@angular/core';
import { EspaciosreservadosService, DatosReservas } from '../servicios/espaciosreservados.service';
;

@Component({
  selector: 'app-espacios-reservados',
  templateUrl: './espacios-reservados.component.html',
  styleUrls: ['./espacios-reservados.component.css']
})

export class EspaciosReservadosComponent implements OnInit {

  datos: DatosReservas[] = [];

  constructor(service: EspaciosreservadosService) {
    service.cargarEspaciosReservados()
      .subscribe(x=> this.datos = x);
  }

  ngOnInit(): void {
  }

}