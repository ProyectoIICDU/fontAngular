/**
 * Importaciones angular para manejo de componentes, comunicacion componentes 
 * y método inicio onInit
 */
import { Component, OnInit,ViewChild } from '@angular/core';

/**
 * Import para manejar objetos ts de tipo deporte
 */
import { Deporte } from '../deporte';

/**
 * Import para manejar los servicios del componente espacios deportivos
 */
import { EspaciodeportivoService } from '../espaciodeportivo.service';

/**
 * Import para manejar los servicios del componente de editar reserva
 */
import { EdicionReservaService } from '../edicion-reserva.service';

/**
 * Import para manejar objetos de espacio deportivo
 */
import { EspacioDeportivo} from '../espaciodeportivo';

/**
 * Import para manejar modales de bootstrap
 */
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Import para manejar el componente calendario
 */
import { CalendarComponent } from '../calendar/calendar.component';


@Component({
  selector: 'app-reserva-elemento',
  templateUrl: './reserva-elemento.component.html',
  styleUrls: ['./reserva-elemento.component.css'],
  providers: [EdicionReservaService]
})
export class ReservaElementoComponent implements OnInit {

  @ViewChild (CalendarComponent) calendario; //Componente calendario como componente hijo
  private deportes:Deporte[]; // Arreglo que contiene los deportes disponibles
 
  private horaI = "7 am";
  private horaF = "9 am";
  selectedDeporte:Deporte ; // Deporte seleccionado en la vista
  selectedEspacio:EspacioDeportivo; // Espacio deportivo seleccionado en la vista
   private escenarios: EspacioDeportivo[]; // Arreglo que contiene los espacios deportivos


  constructor(private espacioService:EspaciodeportivoService, 
    private edicionReservaService:EdicionReservaService) { }
   
  /**
   * Método que se activa al cargar el componente
   */
  ngOnInit() {
  	this.getDeportes();
  }

  /**
   * Método que obtiene y carga el vector asignado con los deportes disponibles
   */
  getDeportes(): void {
    this.espacioService.getDeportes()
    .subscribe(deportes => this.deportes = deportes);
    
  }

  /**
   * Método que carga los escenarios deportivos asociados a un deporte seleccionado
   * @param event Evento que activa el método, en este caso onChangeModel
   */
  selectDeporte(event){
  console.log(event.nombre);
    this.getEscenarioDeportivos(event.idDeporte);
  }
 
  /**
   * Método para obtener el escenario deportivo dado el identificador del deporte
   * @param idDeporte id del deporte seleccionado en la vista
   */
  getEscenarioDeportivos(idDeporte):void{
    this.espacioService.getEscenariosforid(idDeporte).subscribe(escenarios=> this.escenarios = escenarios);
  }

  history: string[] = [];
  
  /**
   * Anunciar cambio en los componentes suscritos
   */
  announce() {
    this.edicionReservaService.cambiarHoraReserva(this.horaI, this.horaF);
    this.history.push(`Hora Inicial: "${this.horaI}"`);
    this.history.push(`Hora Final: "${this.horaF}"`);

  }


}
