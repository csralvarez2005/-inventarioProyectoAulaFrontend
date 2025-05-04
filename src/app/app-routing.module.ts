import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFuncionariosComponent } from './components/listar-funcionarios/listar-funcionarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CrearFuncionarioComponent } from './components/crear-funcionario/crear-funcionario.component';
import { ListarAreaComponent } from './components/listar-area/listar-area.component';
import { CrearAreaComponent } from './components/crear-area/crear-area.component';
import { ListarEquiposComponent } from './components/listar-equipos/listar-equipos.component';
import { CrearEquipoComponent } from './components/crear-equipo/crear-equipo.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'listar-funcionarios', component: ListarFuncionariosComponent },
  { path: 'listar-area', component: ListarAreaComponent },
  { path: 'listar-equipos', component: ListarEquiposComponent },
  { path: 'crear-funcionario', component: CrearFuncionarioComponent },
  { path: 'crear-area', component: CrearAreaComponent },
  { path: 'crear-equipo', component: CrearEquipoComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
