import { Injectable } from '@angular/core';
import { MessageService } from '../message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
 
import { Usuario } from '../modelos/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class UsuarioService {

    private usuariosUrl = 'http://localhost:8084/CRUD_Escenarios/proyectoCDU/Escenario';
    
    constructor(private http: HttpClient,private messageService: MessageService) { }
 
    getAll() {
        return this.http.get<Usuario[]>('/api/usuarios');
    }
 
    getById(id: number) {
        return this.http.get('/api/usuarios/' + id);
    }
 
    create(Usuario: Usuario) {
        return this.http.post('/api/usuarios', Usuario);
    }
 
    update(Usuario: Usuario) {
        return this.http.put('/api/usuarios/' + Usuario.idUsuario, Usuario);
    }
 
    delete(id: number) {
        return this.http.delete('/api/usuarios/' + id);
    }
    getUsuariosNoValidos(): Observable<Usuario[]> {
        const url = `${this.usuariosUrl}/Usuarios`;
        console.log("maaalo");
        return this.http.get<Usuario[]>(url).pipe(tap(usuarios => this.log(`fetched Usuarios`)), catchError(this.handleError('getUsuariosNoValidos', [])));
    }
    cambiarEstado(usuario:Usuario):Observable<Boolean>{
        const url = `${this.usuariosUrl}/CambiarUsuario`;
        return this.http.put<Boolean>(url, usuario, httpOptions).pipe(
            tap(ok => this.log(`updated usuario w/ id=${usuario.idUsuario}`)),
            catchError(this.handleError<Boolean>('updateUsuario'))
        );

    }

    identicarRol(usu: String): Observable<boolean>
    {
        const url = `${this.usuariosUrl}/IdentificarUsuarios/${usu}`; 
        return this.http.get<boolean>(url).pipe(
            tap(ok => this.log(`updated usuario w/ id=${usu}`)),
            catchError(this.handleError<boolean>('identificarRol'))
        ); 
    }
    
    //Mensajes de error 
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



}