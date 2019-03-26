export class EdicionReserva {//Para poder editar una reserva se deben tener en cuenta los datos que se van a 
    //cambiar y coincidan con la base de datos y los tipos de cada uno, por esta razon se crea la clase. estos datos
    //seran los que se tienen en cuenta para cambiar y que ser-án usados en los services y componentes
    constructor(
        public tipo: string,
        public nombre: string,
        public descripcion: string,
        public horaInicio: string,
        public horaFin: string,
        public fechaInicio: string,
        public fechaFin: string
    ) {  }

}
