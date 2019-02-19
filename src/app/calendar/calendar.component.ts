
import { Component, OnChanges, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';

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
* Importacion para instanciar objetos tipo EspacioDeportivo
*
*/
import { FormControl, FormGroup, Validators } from '@angular/forms';

/** Importacion para la presentacion de alertas al usuario */
import { AlertService } from '../servicios/index';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

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
  //Variable para manejar que se muestren los programas según la facultad
  pFacultad:String="Hola";

  // Variable para gestionar los eventos del calendario
  eventActual: CalendarEvent[];
  eventAct: CalendarEvent;

  option1 = false;
  option2 = false;
  control= false;
  Error=false;
  titulo: String = "Deporte";

  // Variable para configuracion del idioma del calendario
  locale: string = 'es';

  espacio34: EspacioDeportivo;
  
  // Variable con el espacio deportivo seleccionado y sobre el cual se hara la reserva
  @Input() selectEspacio: EspacioDeportivo;
  
  // Variables para gestionar la reserva
  reservaSave: ReservaEspacio;
  reservaAct: ReservaEspacio = new ReservaEspacio(0, new Date(), new Date(),'','', '', '', '', false, null);

  // Lista de reservas registradas en BD
  reservasActuales: ReservaEspacio[];

  // Lista de tipos de reserva
  tipoSelect = [
    { value: 'Academico', text: 'Academico' },  
    { value: 'Normal', text: 'Normal' },
    { value: 'Evento', text: 'Evento' },
    { value: 'Seleccionados', text: 'Seleccionados' },
  ];

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
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
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
  constructor(private modal: NgbModal, private espacioService: EspaciodeportivoService, private cdr: ChangeDetectorRef,  private alertService: AlertService) {
    /*this.inicioDiarioStruct = {
      hour: 2,
      minute: 23,
      second: 0

    };*/
    this.finalDiarioStruct = {
      hour: 2,
      minute: 23,
      second: 0

    };
  }  
  formReserva: FormGroup; // Formulario de reserva

  //------------------------------------------------------------------------------------------------------------------------------------------------------------

  /**
  * Funcion de inicializacion de la clase
  *
  */
  ngOnChanges(changes: SimpleChanges) {
    
    this.getReservasEspacio(); // Se obtienen las reservas del espacio deportivo registradas en BD
    this.titulo = this.selectEspacio.nombre;
    this.formReserva = new FormGroup({ // Creacion del formulario de reserva
      // Campo nombre, ligado a variable: "this.reservaAct.nombre"
      'nombre': new FormControl(this.reservaAct.nombre, [
        Validators.required, // campo requerido
        Validators.maxLength(20)]), // longitud maxima de caracteres permitidos

      // Campo tipo, ligado a variable: "this.reservaAct.tipo"
      'tipo': new FormControl(this.reservaAct.tipo,
        Validators.required), // campo requerido

        // Campo facultad, ligado a variable: "this.reservaAct.facultad"
      'facultad': new FormControl(this.reservaAct.facultad,
        Validators.required), // campo requerido

        // Campo programa, ligado a variable: "this.reservaAct.programa"
      'programa': new FormControl(this.reservaAct.programa,
        Validators.required), // campo requerido

      // Campo descripcion, ligado a variable: "this.reservaAct.descripcion"
      'descripcion': new FormControl(this.reservaAct.descripcion, Validators.maxLength(500)), // longitud maxima de caracteres permitidos 

      // Campo descripcion, ligado a variable: "this.reservaAct.descripcion"
      //'inicioDiarioStruct': new FormControl(this.inicioDiarioStruct),

      // Campo descripcion, ligado a variable: "this.reservaAct.descripcion"
      'finalDiarioStruct': new FormControl(this.finalDiarioStruct),
    });
  }

  cargarProgramas($event){
    this.pFacultad = "Adiós";
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------

  /**
  * Declaracion de constantes utilizadas para definir los colores a usar en las celdas del calendario
  *
  */
  getReservasEspacio() {
    this.espacioService.getReservasEspacio(this.selectEspacio.idEspacio).subscribe(reservas => {
      this.reservasActuales = reservas;
      this.cargarReservas();
    });
  }

  cargarReservas() {
    console.log("lengt" + this.reservasActuales.length);
    for (let i = 0; i < this.reservasActuales.length; i++) {
      //let fechaIni= this.setFecha(this.reservasActuales[i].fechaini);
      //let fechafin = this.setFecha(this.reservasActuales[i].fechafin);
      console.log(this.reservasActuales[i].nombre);
      // console.log("fecha ini"+fechaIni);
      console.log("date" + new Date(this.reservasActuales[i].fechaini));
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

    console.log("Reserva eliminada:" + this.reservasActuales.length);

  }


  onFilteroption1(ischecked: boolean) {
    this.option1 = true;
    this.option2 = false;
  }
  onFilteroption2(ischecked: boolean) {
    this.option2 = true;
    this.option1 = false;
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




    // this.cdr.detectChanges();
  }
  guardarReserva(event) {
    console.log("espacio seleccionado" + this.selectEspacio.nombre);
    const inicio = this.eventAct.start;
    const final = this.eventAct.end;
    let reservaActual = this.reservaAct;
    reservaActual.idEspacio = this.selectEspacio;
    reservaActual.nombre = this.formReserva.get('nombre').value;
    reservaActual.tipo = this.formReserva.get('tipo').value;
    reservaActual.facultad = this.formReserva.get('facultad').value;
    reservaActual.programa = this.formReserva.get('programa').value;
    reservaActual.descripcion=this.formReserva.get('descripcion').value;
    const fechaAct = new Date(); //Fecha actual
    console.log("Es "+ inicio + "<" + fechaAct+"?");
    let horasMaxPermitidas: Boolean=false;
    let HorarioPermitido: Boolean=false;
    if (this.option1) {
      reservaActual.esfija = this.option1;

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
      if(horasMaxPermitidas){
        //Revision que no sea menor que la fecha actual
      if(inicio < fechaAct){
        this.Error=true;
        this.alertService.error("Error! La fecha de inicio no puede ser menor que la fecha actual.");
        console.log("Error! La fecha de inicio no puede ser menor que la fecha actual.");
      }
      //Revision que sea menor la fecha fin que la fecha de inicio
      else if (final > inicio) {
        console.log("Entro en el if");
        while (inicio <= final) {
          console.log("Entro en el bucle");
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
          console.log("Inicio de hora" + inicio);
          console.log("Final de Hora" + inicioCopia);
          console.log("Inicio del evento" + inicioCopia2);
          //aqui se reserva 
          reservaActual.fechaini = inicioCopia2;
          reservaActual.fechafin = inicioCopia;


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
            }
          });
          inicio.setDate(inicio.getDate() + 7);
        }
        
        console.log("Reserva adicionada correctamente");
        this.alertService.success("Ok! La reserva ha sido almacenada.");

      } else {
        //la reserva no puede ser fija
        this.Error=true;
        this.alertService.error("Error! La fecha de finalizacion no puede ser menor que la de inicio.");
        console.log("Error, la fecha de fin es menor o igual que la fecha de inicio.");
      }
      
      this.refresh.next();


      }else {
        this.Error=true;
        this.alertService.error("Error! La reserva no puede durar mas de 1.5 Horas.");
        
      }
      
    }
    else {
      reservaActual.esfija = false;
      /*
      const InicioDate: Date = setHours(
        setMinutes(
          setSeconds(inicio, this.inicioDiarioStruct.second),
          this.inicioDiarioStruct.minute
        ),
        this.inicioDiarioStruct.hour
      );*/
      const InicioDate:Date=this.eventAct.start;
      console.log("Esta es la fecha"+InicioDate);
      let FinalDate: Date=this.eventAct.start;
      FinalDate=setHours(
        setMinutes(
          setSeconds(inicio, this.finalDiarioStruct.second),
          this.finalDiarioStruct.minute
        ),
        this.finalDiarioStruct.hour
      );

      
      //TODO
      switch(1){
        case 7-12:HorarioPermitido=true;
        break;
        case 2-5:HorarioPermitido=true;
        break;
        default:HorarioPermitido=false;

      }
      //FIN TODO
      switch(this.finalDiarioStruct.hour-FinalDate.getHours()){
        case 0:  horasMaxPermitidas=true;
        break;
        case 1: 
          if(this.finalDiarioStruct.minute-FinalDate.getMinutes()<=30){ 
            horasMaxPermitidas=true;
          }else{horasMaxPermitidas=false;}
        break;
        default: horasMaxPermitidas=false;
      
      }
      if(horasMaxPermitidas){
        if(InicioDate < fechaAct){
          this.Error=true;
          this.alertService.error("Error! La fecha de inicio no puede ser menor que la fecha actual.");
          console.log("Error! La fecha de inicio no puede ser menor que la fecha actual.");
        }
        //Revision que sea menor la fecha fin que la fecha de inicio
        else if (FinalDate > inicio) {
        
          reservaActual.fechaini = InicioDate;
          reservaActual.fechafin = FinalDate;
          
          this.espacioService.guardarReservaEspacio(reservaActual).subscribe(reservaActual => { this.reservaSave = reservaActual });
          this.reservasActuales.push(reservaActual);
  
          this.events.push({
            title: this.reservaAct.nombre.toString(),
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
  
        } else {
          //la reserva no puede ser fija
          this.Error=true;
          this.alertService.error("Error! La fecha de finalizacion no puede ser menor que la de inicio.");
          console.log("Error, la fecha de fin es menor o igual que la fecha de inicio.");
        }
  
      }
      else {
        this.Error=true;
        this.alertService.error("Error! una Reserva no puede duras mas de 1.5 Horas");
        console.log("Error, la fecha de fin es menor o igual que la fecha de inicio.");
      }
      
    }
    //this.refresh.next();
  }

  eliminarReserva(event) {
    //console.log("title: " + this.modalData.event.title);

    console.log("ELIMINANDO...");
    let reservaActual;
    //console.log("nombre reserva: " + reservaActual.nombre.toString);
    //console.log("nombre reservaAct: " + this.reservaAct.nombre.toString);
    
    for (let i = 0; i < this.reservasActuales.length; i++) {
      if (this.reservasActuales[i].nombre == this.modalData.event.title) {
        console.log("Reserva encontrada para eliminar: ");
        let reservaActual = this.reservasActuales[i];
        console.log("id Reserva: " + reservaActual.idReserva);

        this.espacioService.eliminarReservaEspacio(reservaActual.idReserva).subscribe(
          ok => { this.control= ok 
            console.log("valor retornado2"+ok);
          }
          );
        console.log("valor retornado"+this.control);
        break;  
      }
    }

  }


  updateTimeInicio(): void {
    //AQUI DEBO HACER EL UPDATE A EL VIEWDATE

  }
  updateTimeFinal(): void {


  }

}
