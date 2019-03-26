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
export class UsuarioService {//Servicio para validar los usuarios que esten haciendo alguna operación en el front

    //url para consumir el servicio referente a usarios en el back
    private usuariosUrl = 'http://localhost:8084/CRUD_Escenarios/proyectoCDU/Escenario';
    
    constructor(private http: HttpClient,private messageService: MessageService) { }
 
    //Método para obtener los usuarios registrados en el back, a través del método get  
    getAll() {
        return this.http.get<Usuario[]>('/api/usuarios');
    }
 
    //Método para obtener un usuario registrado en el back, a través del método get, con su Id
    getById(id: number) {
        return this.http.get('/api/usuarios/' + id);
    }
 
    //Método post para crear un nuevo usuario, se accede al servicio en el back a través de la url
    create(Usuario: Usuario) {
        return this.http.post('/api/usuarios', Usuario);
    }
 
    //Método put para actualizar un usuario, se accede al servicio en el back a través de la url
    update(Usuario: Usuario) {
        return this.http.put('/api/usuarios/' + Usuario.idUsuario, Usuario);
    }
 
    //Método delete para eliminar un usuario, se accede al servicio en el back a través de la url
    delete(id: number) {
        return this.http.delete('/api/usuarios/' + id);
    }

    //El método obtiene una lista de los usuarios que son validos para realizar operaciones
    getUsuariosNoValidos(): Observable<Usuario[]> {
        const url = `${this.usuariosUrl}/Usuarios`;
        console.log("maaalo");
        return this.http.get<Usuario[]>(url).pipe(tap(usuarios => this.log(`fetched Usuarios`)), catchError(this.handleError('getUsuariosNoValidos', [])));
    }

    //Con este método put, actualiza el estado del usuario en el back, a traves de la url 
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

    /**
     * Este método hace la petición de get al backend para validar el rol
     * dado el nombre de usuario. El método del backend retorna true or false.
     */
    validarRolUsuario(nombreUsuario: string): Observable<boolean> {
        const url = `${this.usuariosUrl}/ValidarAdmin/${nombreUsuario}`;
        console.log('peticion a ' + url);
        return this.http.get<boolean>(url, httpOptions).pipe(
            tap(ok => this.log('consultado el usuario ${nombreUsuario}')),
            catchError(this.handleError<boolean>('validarAdmin'))
        );
    }

}