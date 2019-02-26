import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HorarioOcupado } from '../horarioOcupado';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HorarioOcupadoService {

  private url_hor = 'http://localhost:8084/CRUD_Escenarios/proyectoCDU/Escenario/HorarioReservado';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getAllHorarios(): Observable<HorarioOcupado[]>{

    return this.http.get<HorarioOcupado[]>(this.url_hor).pipe(tap(reservas => this.log(`fetched heroes`)), catchError(this.handleError('getHorarioOcupado', [])));
  }

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

}
