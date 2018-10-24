import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Elemento } from './elemento';
import { Deporte } from './deporte';
import { ReservaEspacio } from './reservaespacio';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ElementoService {

  private espaciosUrl = 'http://localhost:8084/CRUD_Escenarios/proyectoCDU/Escenario';
    private deportesUrl = 'http://localhost:8084/CRUD_Escenarios/proyectoCDU/Escenario/deportes';

    //------------------------------------------------------------------------------

    constructor(private http: HttpClient, private messageService: MessageService) { }

    //------------------------------------------------------------------------------

    getEspaciosDeportivos(): Observable<Elemento[]> {
        return this.http.get<Elemento[]>(this.espaciosUrl).pipe(tap(espacios => this.log(`fetched heroes`)), catchError(this.handleError('getEspaciodeportivos', [])));
    }

    //------------------------------------------------------------------------------

    getDeportes(): Observable<Deporte[]> {
        return this.http.get<Deporte[]>(this.deportesUrl).pipe(tap(deportes => this.log(`fetched deportes`)), catchError(this.handleError('getDeportes', [])));
    }

    //------------------------------------------------------------------------------

    //------------------------------------------------------------------------------

    guardarEspacioDeportivo(newEspacio: Elemento): Observable<Elemento> {
        //        let json = JSON.stringify(newEspacio);
        console.log(newEspacio);
        //        const url= '${this.espaciosUrl}/Agregar';
        return this.http.post<Elemento>(this.espaciosUrl, newEspacio, httpOptions).pipe(
            tap((newEspacio: Elemento) => this.log('added hero w/ id=${newEspacio.idEspacio}')),
            catchError(this.handleError<Elemento>('addHero'))
        );
    }

    //------------------------------------------------------------------------------

    actualizarEspacioDeportivo(newEspacio: Elemento): Observable<Boolean> {
        //        let json = JSON.stringify(newEspacio);
        console.log(newEspacio);
        //        const url= '${this.espaciosUrl}/Agregar';
        return this.http.put<Boolean>(this.espaciosUrl, newEspacio, httpOptions).pipe(
            tap(ok => this.log(`updated hero w/ id=${newEspacio.idEspacio}`)),
            catchError(this.handleError<Boolean>('updateHero'))
        );
    }

    //------------------------------------------------------------------------------

    eliminarEspacioDeportivo(newEspacio: Elemento | number): Observable<Boolean> {
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

    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }
    getEscenariosforid(id: number): Observable<Elemento[]> {
        const url = `${this.espaciosUrl}/EspacioDeporte/${id}`;
        return this.http.get<Elemento[]>(url)
            .pipe(
                tap(escenarios => this.log(`fetched hero id=${id}`)),
                catchError(this.handleError('getEscenariosforid', []))
            );
    }
    guardarReservaEspacio(reservaActual: ReservaEspacio): Observable<ReservaEspacio> {
        console.log(reservaActual);
        const url = `${this.espaciosUrl}/AgregarReserva`;
        return this.http.post<ReservaEspacio>(url, reservaActual, httpOptions).pipe(
            tap((reservaActual: ReservaEspacio) => this.log('added Reserva w/ id=${reservaActual.idReserva}')),
            catchError(this.handleError<ReservaEspacio>('addReserva'))
        );

    }
    getReservasEspacio(idespacio: number): Observable<ReservaEspacio[]> {
        console.log(idespacio);
        const url = `${this.espaciosUrl}/Reserva/${idespacio}`;
        return this.http.get<ReservaEspacio[]>(url)
            .pipe(
                tap(reservas => this.log(`fetched reservas id=${idespacio}`)),
                catchError(this.handleError('getReservasEspacio', []))
            );
    }


    eliminarReservaEspacio(reservaActual: ReservaEspacio | number): Observable<boolean> {
        //        let json = JSON.stringify(newEspacio);
        console.log(reservaActual);
        const id = typeof reservaActual === 'number' ? reservaActual : reservaActual.idEspacio;
        const url = `${this.espaciosUrl}/ReservaDelete/${id}`;
        //        const url= '${this.espaciosUrl}/Agregar';
        return this.http.delete<boolean>(url, httpOptions).pipe(
            tap(ok => this.log('deleted Reserva w/ id=${id}')),
            catchError(this.handleError<boolean>('deleteReserva'))
        );
    }


}
