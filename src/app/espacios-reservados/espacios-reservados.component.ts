import { Component, OnInit } from '@angular/core';
import { EspaciosreservadosService, datosReservas } from '../servicios/espaciosreservados.service';
;

@Component({
  selector: 'app-espacios-reservados',
  templateUrl: './espacios-reservados.component.html',
  styleUrls: ['./espacios-reservados.component.css']
})

export class EspaciosReservadosComponent implements OnInit {

  data: datosReservas[];

  constructor(private espaciosreservadosService: EspaciosreservadosService) { }

  ngOnInit(): void {
    this.getEspaciosReservados();
  }

  getEspaciosReservados(): void {
    this.data = this.espaciosreservadosService.cargarEspaciosReservados();
    console.log('this.datos=' + this.data);
    console.log('this.datos.length=' + this.data.length);
    console.log('this.datos[0].usuario=' + this.data[0].usuario);
  }

}
