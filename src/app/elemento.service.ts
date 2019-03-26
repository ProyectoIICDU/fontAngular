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

    //Urls que se necesitan para consumir los servicios que estan en el backend
    private espaciosUrl = 'http://localhost:8084/CRUD_Escenarios/proyectoCDU/Escenario';
    private deportesUrl = 'http://localhost:8084/CRUD_Escenarios/proyectoCDU/Escenario/deportes';

    //------------------------------------------------------------------------------

    constructor(private http: HttpClient, private messageService: MessageService) { }

    //------------------------------------------------------------------------------

    //Se obtienen los elementos deportivos que estan registrados, una lista de todos ellos
    getElementosDeportivos(): Observable<Elemento[]> {


        return this.http.get<Elemento[]>(this.espaciosUrl).pipe(tap(espacios => this.log(`fetched heroes`)), catchError(this.handleError('getEspaciodeportivos', [])));

    }
    //------------------------------------------------------------------------------

    //En este metodo se obtienen todos los deportes que se encuentran registrados, estos se reciben en una lista
    //con los datos creados en la clase Deporte.ts
    getDeportes(): Observable<Deporte[]> {
        return this.http.get<Deporte[]>(this.deportesUrl).pipe(tap(deportes => this.log(`fetched deportes`)), catchError(this.handleError('getDeportes', [])));
    }

    //------------------------------------------------------------------------------

    //------------------------------------------------------------------------------

    //Para guardar un nuevo elemento o elementos, se debe usar un metodo post que acceda al servicio 
    //y lo consuma en el backend
    guardarElementoDeportivo(newEspacio: Elemento): Observable<Elemento> {
        //        let json = JSON.stringify(newEspacio);
        console.log(newEspacio);
        //        const url= '${this.espaciosUrl}/Agregar';
        return this.http.post<Elemento>(this.espaciosUrl, newEspacio, httpOptions).pipe(
            tap((newEspacio: Elemento) => this.log('added hero w/ id=${newEspacio.idEspacio}')),
            catchError(this.handleError<Elemento>('addHero'))
        );
    }

    //------------------------------------------------------------------------------

    //Este metodo put, se usa para poder actualizar los espacios deportivos  
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

    //El metodo eliminar espacio deportivo usa una peticion delete y elimina el espacio
    //conociendo el id de ese espacio deportivo. Se accede al servicio por la url
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

    //Se obtienen los escenarios por el id que se proporcione, este es una peticion get, que accede al 
    //servicio en el back a traves de la url correspondiente
    getEscenariosforid(id: number): Observable<Elemento[]> {
        const url = `${this.espaciosUrl}/EspacioDeporte/${id}`;
        return this.http.get<Elemento[]>(url)
            .pipe(
                tap(escenarios => this.log(`fetched hero id=${id}`)),
                catchError(this.handleError('getEscenariosforid', []))
            );
    }

    //Este metodo guarda la reserva del espacio, a traves de una peticion post, se envia un conjunto
    //de datos que se pueden ver en ReservaEspacio.ts, este conjunto de datos esta encapsulado en un json 
    guardarReservaEspacio(reservaActual: ReservaEspacio): Observable<ReservaEspacio> {
        console.log(reservaActual);
        const url = `${this.espaciosUrl}/AgregarReserva`;
        return this.http.post<ReservaEspacio>(url, reservaActual, httpOptions).pipe(
            tap((reservaActual: ReservaEspacio) => this.log('added Reserva w/ id=${reservaActual.idReserva}')),
            catchError(this.handleError<ReservaEspacio>('addReserva'))
        );

    }

    //A traves de una peticion get, se obtienen los espacios reservados hasta la fecha, esto para que no se puedan 
    //agregar mas reservas en las que ya estan y el usuario sepa cuales estan disponibles
    getReservasEspacio(idespacio: number): Observable<ReservaEspacio[]> {
        console.log(idespacio);
        const url = `${this.espaciosUrl}/Reserva/${idespacio}`;
        return this.http.get<ReservaEspacio[]>(url)
            .pipe(
                tap(reservas => this.log(`fetched reservas id=${idespacio}`)),
                catchError(this.handleError('getReservasEspacio', []))
            );
    }


    //Este metodo elimina una reserva, a traves de una peticion delete, para ello se le envia
    //el id de la reserva a ser eliminada y estos datos se envian al backend a traves de la url
    //y devuelve una confirmacion a traves de un booleano
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
