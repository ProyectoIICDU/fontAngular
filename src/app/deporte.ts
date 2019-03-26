export class Deporte {//Se crea una estructura a usar en los servicios o componentes
    //que nos permiten tener los datos que llegan desde el back y ademas sirve para
    //estructurar lo que reciba el back en caso que tengamos que enviar datos  
    constructor(
	public idDeporte: number,
	public nombre: string
    ) {  }  
}