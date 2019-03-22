
import { Component, OnInit } from '@angular/core';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Importacion para instanciar objetos tipo EspacioDeportivo
*
*/
import { EspacioDeportivo } from '../espaciodeportivo';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Importacion para instanciar objetos tipo Deporte
*
*/
import { Deporte } from '../deporte';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Importacion para instanciar objetos tipo EspaciodeportivoService.
*
* Permite la conexion con los web services implementados en el lado servidor
*
*/
import { EspaciodeportivoService } from '../espaciodeportivo.service';

import { AlertService, UsuarioService } from '../servicios/index';
//************************************************************************************************************************************************************

/**
 * Importaciones para el manejo de sesion
 */
import { SocialUser } from "angularx-social-login";
import { AuthService } from "angularx-social-login";

/**
* Este componente se encarga de gestionar las siguientes acciones:
*
* Registro
*
* Consulta
*
* Edicion
*
* Eliminacion
*
*/
 @Component({
    selector: 'app-espacio-deportivos',
    templateUrl: './espacio-deportivos.component.html',
    styleUrls: ['./espacio-deportivos.component.css']
})

//************************************************************************************************************************************************************

/**
* Clase principal del componente
*
*/
export class EspacioDeportivosComponent implements OnInit {
    espacios: EspacioDeportivo[]; // En este array se almacenan los espacios deportivos registrados en la BD.
    espacioSelected: EspacioDeportivo; // Objeto donde se almacena el espacio deportivo seleccionado para VER, EDITAR o ELIMINAR
    deporteSelected: Deporte; //
    obj: Deporte;
    espaciosave: EspacioDeportivo;
    espacio:EspacioDeportivo;
    deportesSelect: Deporte[];
    deportesAnexados: Deporte[];

    // Variables para el manejo de inicio de sesion
    user='';
    email='';
    aux='';
    admin=false; // variable que indica si se es admin o si se es usuario común
    login='';
    private users: SocialUser;
    private loggedIn: boolean;
    flagValidado: boolean = false; // flag actúa como una bandera para no validar más de una vez
    // -- fin variables inicio de sesión

    // Lista de opciones para el SELECT "ubicacion" del espacio deportivo
    ubicacionesSelect = [
        { value: 'CDU', text: 'CDU' },
        { value: 'Diamante', text: 'Diamante' },
    ];

    // Lista de opciones para el SELECT "estado" del espacio deportivo
    estadosSelect = [
        { value: 'En Servicio', text: 'En Servicio' },
        { value: 'Mantenimiento', text: 'Mantenimiento' },
        { value: 'Desactivado', text: 'Desactivado' },
    ];

    // Esta variable permite determinar si los inputs del formulario son requeridos o no, en caso de no ser requeridos
    // se establece que son de solo lectura.
    required:boolean = true;

    // Esta variable permite determinar la accion del formulario, la cual corresponde con la opcion seleccionada por el usuario:
    // Ver, Editar, Elimnar, Registrar
    accion:string = 'Detalle';

    // Esta variable determina el icono a utilizar para el boton enviar (submit) del formulario
    iconBtnSubmit:string = '';
//------------------------------------------------------------------------------------------------------------------------------------------------------------

    constructor(private espacioService:EspaciodeportivoService, private alertService: AlertService,
        private socialAuthService: AuthService, private usuarioService: UsuarioService) {

        this.socialAuthService.authState.subscribe((user) => {
            this.users = user;
                if (this.user!=null) {
                var str = this.users.email;
                var partir = str.split("@");
                //console.log(partir[1])
                this.aux=partir[1]

                if( this.aux=='unicauca.edu.co')
                {

                this.email = this.users.email;
                this.user = this.users.name.toLocaleUpperCase();
                this.login = partir[0];
                console.log("usuario en sesion:" + this.user);

                }
            }

            this.loggedIn = (user != null);

            if(!this.flagValidado) {
                this.obtenerRol();
            }

            });
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
    * Metodo para inicializacion del componente.
    *
    * Se inicializa la lista de espacios deportivos con los registros de la BD por medio del llamado a la funcion: getEspaciosDeportivos
    *
    */
    ngOnInit() {
        this.espacioSelected = new EspacioDeportivo(0, '', '', '', [],[],'');
        this.deporteSelected = new Deporte(0, '');
        this.getEspaciosDeportivos();
        this.deportesAnexados=[];

        // Inicio de sesion y verificacion de inicio
        this.socialAuthService.authState.subscribe((user) => {
            this.users = user;
                if (this.user!=null) {
                var str = this.users.email;
                var partir = str.split("@");
                //console.log(partir[1])
                this.aux=partir[1]

                if( this.aux=='unicauca.edu.co')
                {

                this.email = this.users.email;
                this.user = this.users.name.toLocaleUpperCase();
                this.login = partir[0];
                }
            }

            this.loggedIn = (user != null);
        });

        if(!this.flagValidado) {
            this.obtenerRol();
        }
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
    * Funcion encargada de obtener los espacios deportivos registrados en la BD.
    *
    * Hace uso del objeto "espacioService" suministrado en el constructor de la clase.
    * El objeto "espacioService" permite la conexion con el servidor por medio de web services REST.
    *
    * Se invoca a la funcion getEspaciosDeportivos() del objeto "espacioService", la cual retorna un array de espacios deportivos
    * que es almacenado en la variable "espacios".
    *
    */
    getEspaciosDeportivos() {
        this.espacioService.getEspaciosDeportivos().subscribe(espacios => this.espacios = espacios);
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
    * Funcion encargada de configurar el formulario en modo de REGISTRO.
    *
    * Hace uso del objeto "espacioService" suministrado en el constructor de la clase.
    * El objeto "espacioService" permite la conexion con el servidor por medio de web services REST.
    *
    * Se invoca a la funcion getDeportes() del objeto "espacioService", la cual retorna un array de deportes
    * que es almacenado en la variable "deportesSelect", estos son los deportes registrados en la BD.
    *
    */
    setNuevo() {
        this.espacioSelected = new EspacioDeportivo(0, '', '', '',[],[],'');
        this.deporteSelected = new Deporte(0, '');
        this.deportesAnexados = [];
        this.espacioService.getDeportes().subscribe(deportes => this.deportesSelect = deportes);
        this.accion = 'Registrar'; // se inicializa la accion en Registrar para que el formulario quede configurado para realizar registro de un espacio deportivo
        this.required = true; // se inicializa en "true" ya que al hacer registros los campos deben ser requeridos
        this.iconBtnSubmit = 'fa fa-save';
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
    * Funcion encargada de configurar el formulario en modo ACTUALIZAR, VER DETALLE o ELIMINAR.
    *
    * Hace uso del objeto "espacioService" suministrado en el constructor de la clase.
    * El objeto "espacioService" permite la conexion con el servidor por medio de web services REST.
    *
    * Se invoca a la funcion getDeportes() del objeto "espacioService", la cual retorna un array de deportes
    * que es almacenado en la variable "deportesSelect", estos son los deportes registrados en la BD.
    *
    */
    verEspacioDeportivo(espaciodeportivo, accion) {
        this.espacioSelected = new EspacioDeportivo(espaciodeportivo.idEspacio, espaciodeportivo.nombre, espaciodeportivo.estado, espaciodeportivo.ubicacion,espaciodeportivo.deporteList,[], espaciodeportivo.descripcion); // Se crea una instancia de la clase EspacioDeportivo con la informacion del espacio deportivo seleccionado por el usuario
        this.espacioService.getDeportes().subscribe(deportes => this.deportesSelect = deportes); // se carga lista de deportes
        this.deporteSelected = new Deporte(0, ''); // El deporte seleccionado es creado por defecto
        this.deportesAnexados = espaciodeportivo.deporteList; // se carga la lista de deportes anexados desde el espacio deportivo seleccionado por el usuario
        this.accion = accion;
        switch(accion) {
            case 'Actualizar':
                this.required = true;
                this.iconBtnSubmit = 'fa fa-save';
                break;
            case 'Detalle':
                this.required = false;
                break;
            case 'Eliminar':
                this.required = false;
                this.iconBtnSubmit = 'fa fa-times-circle';
                break;
        }
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
    * Funcion encargada de anexar un deporte a la lista de deportes anexados del espacio deportivo.
    *
    * El deporte seleccionado por el usuario es guardado en la variable "deporteSelected"
    * Se valida si dicho deporte ya esta en la lista de deportes anexados.
    *
    */
    anexarDeporte() {
        if (this.deporteSelected.idDeporte !== 0) {
            for (let x = 0; x < this.deportesAnexados.length; x++) {
                if (this.deportesAnexados[x].idDeporte === this.deporteSelected.idDeporte) {
                    alert("EL DEPORTE " + this.deporteSelected.nombre.toUpperCase() + " YA SE ENCUENTRA SELECCIONADO");
                    return false;
                }
            }
            this.deportesAnexados.push(this.deporteSelected);
        }
        return false;
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
    * Funcion encargada de quitar un deporte de la lista de deportes anexados del espacio deportivo.
    *
    * Se busca, en la lista de deportes anexados, el deporte a quitar por su ID.
    *
    */
    quitarDeporte(deporte) {
        for (let x = 0; x < this.deportesAnexados.length; x++) {
            if (this.deportesAnexados[x].idDeporte === deporte.idDeporte) {
                this.deportesAnexados.splice(x, 1);
                return false;
            }
        }
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
    * Funcion encargada de procesar el envio (submit) del formulario segun la accion solicitada (REGISTRAR, ACTUALIZAR o ELIMINAR).
    *
    * Hace uso del objeto "espacioService" suministrado en el constructor de la clase.
    * El objeto "espacioService" permite la conexion con el servidor por medio de web services REST.
    *
    */
    enviarFormulario(): boolean {
        if (this.accion !== 'Eliminar' && this.deportesAnexados.length === 0) { // Si se va a registrar o actualizar un espacio deportivo, este debe tener al menos un deporte anexado
            alert("DEBE ANEXAR AL MENOS UN DEPORTE");
            return false;
        }
        let resultado: boolean=true;
        console.log(this.espacioSelected.nombre)
        if (confirm("¿DESEA " + this.accion.toUpperCase() + " ESTE ESPACIO DEPORTIVO?")) {
            switch (this.accion) {
                case "Registrar":
                    console.log("REGISTRANDO...");
                    for (let espa of this.espacios) {
                        if(espa.nombre == this.espacioSelected.nombre && espa.ubicacion == this.espacioSelected.ubicacion){
                            alert("EL ESCENARIO " + this.espacioSelected.nombre.toUpperCase() + ", UBICADO EN "+ this.espacioSelected.ubicacion.toUpperCase()+" YA SE ENCUENTRA REGISTRADO");
                            this.alertService.error("El escenario deportivo no se pudo registrar");
                            this.deporteSelected = new Deporte(0, '');
                            this.deportesAnexados = [];
                            this.espacioService.getDeportes().subscribe(deportes => this.deportesSelect = deportes);
                            this.accion = 'Registrar'; // se inicializa la accion en Registrar para que el formulario quede configurado para realizar registro de un espacio deportivo
                            this.required = true; // se inicializa en "true" ya que al hacer registros los campos deben ser requeridos
                            this.iconBtnSubmit = 'fa fa-save';
                            resultado=false;

                        }
                    }
                    if(resultado){
                        // Se carga la lista de deportes anexados en el espacio deportivo que se va a registrar
                        this.espacioSelected.deporteList = this.deportesAnexados;
                        // Se consume el web service "guardarEspacioDeportivo", el nuevo espacio deportivo es anexado a la lista de esapacios deportivos "espacios".
                        this.espacioService.guardarEspacioDeportivo(this.espacioSelected).subscribe(espacio => { this.espacios.push(espacio); });
                        this.alertService.success("El escenario deportivo se registro exitosamente");
                    }

                    break;
                case "Actualizar":
                    console.log("ACTUALIZANDO...");
                    // Se carga la lista de deportes anexados en el espacio deportivo que se va a registrar
                    for (let espa of this.espacios) {
                        if(espa.nombre == this.espacioSelected.nombre && espa.ubicacion == this.espacioSelected.ubicacion && espa.idEspacio!= this.espacioSelected.idEspacio){
                            resultado=false;
                        }
                    }
                    if(resultado){
                        this.espacioSelected.deporteList = this.deportesAnexados;
                            // Se consume el web service "actualizarEspacioDeportivo", en caso de ser exito el web service retornara true y se recargara la pagina, en caso contrario mostrara un mensaje de error.
                            this.espacioService.actualizarEspacioDeportivo(this.espacioSelected).subscribe(ok => {
                                if (ok) {
                                    window.location.reload();
                                } else {
                                    console.log(this.espacioSelected.nombre)
                                    alert("SE HA PRESENTADO UN ERROR, POR FAVOR INTENTE NUEVAMENTE.");
                                }
                            });
                    }else{
                        alert("Error! Ya existe un Escenario con ese Nombre y ubicación")
                    }

                    break;
                case "Eliminar":
                    console.log("ELIMINANDO...");
                    // Se filtra la lista de espacios deportivos, dejando por fuera el espacio deportivo a eliminar
                    this.espacios = this.espacios.filter(espacio => espacio !== this.espacioSelected);

                    // Se consume el web service "eliminarEspacioDeportivo", en caso de ser exito el web service retornara true y se recargara la pagina, en caso contrario mostrara un mensaje de error.
                    this.espacioService.eliminarEspacioDeportivo(this.espacioSelected.idEspacio).subscribe(ok => {
                        if (ok) {
                            window.location.reload();
                        } else {
                            alert("SE HA PRESENTADO UN ERROR, POR FAVOR INTENTE NUEVAMENTE.");
                        }
                    });
                    break;
                default:
                    break;
            }
            return resultado;
    //            console.log('save: ' + newEspacio);
        }
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------

    deportesIguales(deporte1, deporte2): boolean {
        if(deporte1.idDeporte == deporte2.idDeporte) {
            return true;
        } else {
            return false;
        }
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
      * Método que realiza una petición al servidor
      * y valida si el usuario en sesión es administrador
    */
  obtenerRol() {
    console.log("Usuario validado: "+ this.flagValidado + " usuario a validar: " + this.login);
    if (this.login != '') {
      this.flagValidado = true;
      this.usuarioService.validarRolUsuario(this.login).subscribe((esAdmin) => {
        this.admin = esAdmin;
        this.flagValidado = true;
      });
      console.log("Usuario validado: " + this.flagValidado);
    }
  }

}
