import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EdicionReservaService {//Servicio en construccion para poder editar la hora 
  //en la que se tiene asignada una hora por otra. Se debe mejorar esta parte para
  //usar el servicio

  constructor() { }

  // Observable string sources
  private horaInicioSource = new Subject<string>();
  private horaFinSource = new Subject<string>();
  //private missionConfirmedSource = new Subject<string>();
  
  // Observable string streams
  horaInicio$ = this.horaInicioSource.asObservable();
  horaFin$ = this.horaFinSource.asObservable();
  //missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  cambiarHoraReserva(horaI: string, horaF: string) {
    this.horaInicioSource.next(horaI);
    this.horaFinSource.next(horaF);
  }

  /*
  confirmMission(Nombre: string) {
    this.missionConfirmedSource.next(Nombre);
  }
  */
}

