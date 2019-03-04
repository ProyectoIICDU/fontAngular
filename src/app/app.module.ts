import { registerLocaleData, CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule }     from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import localeEs from '@angular/common/locales/es';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
 

import { AppComponent } from './app.component';
import { EspacioDeportivosComponent } from './espacio-deportivos/espacio-deportivos.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { EspaciodeportivoService } from './espaciodeportivo.service';
import { AgregarescenarioComponent } from './escenario/agregarescenario/agregarescenario.component';
import { MostrarFotoComponent } from './mostrar-foto/mostrar-foto.component';
import { HorarioFijoComponent } from './horario-fijo/horario-fijo.component';
import { EdicionReservaComponent } from './edicion-reserva/edicion-reserva.component';
import { MenuNavegacionComponent } from './menu-navegacion/menu-navegacion.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DemoUtilsModule } from '../demo-utils/module';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/index';

import { fakeBackendProvider } from './helpers/index';
import { Autenticacion } from './autenticacion/index';
import { JwtInterceptor } from './helpers/index';
import { AlertService, UsuarioService, AutenticacionService} from './servicios/index';
import { AlertComponent } from './alertas/index';
import { ValidarusuariosComponent } from './validarusuarios/validarusuarios.component';
import { EspaciosReservadosComponent } from './espacios-reservados/espacios-reservados.component';
import { EspaciosreservadosService } from './espaciosreservados.service';
import { ElementoComponent } from './elemento/elemento.component';
import { ElementoService } from './elemento.service';
import { ReservaElementoComponent } from './reserva-elemento/reserva-elemento.component';

registerLocaleData(localeEs);


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("943828172671-gd9g64150n4gt8u5sep7tg691phjilmr.apps.googleusercontent.com")
  }]);

  export function provideConfig() {
    return config;
  }
   


@NgModule({
  declarations: [
    AppComponent,
    EspacioDeportivosComponent,
    MessagesComponent,
    AgregarescenarioComponent,
    MostrarFotoComponent,
    HorarioFijoComponent,
    EdicionReservaComponent,
    MenuNavegacionComponent,
    CalendarComponent,
    LoginComponent,
    RegistroComponent,
    AlertComponent,
    ValidarusuariosComponent,
    EspaciosReservadosComponent,
    ElementoComponent,
    ReservaElementoComponent,
    
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot(),
    
    DemoUtilsModule,
    CommonModule
  ],
  providers: [
    MessageService,
    EspaciodeportivoService,
    Autenticacion,
    AutenticacionService,
    AlertService,
    EspaciosreservadosService,
    ElementoService,
    UsuarioService,
    {
      
      
        provide: HTTP_INTERCEPTORS,        
        useClass: JwtInterceptor,
        multi: true
    },
    {
      
      provide: AuthServiceConfig,
       useFactory: provideConfig
    },

    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
	title = 'Reservas CDU';
 }
