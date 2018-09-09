import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';


@Injectable()

export class EspaciosreservadosService {

  constructor() { }
  
  cargarEspaciosReservados(): Observable< DatosReservas[] >{
    return timer(100)
    .pipe(
      map((x) => [
        { espacioDeportivo: 'Cancha Tenis', usuario: 'Dario', fecha: '11/09/2018', horaInicio: '10:00', horaFin: '12:00' },
        { espacioDeportivo: 'Cancha Tenis', usuario: 'Juanita', fecha: '11/09/2018', horaInicio: '08:00', horaFin: '10:00' },
        { espacioDeportivo: 'Cancha Tenis', usuario: 'Juan', fecha: '12/09/2018', horaInicio: '07:00', horaFin: '09:00' },
        { espacioDeportivo: 'Cancha Futbol', usuario: 'Hector', fecha: '14/09/2018', horaInicio: '14:00', horaFin: '16:00' },
        { espacioDeportivo: 'Cancha Futbol', usuario: 'Rocio', fecha: '14/09/2018', horaInicio: '20:00', horaFin: '22:00' },
        { espacioDeportivo: 'Cancha Futbol', usuario: 'Ana', fecha: '14/09/2018', horaInicio: '16:00', horaFin: '18:00' },
        { espacioDeportivo: 'Cancha Voleyball', usuario: 'Pablo', fecha: '15/09/2018', horaInicio: '09:00', horaFin: '11:00' },
        { espacioDeportivo: 'Cancha Voleyball', usuario: 'Lucia', fecha: '15/09/2018', horaInicio: '14:00', horaFin: '16:00' }
      ])
    );
  }
  
}

export class DatosReservas {
  constructor(
    public espacioDeportivo: string,
    public usuario: string,
    public fecha: string,
    public horaInicio: string,
    public horaFin: string) { }
}
