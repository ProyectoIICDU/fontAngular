import { Deporte } from './deporte';
import { ReservaEspacio } from './reservaespacio';
export class Elemento {
    constructor(
    public idEspacio: number,
    public nombre: string,
    public estado: string,
    public ubicacion: string,
    public deporteList: Deporte[],
    public reservaEspacioList:ReservaEspacio[],
    public descripcion?: string,

    ) {  }

}
