import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ReservaUsuario } from './reservausuario';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Usuario } from './modelos';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * Servicio para manejar peticiones al servidor relacionadas con los espacios reservados
 */

@Injectable()

export class EspaciosreservadosService {

private reservasUrl = 'http://localhost:8084/CRUD_Escenarios/proyectoCDU/Escenario/EspaciosReservados';
private usuariosUrl = 'http://localhost:8084/CRUD_Escenarios/proyectoCDU/Escenario';

  constructor(private http: HttpClient, private messageService: MessageService) { }
  
  /**
   * Metodo que carga los espacios reservados por un usuario
   * @param id id del usuario que reservó
   */
  cargarEspaciosReservados(id: String): Observable<ReservaUsuario[]>{
    
    const url = `${this.reservasUrl}/${id}`;
        return this.http.get<ReservaUsuario[]>(url)
        .pipe(
            tap(reservas => this.log(`fetched heroes id=${id}`)), 
            catchError(this.handleError('getEspacioreservado', [])));   

  }
 

    /**
     * Método para el manejo de errores
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /**
     * Método para el manejo de debug/log
     * @param message mensaje a presentar
     */
    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }
  
}

