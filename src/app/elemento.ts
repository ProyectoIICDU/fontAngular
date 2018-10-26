import { Deporte } from './deporte';
import { ReservaEspacio } from './reservaespacio';
export class Elemento {
    constructor(
    public idEspacio: number,
    public deporte: string,
    public marca: string,
    public referencia: string,
    public peso: number,
    public primario: string,
    public secundario: string,
    public cantidad: number,
    public tipo: string,
    public descripcion?: string,

    ) {  }
    

}
