
import { Component, OnChanges, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { SocialUser } from "angularx-social-login";
import { AuthService } from "angularx-social-login";
//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Importacion para manejo y configuracion del calendario
*
*/

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  getSeconds,
  getMinutes,
  getHours,
  setHours,
  setSeconds,
  setMinutes,
  compareAsc,
} from 'date-fns';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Importacion para instanciar objetos tipo ReservaEspacio
*
*/
import { ReservaEspacio } from '../reservaespacio';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Importacion para manejo y configuracion de eventos del calendario
*
*/
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK
} from 'angular-calendar';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

import { DemoUtilsModule } from '../../demo-utils/module';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

import { Subject } from 'rxjs/Subject';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Importacion para manejo de bootstrap
*
*/
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Importacion para manejo de modal bootstrap
*
*/
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Importacion para instanciar objetos tipo EspacioDeportivo
*
*/
import { EspacioDeportivo } from '../espaciodeportivo';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Importacion para instanciar objetos tipo EspaciodeportivoService 
* que permiten comunicacion con servidor web por medio de web service Rest
*
*/
import { EspaciodeportivoService } from '../espaciodeportivo.service';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Importacion para instanciar objetos tipo UsuarioService 
* que permiten comunicacion con servidor web por medio de web service Rest
*
*/
//import { UsuarioService } from '../servicios/usuario.service';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Importación para instanciar objetos tipo 
 */
import { HorarioOcupadoService } from '../servicios/horario-ocupado.service';


//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Importacion para instanciar objetos tipo EspacioDeportivo
*
*/
import { FormControl, FormGroup, Validators } from '@angular/forms';

/** Importacion para la presentacion de alertas al usuario */
import { AlertService, UsuarioService } from '../servicios/index';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { range } from 'rxjs/observable/range';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Alert } from 'selenium-webdriver';

//------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Declaracion de constantes utilizadas para definir los colores a usar en las celdas del calendario
*
*/
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

//************************************************************************************************************************************************************

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

//************************************************************************************************************************************************************

export class CalendarComponent implements OnChanges {

  // Estructuras usadas para la inicializcion del calendario
  /*inicioDiarioStruct = {
    hour: 2,
    minute: 23,
    second: 0

  };*/
  
  
  finalDiarioStruct = {
    hour: 2,
    minute: 23,
    second: 0
  };

  
  // Variable que permite manejar el contenido del modal bootstrap
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  // Variable que indica en que vista (MESES, SEMANAS, DIAS) se muestra el calendario
  view: string = 'month';
  name = "final";
  user='';
  email='';
  aux='';
  admin=false; // variable que indica si se es admin o si se es usuario común
  login='';
  flagValidado: boolean = false; // flag actúa como una bandera para no validar más de una vez
  private users: SocialUser;
  private loggedIn: boolean;
  opcionFacultad:String='0';
  pFacultad:String='';
  programaSelect = [];
  // Variable para gestionar los eventos del calendario
  eventActual: CalendarEvent[];
  eventAct: CalendarEvent;
  HorarioPer=false;
  option1 = true;
  showAlert=false;
  option2 = false;
  control= false;
  verFormulario = false;
  Error=false;
  titulo: String = "Deporte";

  // Variable para configuracion del idioma del calendario
  locale: string = 'es';

  //variable con rol de usuario
  rolUs: String;
  usuarioSistema: String; 


  espacio34: EspacioDeportivo;
  
  // Variable con el espacio deportivo seleccionado y sobre el cual se hara la reserva
  @Input() selectEspacio: EspacioDeportivo;
  
  // Variables para gestionar la reserva
  reservaSave: ReservaEspacio;
  reservaAct: ReservaEspacio = new ReservaEspacio(0, new Date(), new Date(),"",'', '', '', '', false, null);

  // Lista de reservas registradas en BD
  reservasActuales: ReservaEspacio[];
  reservasActualvista: ReservaEspacio[];

  // Lista de tipos de reserva
  tipoSelect = [
    { value: 'Academico', text: 'Academico' },  
    { value: 'Normal', text: 'Normal' },
    { value: 'Evento', text: 'Evento' },
    { value: 'Seleccionados', text: 'Seleccionados' },
  ];

    // Lista de tipos de reserva
    facultadSelect = [
      { value: 'Artes', text: 'Artes' },  
      { value: 'Agrarias', text: 'Ciencias Agrarias' },
      { value: 'Salud', text: 'Ciencia de la Salud' },
      { value: 'Contables', text: 'Ciencias Contables, Económicas y Administrativas' },
      { value: 'Humanas', text: 'Ciencias Humanas y Sociales' },
      { value: 'Educacion', text: 'Ciencias Naturales, Exactas y de la Educación' },
      { value: 'Derecho', text: 'Derecho, Ciencias Políticas y Sociales' },
      { value: 'Civil', text: 'Ingeniería Civil' },
      { value: 'Electronica', text: 'Ingeniería Electrónica y Telecomunicaciones' },
    ];

    artesSelect = [
      { value: 'ArtesPlasticas', text: 'Artes Plásticas' },  
      { value: 'Diseño', text: 'Diseño Gráficos' },
      { value: 'Banda', text: 'Dirección de Banda' },
      { value: 'licMusica', text: 'Licenciatura en Música' },
      { value: 'Musica', text: 'Música Instrumental' },
    ];

    agrariasSelect = [
      { value: 'Agroindustrial', text: 'Ingeniería Agroindustrial' },  
      { value: 'Agropecuaria', text: 'Ingeniería Agropecuaria' },
      { value: 'Forestal', text: 'Ingeniería Forestal' },
      { value: 'tAgroindustrial', text: 'Tecnología Agroindustrial' },
    ];

    saludSelect = [
      { value: 'Enfermeria', text: 'Enfermería' },  
      { value: 'Fisioterapia', text: 'Fisioterapia' },
      { value: 'Fonoaudiologia', text: 'Fonoaudiología' },
      { value: 'Medicina', text: 'Medicina' },
    ];

    contablesSelect = [
      { value: 'Administracion', text: 'Administración de Empresas' },  
      { value: 'Contaduria', text: 'Contaduría Pública' },
      { value: 'Economia', text: 'Economía' },
      { value: 'Turismo', text: 'Turismo' },
    ];

    humanasSelect = [
      { value: 'Antopologia', text: 'Antopología' },  
      { value: 'Filosofia', text: 'Filosofía' },
      { value: 'Geografia', text: 'Geografía del Desarrollo Regional y Ambiental' },
      { value: 'Historia', text: 'Historia' },
      { value: 'Lenguas', text: 'Licenciatura en Lenguas Modernas con Énfasis en Inglés y Fracés' },
      { value: 'Etnoeducacion', text: 'Licenciatura en Etnoeducación' },
      { value: 'Semiotica', text: 'Licenciatura en Lingüística y Semiótica' },
      { value: 'Castellana', text: 'Licenciatura en Literatura y Lengua Castellana' },
    ];

    educacionSelect = [
      { value: 'Biologia', text: 'Biología' },  
      { value: 'Fisica', text: 'Ingenieía Física' },
      { value: 'licAmbiental', text: 'Licenciatura en Ciencias Naturales y Educación Ambiental' },
      { value: 'Artistica', text: 'Licenciatura en Educación Artística' },
      { value: 'basicaPrimaria', text: 'Licenciatura en Educación Básica Primaria' },
      { value: 'licFisica', text: 'Licenciatura en Educación Física, Recreación y Deportes' },
      { value: 'licMatematicas', text: 'Licenciatura en Matemáticas' },
      { value: 'Matematicas', text: 'Matemáticas' },
      { value: 'Quimica', text: 'Química' },
      { value: 'tecGestionAmbiental', text: 'Tecnología en Gestión Ambiental' },
    ];

    derechoSelect = [
      { value: 'Politica', text: 'Ciencia Política' },  
      { value: 'comuniSocial', text: 'Comunicación Social' },
      { value: 'Derecho', text: 'Derecho' },
    ];

    civilSelect = [
      { value: 'Arquitectura', text: 'Arquitectura' },  
      { value: 'Civil', text: 'Ingeniería Civil' },
      { value: 'Ambiental', text: 'Ingeniería Ambiental' },
      { value: 'Geotecnologia', text: 'Geotecnología' },
    ];

    ingenieriaSelect = [
      { value: 'Electronica', text: 'Ingeniería Electrónica y Telecomunicaciones' },  
      { value: 'Sistemas', text: 'Ingeniería de Sistemas' },
      { value: 'Automatica', text: 'Ingeniería en Automática Industrial' },
      { value: 'Telematica', text: 'Tecnología en Telemática' },
    ];

  viewDate: Date = new Date();

  // Lista de configuracion de las acciones del calendario
  actions: CalendarEventAction[] = [
    {
      // Accion EDITAR reserva
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      // Accion ELIMINAR reserva
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        if(confirm('¿Está seguro de eliminar la reserva?'))
        {
          this.events = this.events.filter(iEvent => iEvent !== event);
          this.handleEvent('Deleted', event);
          this.eliminarReserva();
        }        
      }
    }
  ];

  modalData: {
    action: string;
    event: CalendarEvent;
    
  };


  activeDayIsOpen: boolean = true;

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  


  //------------------------------------------------------------------------------------------------------------------------------------------------------------

  /**
  * Constructor de la clase
  *
  */
  constructor(private modal: NgbModal, private espacioService: EspaciodeportivoService, 
    private cdr: ChangeDetectorRef,  private alertService: AlertService,
    private socialAuthService: AuthService, private usuarioService: UsuarioService ) {
    this.reservasActualvista=[];
    this.finalDiarioStruct = {
      hour: 2,
      minute: 23,
      second: 0

    };
  
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
  formReserva: FormGroup; // Formulario de reserva

  horarioOc: HorarioOcupadoService;
  

  //------------------------------------------------------------------------------------------------------------------------------------------------------------

  
  cargarProgramas(){
    
    this.pFacultad = this.opcionFacultad;
    

    

    //console.log("Facu seleccionada" + this.pFacultad);
    switch(this.pFacultad){
      case "Artes":  this.programaSelect = this.artesSelect;
      break;
      case "Agrarias":  this.programaSelect = this.agrariasSelect;
      break;
      case "Salud":  this.programaSelect = this.saludSelect;
      break;
      case "Contables":  this.programaSelect = this.contablesSelect;
      break;
      case "Humanas":  this.programaSelect = this.humanasSelect;
      break;
      case "Educacion":  this.programaSelect = this.educacionSelect;
      break;
      case "Derecho":  this.programaSelect = this.derechoSelect;
      break;
      case "Civil":  this.programaSelect = this.civilSelect;
      break;
      case "Electronica":  this.programaSelect = this.ingenieriaSelect;
      break;
      default: false;
    }
  }

  /**
  * Funcion de inicializacion de la clase
  *
  */
  ngOnChanges(changes: SimpleChanges) {
    
    this.getReservasEspacio(); // Se obtienen las reservas del espacio deportivo registradas en BD
    this.titulo = this.selectEspacio.nombre;
    console.log("pasa por el cambio");
    this.formReserva = new FormGroup({ // Creacion del formulario de reserva
      // Campo nombre, ligado a variable: "this.reservaAct.nombre"
      'nombre': new FormControl(this.reservaAct.nombre, [
        Validators.required, // campo requerido
        Validators.maxLength(20)]), // longitud maxima de caracteres permitidos
        
      // Campo descripcion, ligado a variable: "this.reservaAct.descripcion"
      'descripcion': new FormControl(this.reservaAct.descripcion, Validators.maxLength(500)), // longitud maxima de caracteres permitidos 

      // Campo facultad, ligado a variable: "this.reservaAct.facultad"
      'facultad': new FormControl(this.reservaAct.facultad,
        Validators.required), // campo requerido

        // Campo programa, ligado a variable: "this.reservaAct.programa"
      'programa': new FormControl(this.reservaAct.programa,
        Validators.required), // campo requerido

        // Campo tipo, ligado a variable: "this.reservaAct.tipo"
      'tipo': new FormControl(this.reservaAct.tipo,
        Validators.required), // campo requerido
      // Campo descripcion, ligado a variable: "this.reservaAct.descripcion"
      //'inicioDiarioStruct': new FormControl(this.inicioDiarioStruct),

      // Campo descripcion, ligado a variable: "this.reservaAct.descripcion"
      'finalDiarioStruct': new FormControl(this.finalDiarioStruct),
    });
  }

  reservasBDActuales: ReservaEspacio[];
  //------------------------------------------------------------------------------------------------------------------------------------------------------------

  /**
  * Declaracion de constantes utilizadas para definir los colores a usar en las celdas del calendario
  *
  */
 
  getReservasEspacio() {

    this.socialAuthService.authState.subscribe((user) => {
      this.users = user;
        if (this.user!=null) {
        var str = this.users.email; 
        var partir = str.split("@"); 
        console.log(partir[1])
        this.aux=partir[1]  
      
        if( this.aux=='unicauca.edu.co')
        {

          this.email = this.users.email; 
          this.user = this.users.name; 
        }
      }
      
      this.loggedIn = (user != null);
    });

    if(!this.flagValidado) {
      this.obtenerRol();
    }

    this.limpiarReservas();
    console.log("este es mi usuario prueba que sale "+this.user);
    let esAdmin;
    esAdmin = this.usuarioService.identicarRol(this.user);
    console.log("este user es admin o no "+esAdmin);
    this.usuarioSistema = this.user;
    this.espacioService.getReservasEspacio(this.selectEspacio.idEspacio,this.email.split("@")[0]).subscribe(reservas => {
      this.reservasActuales = reservas;
      this.cargarReservas();
    });
    this.reservasBDActuales= this.reservasActuales;
  }

 
  
  cargarReservas() {
    //console.log("lengt" + this.reservasActuales.length);
    for (let i = 0; i < this.reservasActuales.length; i++) {
      //let fechafin = this.setFecha(this.reservasActuales[i].fechafin);
      // console.log("fecha ini"+fechaIni);
      let hor = new Date(this.reservasActuales[i].fechaini);
      console.log("Hora de reserva cris "+hor.getHours());
      //console.log("date" + new Date(this.reservasActuales[i].fechaini));
      this.events.push({
        title: this.reservasActuales[i].nombre.toString(),
        start: new Date(this.reservasActuales[i].fechaini),
        end: new Date(this.reservasActuales[i].fechafin),
        color: colors.red,
        actions: this.actions,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      });

    }
    this.refresh.next();
  }

  limpiarReservas() {
    this.events.splice(0);
  }

  setFecha(fecha: Date): Date {
    let fecha2 = new Date();
    fecha2.setMonth(fecha.getMonth());
    fecha2.setHours(fecha.getHours(), fecha.getMinutes(), fecha.getSeconds());
    return fecha2;

  }
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }
  handleEvent(action: string, event: CalendarEvent): void {
    
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
    this.cargarParaVista(event);
  }
  cargarParaVista(event: CalendarEvent){
    this.reservasActualvista=[];
    console.log("lon "+this.reservasActuales.length)
    for (let i = 0; i < this.reservasActuales.length; i++) {
      let hor = new Date(this.reservasActuales[i].fechaini);
      console.log(event.title);
      console.log(this.reservasActuales[i].nombre);
      console.log(event.start);
      console.log(hor)
      if(compareAsc(event.start,hor)==0){
        this.reservasActualvista.push(this.reservasActuales[i]);
        console.log("long "+this.reservasActuales[i].nombre);
      }
    }
    
    
    
  }
  addReserva(event) {
    
    this.formReserva.reset();
    this.eventAct = {
      title: this.reservaAct.nombre.toString(),
      start: this.viewDate,
      end: this.viewDate,
      color: colors.red,
      actions: this.actions,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    };
    
     
     
    

  }

  deleteReserva(event) {
    this.eventAct = {
      title: this.reservaAct.nombre.toString(),
      start: this.viewDate,
      end: this.viewDate,
      color: colors.red,
      actions: this.actions,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    };

    console.log("reserva Eliminada:" + this.reservasActuales.length);

  }


  onFilteroption1(ischecked: boolean) {
    this.option1 = true;
    this.option2 = false;
    this.verFormulario = true;
  }
  onFilteroption2(ischecked: boolean) {
    this.option2 = true;
    this.option1 = false;
    this.verFormulario = true;
    /*
    this.inicioDiarioStruct = {
      second: getSeconds(this.viewDate),
      minute: getMinutes(this.viewDate),
      hour: getHours(this.viewDate)
    };
    */
    this.finalDiarioStruct = {
      second: getSeconds(this.viewDate),
      minute: getMinutes(this.viewDate),
      hour: getHours(this.viewDate)
    };

  }
  
  guardarReserva(event) {
    
    const inicio = this.eventAct.start;
    const final = this.eventAct.end;
    
    let reservaActual = this.reservaAct;
    
    reservaActual.idEspacio = this.selectEspacio;
    reservaActual.nombre = this.formReserva.get('nombre').value;
    reservaActual.descripcion=this.formReserva.get('descripcion').value;
    reservaActual.facultad = this.formReserva.get('facultad').value;
    reservaActual.programa = this.formReserva.get('programa').value;
    reservaActual.tipo = this.formReserva.get('tipo').value;
    console.log("espacio seleccionado tipo " + document.getElementById("descripcion"));
    const fechaAct = new Date(); //Fecha actual
    //console.log("Es "+ inicio + "<" + fechaAct+"?");

    let horasMaxPermitidas: Boolean=false;
    let HorarioPermitido: Boolean=false;

    

    if (this.option1) 
    {
      console.log("Entró a fija op1");
      reservaActual.esfija = this.option1;

      if (inicio.getHours()>=5 && inicio.getHours() <=22 && final.getHours()>=5 && final.getHours()<=22){
        if(inicio.getHours()==22){
          if(inicio.getMinutes()==0){
            HorarioPermitido=true;
          }else{HorarioPermitido=false;}
        }else{HorarioPermitido=true;}
        if(final.getHours()==22){
          if(final.getMinutes()==0){
            HorarioPermitido=true;
          }else{HorarioPermitido=false;}
        }else{HorarioPermitido=true;}
      }else{HorarioPermitido=false;}

      switch(this.eventAct.end.getHours()-this.eventAct.start.getHours()){
        case 0:  horasMaxPermitidas=true;
        break;
        case 1: 
          if(this.eventAct.end.getMinutes()-this.eventAct.start.getMinutes()<=30){ 
            horasMaxPermitidas=true;
          }else{horasMaxPermitidas=false;}
        break;
        default: horasMaxPermitidas=false;
      
      }
      if(HorarioPermitido){

        //si es administrador no tiene restricciones de tiempo
        if(this.admin) {
          horasMaxPermitidas = true;
        }

        if(horasMaxPermitidas){
          //Revision que no sea menor que la fecha actual
          if(inicio < fechaAct){
            this.Error=true;
            this.formReserva.reset();
            window.alert("Error! La fecha de inicio no puede ser menor que la fecha actual.");

          }
          //Revision quesea menor la fecha fin que la fecha de inicio
          else if (final > inicio) {
            let horarioOcupadoFija: Boolean = false ;
            
            while (inicio <= final) {
              
              //aqui se crea una reserva cada 8 dias
              let inicioCopia = new Date();
              let inicioCopia2 = new Date();
              //final del evento
              inicioCopia.setDate(inicio.getDate());
              inicioCopia.setMonth(inicio.getMonth());
              inicioCopia.setHours(final.getHours(), final.getMinutes(), final.getSeconds());
              //inicio del evento
              inicioCopia2.setDate(inicio.getDate());
              inicioCopia2.setMonth(inicio.getMonth());
              inicioCopia2.setHours(inicio.getHours(), inicio.getMinutes(), inicio.getSeconds());
              
              //aqui se reserva 
              reservaActual.fechaini = inicioCopia2;
              reservaActual.fechafin = inicioCopia;
              
              this.getReservasEspacio(); 
              horarioOcupadoFija = this.horarioDisponible(inicio);
         
              if(horarioOcupadoFija)
              {
                console.log("Error, el espacio se encuentra ocupado en las horas marcadas, revise el calendario");
                this.alertService.error("Error! El espacio que se intenta reservar está ocupado ");                
                               
              }else{
                this.espacioService.guardarReservaEspacio(reservaActual).subscribe(reservaActual => { this.reservaSave = reservaActual });
                  
                  this.events.push({
                    title: this.reservaAct.nombre.toString(),
                    start: inicioCopia2,
                    end: inicioCopia,
                    color: colors.red,
                    actions: this.actions,
                    draggable: true,
                    resizable: {
                      beforeStart: true,
                      afterEnd: true
                    }});

                  this.alertService.success("Ok! La reserva ha sido almacenada.");
                  //horarioOcupadoFija = false;
              }              
              inicio.setDate(inicio.getDate() + 7);            
            }          

            } else {
              //la reserva no puede ser fija
              this.Error=true;
              
              this.formReserva.reset();
              window.alert("Error! La fecha de finalizacion no puede ser menor que la de inicio.");
              console.log("Error, la fecha de fin es menor o igual que la fecha de inicio.");
            }

        }else {
          this.Error=true;
          
          this.formReserva.reset();
          window.alert("Error! La reserva no puede durar mas de 1.5 Horas.");
        } 
      }else{
        this.formReserva.reset();
        
        window.alert("Error! Reservas permitidas de 5 A.M a 10 P.M");
        this.HorarioPer=true;
        
        
        
        
      }     
    }
    else {      
      reservaActual.esfija = false;
      let horarioOcupado: Boolean=false;
      console.log(this.reservasActuales.length + '<-<> tamanio array');
      /*
      const InicioDate: Date = setHours(
        setMinutes(
          setSeconds(inicio, this.inicioDiarioStruct.second),
          this.inicioDiarioStruct.minute
        ),
        this.inicioDiarioStruct.hour
      );*/
      const InicioDate:Date=this.eventAct.start;
      //console.log("Esta es la fecha"+InicioDate);
      let FinalDate: Date=this.eventAct.start;
      
      FinalDate=setHours(
        setMinutes(
          setSeconds(inicio, this.finalDiarioStruct.second),
          this.finalDiarioStruct.minute
        ),
        this.finalDiarioStruct.hour
      );

      this.refresh.next();
      
      //TODO
      if (this.finalDiarioStruct.hour>=5 && this.finalDiarioStruct.hour <=22 && InicioDate.getHours()>=5 && InicioDate.getHours()<=22){
        if(this.finalDiarioStruct.hour==22){
          if(this.finalDiarioStruct.minute==0){
            HorarioPermitido=true;
          }else{HorarioPermitido=false;}
        }else{HorarioPermitido=true;}
        if(InicioDate.getHours()==22){
          if(InicioDate.getMinutes()==0){
            HorarioPermitido=true;
          }else{HorarioPermitido=false;}
        }else{HorarioPermitido=true;}
      }else{HorarioPermitido=false;}
      
      //FIN TODO
      switch(this.finalDiarioStruct.hour-InicioDate.getHours()){
        case 0:  horasMaxPermitidas=true;
        break;
        case 1: 
          if(this.finalDiarioStruct.minute-InicioDate.getMinutes()<=30){ 
            horasMaxPermitidas=true;
          }else{horasMaxPermitidas=false;}
        break;
        default: horasMaxPermitidas=false;      
      }
      if(HorarioPermitido){

        //si es administrador no tiene restricciones de tiempo
        if(this.admin) {
          horasMaxPermitidas = true;
        }

        if(horasMaxPermitidas){
          if(InicioDate < fechaAct){
            this.Error=true;
            this.formReserva.reset();
            this.alertService.error("Error! La fecha de inicio no puede ser menor que la fecha actual.");
            console.log("Error! La fecha de inicio no puede ser menor que la fecha actual.");
          }
          
          //Revision que sea menor la fecha fin que la fecha de inicio
          else if (FinalDate > inicio) {
          
            reservaActual.fechaini = InicioDate;
            reservaActual.fechafin = FinalDate;
             

            console.log("fecha inicio reservaActual --> "+reservaActual.fechaini);
            console.log("fecha inicio inicioDate "+InicioDate);
            console.log("finalDate --> "+FinalDate);
            console.log("inicio --> "+inicio);            

            console.log(this.reservasActuales.length + '<-<> tamanio array');
            //this.reservasActuales = []; 
            this.getReservasEspacio(); 
            horarioOcupado = this.horarioDisponible(InicioDate);
            
            console.log("Tamaño despues de cmparar "+this.reservasActuales.length);

            if(horarioOcupado)
            {
              console.log("Error, el espacio se encuentra ocupado en las horas marcadas, revise el calendario");
              this.alertService.error("Error! El espacio que se intenta reservar está ocupado");                
            }else{
              console.log("guardando en bd");
                  
              this.espacioService.guardarReservaEspacio(reservaActual).subscribe(reservaActual => { this.reservaSave = reservaActual });
              this.reservasActuales.push(reservaActual);   
                              
              
              this.events.push({
                title: reservaActual.nombre.toString(),
                start: InicioDate,
                end: FinalDate,
                color: colors.red,
                actions: this.actions,
                draggable: true,
                resizable: {
                  beforeStart: true,
                  afterEnd: true
                }
              });

              this.alertService.success("Ok! La reserva ha sido almacenada.");              
              
            }
            console.log("horarioOcupado estado --> "+horarioOcupado);
            
            
    
          } else {
            //la reserva no puede ser fija
            this.Error=true;
            
            this.formReserva.reset();
            window.alert("Error! La fecha de finalizacion no puede ser menor que la de inicio.");
            console.log("Error, la fecha de fin es menor o igual que la fecha de inicio.");
          }
    
        }
        else {
          this.Error=true;
          this.formReserva.reset();
          window.alert("Error! una Reserva no puede duras mas de 1.5 Horas");
          console.log("Error, la fecha de fin es menor o igual que la fecha de inicio.");
        }
      
      }else{
        
        this.formReserva.reset();
        window.alert("Error! Reservas permitidas de 5 A.M a 10 P.M ");
        this.HorarioPer=true;
        this.addReserva(event);
      }
      
    }
    this.refresh.next();
  }

  /*recargarReservas() {
    this.limpiarReservas();
    this.espacioService.recargarReservas(this.selectEspacio.idEspacio).subscribe(reservas => {
      this.reservasActuales = reservas;
      this.cargarReservas();
    });
  }*/

  horarioDisponible(fechaAGuardar: Date): boolean
  {
    let estaOcupado: boolean = false;
    for (let i = 0; i < this.reservasBDActuales.length; i++) 
    {      
      let hor = new Date(this.reservasBDActuales[i].fechaini);
      let horf = new Date(this.reservasBDActuales[i].fechafin);

      console.log("<------------------------------> ");
      console.log("Hora reservada cris in Mes: "+(hor.getMonth()+1)+" - Día: "+hor.getDate()+" - Hora: "+hor.getHours()+":"+hor.getMinutes());
      console.log("Hora reservada cris fin Mes: "+(horf.getMonth()+1)+" - Día: "+horf.getDate()+" - Hora: "+horf.getHours()+":"+horf.getMinutes());
      console.log("<------------------------------> ");
      if((fechaAGuardar.getMonth()+1) == (hor.getMonth()+1))
      {
        console.log("Si es igual que mes inicio guardada --> "+(fechaAGuardar.getMonth()+1)+"---"+(hor.getMonth()+1));
        if(fechaAGuardar.getDate() == hor.getDate())
        {
          console.log("Si es igual que dia inicio guardada --> "+fechaAGuardar.getDate()+"---"+hor.getDate());
          if(fechaAGuardar.getHours() == hor.getHours())
          {
            if(fechaAGuardar.getMinutes() >= hor.getMinutes() && fechaAGuardar.getMinutes() <= horf.getMinutes())
            {
              console.log("Si es mayor que hora inicio guardada --> "+fechaAGuardar.getMinutes()+"---"+horf.getMinutes());
              estaOcupado = true;  
            }
          }
        }
      }

              
      /*if(fechaAGuardar >= hor && fechaAGuardar <= horf)
      {  
        //console.log("Mes -- > "+reservaActual.fechaini.getMonth()+" == "+hor.getMonth());
        //console.log("Día -- > "+reservaActual.fechaini.getDay()+" == "+hor.getDay());
        //console.log("Hora -- > "+reservaActual.fechaini.getHours()+" == "+hor.getHours());
        console.log("hay iguales --> ");
                
        //if((InicioDate.getMinutes() >= hor.getMinutes()) || (InicioDate.getMinutes() < horf.getMinutes()))
        //{
          estaOcupado = true;                
        //}                
      }*/
    }
    return estaOcupado;
  }
  
  //rolUsuario(): String
  //{
    //let usuarioDSRol;
    //usuarioDSRol = this.reservaAct;
  //}

  eliminarReserva() {
    //console.log("title: " + this.modalData.event.title);
    
    console.log("ELIMINANDO...");
    let resActual;
    //console.log("nombre reserva: " + reservaActual.nombre.toString);
    //console.log("nombre reservaAct: " + this.reservaAct.nombre.toString);
    
    for (let i = 0; i < this.reservasActuales.length; i++) {
      if (this.reservasActuales[i].nombre == this.modalData.event.title) {
        console.log("Reserva encontrada para eliminar: ");
        resActual = this.reservasActuales[i];
        console.log("id Reserva: " + resActual.idReserva);

        this.espacioService.eliminarReservaEspacio(resActual.idReserva).subscribe(
          ok => { this.control= ok 
            console.log("valor retornado2"+ok);
          }
          );
        console.log("valor retornado"+this.control);
        break;  
      }
    }
    //this.deleteReserva(event);

  }

  updateTimeInicio(): void {
    //AQUI DEBO HACER EL UPDATE A EL VIEWDATE
    

  }
  updateTimeFinal(): void {


  }

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
