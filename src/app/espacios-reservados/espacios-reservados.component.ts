import { Component, OnInit } from '@angular/core';
import { ReservaEspacio } from '../reservaespacio';
import { EspaciosreservadosService} from '../espaciosreservados.service';

@Component({
  selector: 'app-espacios-reservados',
  templateUrl: './espacios-reservados.component.html',
  styleUrls: ['./espacios-reservados.component.css']
})

export class EspaciosReservadosComponent implements OnInit {

  reservados: ReservaEspacio[];

  constructor(private espacioReservas:EspaciosreservadosService) { }

 ngOnInit(): void {
  this.getEspaciosReservados();

  }

    getEspaciosReservados() {
        this.espacioReservas.cargarEspaciosReservados().subscribe(reservados => this.reservados = reservados);       
    }


 
}