import { Deporte } from './deporte';
import { ReservaEspacio } from './reservaespacio';
export class Elemento {//Esta clase contiene los elementos que se deben tener en cuenta a la hora de agregar un
    //elemento o si se va a hacer una actualizaci´-on, estos corresponden con la base de datos
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
