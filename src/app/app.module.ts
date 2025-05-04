import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarFuncionariosComponent } from './components/listar-funcionarios/listar-funcionarios.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CrearFuncionarioComponent } from './components/crear-funcionario/crear-funcionario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarAreaComponent } from './components/listar-area/listar-area.component';
import { CrearAreaComponent } from './components/crear-area/crear-area.component';
import { ListarEquiposComponent } from './components/listar-equipos/listar-equipos.component';
import { CrearEquipoComponent } from './components/crear-equipo/crear-equipo.component';


@NgModule({
  declarations: [
    AppComponent,
    ListarFuncionariosComponent,
    DashboardComponent,
    CrearFuncionarioComponent,
    ListarAreaComponent,
    CrearAreaComponent,    
    ListarEquiposComponent, CrearEquipoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
