
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

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

export class CalendarComponent implements OnInit {

  // Estructuras usadas para la inicializcion del calendario
  inicioDiarioStruct = {
    hour: 2,
    minute: 23,
    second: 0

  };
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

  // Variable para gestionar los eventos del calendario
  eventActual: CalendarEvent[];
  eventAct: CalendarEvent;

  option1 = false;
  option2 = false;
  control= false;

  // Variable para configuracion del idioma del calendario
  locale: string = 'es';

  espacio34: EspacioDeportivo;
  
  // Variable con el espacio deportivo seleccionado y sobre el cual se hara la reserva
  @Input() selectEspacio: EspacioDeportivo;
  
  // Variables para gestionar la reserva
  reservaSave: ReservaEspacio;
  reservaAct: ReservaEspacio = new ReservaEspacio(0, new Date(), new Date(), '', '', '', false, null);

  // Lista de reservas registradas en BD
  reservasActuales: ReservaEspacio[];

  // Lista de tipos de reserva
  tipoSelect = [
    { value: 'Academico', text: 'Academico' },  
    { value: 'Normal', text: 'Normal' },
    { value: 'Evento', text: 'Evento' },
    { value: 'Seleccionados', text: 'Seleccionados' },
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
    this.inicioDiarioStruct = {
      hour: 2,
      minute: 23,
      second: 0

    };
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
  ngOnInit() {
    this.getReservasEspacio(); // Se obtienen las reservas del espacio deportivo registradas en BD
    this.formReserva = new FormGroup({ // Creacion del formulario de reserva
      // Campo nombre, ligado a variable: "this.reservaAct.nombre"
      'nombre': new FormControl(this.reservaAct.nombre, [
        Validators.required, // campo requerido
        Validators.maxLength(20)]), // longitud maxima de caracteres permitidos

      // Campo tipo, ligado a variable: "this.reservaAct.tipo"
      'tipo': new FormControl(this.reservaAct.tipo,
        Validators.required), // campo requerido

      // Campo descripcion, ligado a variable: "this.reservaAct.descripcion"
      'descripcion': new FormControl(this.reservaAct.descripcion, Validators.maxLength(500)), // longitud maxima de caracteres permitidos 

      // Campo descripcion, ligado a variable: "this.reservaAct.descripcion"
      'inicioDiarioStruct': new FormControl(this.inicioDiarioStruct),

      // Campo descripcion, ligado a variable: "this.reservaAct.descripcion"
      'finalDiarioStruct': new FormControl(this.finalDiarioStruct),
    });
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
    
    console.log("reserva:" + this.reservasActuales.length);

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
  }
  onFilteroption2(ischecked: boolean) {
    this.option2 = true;
    this.option1 = false;

    this.inicioDiarioStruct = {
      second: getSeconds(this.viewDate),
      minute: getMinutes(this.viewDate),
      hour: getHours(this.viewDate)
    };

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
    reservaActual.descripcion=this.formReserva.get('descripcion').value;
    if (this.option1) {
      reservaActual.esfija = this.option1;

      console.log("inicio1" + inicio);
      console.log("inicio2:" + final);
      //inicio.setDate(inicio.getDate()+7);
      console.log("inicio" + inicio);
      if (final > inicio) {
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
        this.alertService.error("Error! La fecha de finalizacion no puede ser menor que la de inicio.");
        console.log("Error, la fecha de fin es menor o igual que la fecha de inicio.");
      }
      
      this.refresh.next();

    }
    else {
      reservaActual.esfija = this.option2;
      const InicioDate: Date = setHours(
        setMinutes(
          setSeconds(inicio, this.inicioDiarioStruct.second),
          this.inicioDiarioStruct.minute
        ),
        this.inicioDiarioStruct.hour
      );

      const FinalDate: Date = setHours(
        setMinutes(
          setSeconds(final, this.finalDiarioStruct.second),
          this.finalDiarioStruct.minute
        ),
        this.finalDiarioStruct.hour
      );
      console.log("Inicio de Reserva" + InicioDate);
      console.log("Final de Reserva" + FinalDate);

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

    }
    this.refresh.next();
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
