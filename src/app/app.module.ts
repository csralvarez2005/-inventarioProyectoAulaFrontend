import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarFuncionariosComponent } from './components/listar-funcionarios/listar-funcionarios.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CrearFuncionarioComponent } from './components/crear-funcionario/crear-funcionario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarAreaComponent } from './components/listar-area/listar-area.component';
import { CrearAreaComponent } from './components/crear-area/crear-area.component';
import { ListarEquiposComponent } from './components/listar-equipos/listar-equipos.component';
import { CrearEquipoComponent } from './components/crear-equipo/crear-equipo.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';  // Ruta correcta al interceptor

@NgModule({
  declarations: [
    AppComponent,
    ListarFuncionariosComponent,
    DashboardComponent,
    CrearFuncionarioComponent,
    ListarAreaComponent,
    CrearAreaComponent,    
    ListarEquiposComponent, 
    CrearEquipoComponent, 
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,   // Asegúrate de tener esto
    ReactiveFormsModule,
    FormsModule  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  // Este proveedor está bien
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
