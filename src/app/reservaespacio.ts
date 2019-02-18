import { EspacioDeportivo } from './espaciodeportivo';
export class ReservaEspacio {
    constructor(
        
        public idReserva:number,
        public fechaini:Date,
        public fechafin:Date,
        public descripcion:String,
        public nombre:String,
        public facultad:String,
        public programa:String,
        public tipo:String,
        public esfija:boolean,
        public idEspacio:EspacioDeportivo
    ){


    }
}