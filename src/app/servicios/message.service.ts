import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {//Servicio para mensajes, solo se crea un esqueleto para usar el servicio de 
  //mensajes. Se crea un array de strings para los mensajes y posterior a ello se crean los métodos add y clear                      
  messages: string[] = [];

  //Se hace un push al array de los mensajes que se van a incluir
  add(message: string) {
    this.messages.push(message);
  }

  //Se pone vacio el array para limpiar los mensajes agregados 
  clear() {
    this.messages = [];
  }
}	
