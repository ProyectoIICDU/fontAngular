import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { EdicionReservaService } from '../edicion-reserva.service';
import { Subscription }   from 'rxjs/Subscription';
import { EdicionReserva }    from '../edicion-reserva';

@Component({
  selector: 'app-edicion-reserva',
  templateUrl: './edicion-reserva.component.html',
  styleUrls: ['./edicion-reserva.component.css']

})
export class EdicionReservaComponent implements OnInit {

  @Input() reservas: String;
  HoraI= "---";
  HoraF= "---";
  Nombre= "";
  subscription: Subscription;

  constructor(private edicionReservaService:EdicionReservaService) { 
    this.subscription = edicionReservaService.horaInicio$.subscribe(
      HoraI => {
        this.HoraI = HoraI;
      }
    );
    this.subscription = edicionReservaService.horaFin$.subscribe(
      HoraF => {
        this.HoraF = HoraF;
      }
    );
  }

  ngOnInit() {
  }

  
model = new EdicionReserva('','','','','','','');

submitted = false;

onSubmit() { this.submitted = true; }

// TODO: Remove this when we're done
//get diagnostic() { return JSON.stringify(this.model); }

newReserva() {
this.model = new EdicionReserva('','','','','','','');
}




}