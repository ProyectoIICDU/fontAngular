import { Injectable } from '@angular/core';

@Injectable()
export class EspaciosreservadosService {

  private DATOSRESERVAS: datosReservas[] = [
    { usuario: 'Dario', fecha: '11/09/2018', horaInicio: '10:00', horaFin: '12:00' },
    { usuario: 'Juanita', fecha: '11/09/2018', horaInicio: '08:00', horaFin: '10:00' },
    { usuario: 'Juan', fecha: '12/09/2018', horaInicio: '07:00', horaFin: '09:00' },
    { usuario: 'Hector', fecha: '14/09/2018', horaInicio: '14:00', horaFin: '16:00' },
    { usuario: 'Rocio', fecha: '14/09/2018', horaInicio: '20:00', horaFin: '22:00' },
    { usuario: 'Ana', fecha: '14/09/2018', horaInicio: '16:00', horaFin: '18:00' },
    { usuario: 'Pablo', fecha: '15/09/2018', horaInicio: '09:00', horaFin: '11:00' },
    { usuario: 'Lucia', fecha: '15/09/2018', horaInicio: '14:00', horaFin: '16:00' }
  ];

  constructor() { }

  cargarEspaciosReservados(): datosReservas[]{
    return this.DATOSRESERVAS;
  }
}

export class datosReservas {
  constructor(
    public usuario: string,
    public fecha: string,
    public horaInicio: string,
    public horaFin: string) { }
}
