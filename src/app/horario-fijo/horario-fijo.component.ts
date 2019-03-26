/**
 * Import para Creacion de componentes y el método OnInit del component, ViewChild para 
 * comunicacion de variables entre componentes hijo-padre
 */
import { Component, OnInit, ViewChild} from '@angular/core';
/**
 * Import para instanciar objetos deporte
 */
import { Deporte } from '../deporte';
/**
 * Import para usar los servicios del componente espacio deportivo
 */
import { EspaciodeportivoService } from '../espaciodeportivo.service';
/**
 * Import para usar los servicios de edicion de reserva
 */
import { EdicionReservaService } from '../edicion-reserva.service';
/**
 * Import para intanciar objetos de espacio deportivo
 */
import { EspacioDeportivo} from '../espaciodeportivo';
/**
 * Import para el uso de modales de bootstrap
 */
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/**
 * Import para el uso del calendar component
 */
import { CalendarComponent } from '../calendar/calendar.component'


@Component({
  selector: 'app-horario-fijo',
  templateUrl: './horario-fijo.component.html',
  styleUrls: ['./horario-fijo.component.css'],
  providers: [EdicionReservaService]
})
export class HorarioFijoComponent implements OnInit {

  @ViewChild (CalendarComponent) calendario; // El calendario como un componente hijo del componente horario (this)
  private deportes:Deporte[]; //Vector para almacenar los deportes asociados
 
  private horaI = "7 am";
  private horaF = "9 am";
  selectedDeporte:Deporte ; // Variable que almacena el deporte seleccionado en la vista
  selectedEspacio:EspacioDeportivo; // Variable que almacena el espacio deportivo seleccionado en la vista
  private escenarios: EspacioDeportivo[]; // Variable que carga los escenarios deportivos desde el backend


  constructor(private espacioService:EspaciodeportivoService, 
    private edicionReservaService:EdicionReservaService) { }
   
  /**
   * Método OnInit que se activa al cargar la página
   */
  ngOnInit() {
  	this.getDeportes();
  }

  /**
   * Método que obtiene y carga los deportes disponibles desde el backend
   */
  getDeportes(): void {
    this.espacioService.getDeportes()
    .subscribe(deportes => this.deportes = deportes);
    
  }

  /**
   * Método que carga los escerarios deportivos dado un deporte seleccionado
   * @param event evento que activa el método, para este caso es un metodo onModelChange()
   */
  selectDeporte(event){
    this.selectedEspacio = null;
    console.log(event.nombre);
    this.getEscenarioDeportivos(event.idDeporte);
  }
 
  /**
   * Método que obtiene los escenarios deportivos asociados a un deporte en específico
   * @param idDeporte id del deporte del que se desea consultar los escenarios
   */
  getEscenarioDeportivos(idDeporte):void{
    this.espacioService.getEscenariosforid(idDeporte).subscribe(escenarios=> this.escenarios = escenarios);
  }

  history: string[] = [];
  
  /**
   * Método que anuncia cambios a los suscritos
   */
  announce() {
    this.edicionReservaService.cambiarHoraReserva(this.horaI, this.horaF);
    this.history.push(`Hora Inicial: "${this.horaI}"`);
    this.history.push(`Hora Final: "${this.horaF}"`);

  }

}