import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EspacioDeportivosComponent } from './espacio-deportivos/espacio-deportivos.component';
import { AgregarescenarioComponent } from './escenario/agregarescenario/agregarescenario.component';
import { HorarioFijoComponent } from './horario-fijo/horario-fijo.component';
import { MostrarFotoComponent } from './mostrar-foto/mostrar-foto.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Autenticacion } from './autenticacion/index';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/index';
import { ValidarusuariosComponent } from './validarusuarios/validarusuarios.component';



const routes: Routes = [
  { path: '', component: EspacioDeportivosComponent, canActivate: [Autenticacion] },
  { path: 'espaciodeportivos', component: EspacioDeportivosComponent, canActivate: [Autenticacion]  },
  { path: 'agregarescenario', component: AgregarescenarioComponent },
  { path: 'horariofijo', component: HorarioFijoComponent , canActivate: [Autenticacion]},
  { path: 'validarusuarios', component: ValidarusuariosComponent , canActivate: [Autenticacion]},
  { path: 'mostrarfoto', component: MostrarFotoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
