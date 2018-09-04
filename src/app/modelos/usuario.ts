import { ReservaEspacio } from "../reservaespacio";

export class Usuario {
    constructor(
    	public idUsuario: number,
		public login: String,
		public codigo: String,
	    public password: String,
	    public nombres: String,
	    public apellidos: String,
		public rol: String,
		public estado:String,
		public fechaactivacion:Date,
		public activadopor:String,
		public reservaEspacioList:ReservaEspacio[]
    ) {  }  
}