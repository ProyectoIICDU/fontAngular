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

  /*
  confirm(nombre : String) {
    this.edicionReservaService.confirmMission(this.Nombre);
  }
  */

 //powers = ['Really Smart', 'Super Flexible','Super Hot', 'Weather Changer'];

 
model = new EdicionReserva('','','','','','','');

submitted = false;

onSubmit() { this.submitted = true; }

// TODO: Remove this when we're done
//get diagnostic() { return JSON.stringify(this.model); }

newReserva() {
this.model = new EdicionReserva('','','','','','','');
}

/*
skyDog(): Hero {
let myHero =  new Hero(42, 'SkyDog',
                'Fetch any object at any distance',
                'Leslie Rollover');
console.log('My hero is called ' + myHero.name); // "My hero is called SkyDog"
return myHero;
}

//////// NOT SHOWN IN DOCS ////////

// Reveal in html:
//   Name via form.controls = {{showFormControls(heroForm)}}
showFormControls(form: any) {
return form && form.controls['name'] &&
form.controls['name'].value; // Dr. IQ
}
*/

/////////////////////////////


}