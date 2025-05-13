import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router'; 
import { ListarFuncionariosComponent } from './components/listar-funcionarios/listar-funcionarios.component'; 
import { DashboardComponent } from './components/dashboard/dashboard.component'; 
import { CrearFuncionarioComponent } from './components/crear-funcionario/crear-funcionario.component'; 
import { ListarAreaComponent } from './components/listar-area/listar-area.component'; 
import { CrearAreaComponent } from './components/crear-area/crear-area.component'; 
import { ListarEquiposComponent } from './components/listar-equipos/listar-equipos.component'; 
import { CrearEquipoComponent } from './components/crear-equipo/crear-equipo.component'; 
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [ 
  { path: 'login', component: LoginComponent }, 
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, 
  { path: 'listar-funcionarios', component: ListarFuncionariosComponent, canActivate: [AuthGuard] }, 
  { path: 'listar-area', component: ListarAreaComponent, canActivate: [AuthGuard] }, 
  { path: 'listar-equipos', component: ListarEquiposComponent, canActivate: [AuthGuard] }, 
  { path: 'crear-funcionario', component: CrearFuncionarioComponent, canActivate: [AuthGuard] }, 
  { path: 'crear-area', component: CrearAreaComponent, canActivate: [AuthGuard] }, 
  { path: 'crear-equipo', component: CrearEquipoComponent, canActivate: [AuthGuard] }, 

  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' } 
]; 

@NgModule({ 
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule] 
}) 
export class AppRoutingModule { }
