import { EspacioDeportivo } from './espaciodeportivo';
export class ReservaEspacio {
    constructor(
        
        public idReserva:number,
        public fechaini:Date,
        public fechafin:Date,
        public tipo:String,
        public descripcion:String,
        public nombre:String,
        public esfija:boolean,
        public idEspacio:EspacioDeportivo
    ){


    }
}