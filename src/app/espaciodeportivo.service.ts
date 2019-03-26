import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { EspacioDeportivo } from './espaciodeportivo';
import { Deporte } from './deporte';
import { ReservaEspacio } from './reservaespacio';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * Este servicio se encarga de brindar peticiones al servidor relacionados a los espacios deportivos
 */

@Injectable()
export class EspaciodeportivoService {
    private espaciosUrl = 'http://localhost:8084/CRUD_Escenarios/proyectoCDU/Escenario';
    private deportesUrl = 'http://localhost:8084/CRUD_Escenarios/proyectoCDU/Escenario/deportes';

    //------------------------------------------------------------------------------

    constructor(private http: HttpClient, private messageService: MessageService) { }

    //------------------------------------------------------------------------------

    /**
     * Este método obtiene por petición get todos los espacios deportivos
     */
    getEspaciosDeportivos(): Observable<EspacioDeportivo[]> {
        return this.http.get<EspacioDeportivo[]>(this.espaciosUrl).pipe(tap(espacios => this.log(`fetched heroes`)), catchError(this.handleError('getEspaciodeportivos', [])));
    }

    //------------------------------------------------------------------------------

    /**
     * Este método obtiene por petición get todos los deportes
     */
    getDeportes(): Observable<Deporte[]> {
        return this.http.get<Deporte[]>(this.deportesUrl).pipe(tap(deportes => this.log(`fetched deportes`)), catchError(this.handleError('getDeportes', [])));
    }

    //------------------------------------------------------------------------------

    //------------------------------------------------------------------------------
    /**
     * Este metodo guarda por peticion post un nuevo espacio deportivo
     * @param newEspacio Espacio deportivo del tipo espaciodeportivo.ts
     */
    guardarEspacioDeportivo(newEspacio: EspacioDeportivo): Observable<EspacioDeportivo> {
        //        let json = JSON.stringify(newEspacio);
        console.log(newEspacio);
        //        const url= '${this.espaciosUrl}/Agregar';
        return this.http.post<EspacioDeportivo>(this.espaciosUrl, newEspacio, httpOptions).pipe(
            tap((newEspacio: EspacioDeportivo) => this.log('added hero w/ id=${newEspacio.idEspacio}')),
            catchError(this.handleError<EspacioDeportivo>('addHero'))
        );
    }

    //------------------------------------------------------------------------------

    /**
     * Este método actualiza el espacio deportivo por medio de peticion put al servidor
     * @param newEspacio objeto espaciodeportivo.ts con las modificaciones
     */
    actualizarEspacioDeportivo(newEspacio: EspacioDeportivo): Observable<Boolean> {
        //        let json = JSON.stringify(newEspacio);
        console.log(newEspacio);
        //        const url= '${this.espaciosUrl}/Agregar';
        return this.http.put<Boolean>(this.espaciosUrl, newEspacio, httpOptions).pipe(
            tap(ok => this.log(`updated hero w/ id=${newEspacio.idEspacio}`)),
            catchError(this.handleError<Boolean>('updateHero'))
        );
    }

    //------------------------------------------------------------------------------

    /**
     * Método que elimina un espacio deportivo por medio de una peticion de delete al servidor
     * @param newEspacio espacio deportivo a eliminar
     */
    eliminarEspacioDeportivo(newEspacio: EspacioDeportivo | number): Observable<Boolean> {
        //        let json = JSON.stringify(newEspacio);
        console.log(newEspacio);
        const id = typeof newEspacio === 'number' ? newEspacio : newEspacio.idEspacio;
        const url = `${this.espaciosUrl}/${id}`;
        //        const url= '${this.espaciosUrl}/Agregar';
        return this.http.delete<Boolean>(url, httpOptions).pipe(
            tap(ok => this.log('deleted hero w/ id=${newEspacio.idEspacio}')),
            catchError(this.handleError<Boolean>('deleteHero'))
        );
    }



    //------------------------------------------------------------------------------
    /**
     * Manejador de errores de peticiones al servidor
     * @param operation operacion que se realiza en el servidor
     * @param result error que se ha presentado en el servidor
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
     * Método para manejar un log debug
     * @param message mensaje a presentar
     */
    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }

    /**
     * Obtiene un espacio deportivo asociado a un id
     * @param id id del escenario a buscar
     */
    getEscenariosforid(id: number): Observable<EspacioDeportivo[]> {
        const url = `${this.espaciosUrl}/EspacioDeporte/${id}`;
        return this.http.get<EspacioDeportivo[]>(url)
            .pipe(
                tap(escenarios => this.log(`fetched hero id=${id}`)),
                catchError(this.handleError('getEscenariosforid', []))
            );
    }

    /**
     * Metodo que hace una peticion post al servidor para almacenar una reserva
     * @param reservaActual reserva a reservar
     */
    guardarReservaEspacio(reservaActual: ReservaEspacio): Observable<ReservaEspacio> {
        console.log(reservaActual);
        const url = `${this.espaciosUrl}/AgregarReserva`;
        return this.http.post<ReservaEspacio>(url, reservaActual, httpOptions).pipe(
            tap((reservaActual: ReservaEspacio) => this.log('added Reserva w/ id=${reservaActual.idReserva}')),
            catchError(this.handleError<ReservaEspacio>('addReserva'))
        );

    }

    /**
     * Método que obtiene las reservar que ha realizado un usuario en un espacio
     * @param idespacio id del espacio a consultar
     * @param usu usuario a consultar sus reservas
     */
    getReservasEspacio(idespacio: number, usu: String): Observable<ReservaEspacio[]> {
        console.log(idespacio);
        const url = `${this.espaciosUrl}/Reserva/${idespacio},${usu}`;
        return this.http.get<ReservaEspacio[]>(url)
            .pipe(
                tap(reservas => this.log(`fetched reservas id=${idespacio},usu=${usu}`)),
                catchError(this.handleError('getReservasEspacio', []))
            );
    }

    /**
     * Método que hace una peticion delete para eliminar una reserva del servidor
     * @param reservaActual reserva a eliminar
     */
    eliminarReservaEspacio(reservaActual: ReservaEspacio | number): Observable<boolean> {
        //        let json = JSON.stringify(newEspacio);
        console.log("id de reserva"+reservaActual);
        const id = typeof reservaActual === 'number' ? reservaActual : reservaActual.idEspacio;
        const url = `${this.espaciosUrl}/ReservaDelete/${id}`;
        //        const url= '${this.espaciosUrl}/Agregar';
        return this.http.delete<boolean>(url, httpOptions).pipe(
            tap(ok => this.log('deleted Reserva w/ id=${id}')),
            catchError(this.handleError<boolean>('deleteReserva'))
        );
    }

}
