import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/models/equipo.model';
import { AuthService } from 'src/app/services/auth.service';
import { EquipoService } from 'src/app/services/equipo.service';

@Component({
  selector: 'app-listar-equipos',
  templateUrl: './listar-equipos.component.html',
  styleUrls: ['./listar-equipos.component.css']
})
export class ListarEquiposComponent implements OnInit{
  
  equipos: Equipo[] = [];
  loading = false;
  error: string | null = null;
  nombreFuncionarioActual: string = '';

  constructor(private equipoService: EquipoService,private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarEquipos();
     this.obtenerFuncionarioActual();
  }

  cargarEquipos(): void {
    this.loading = true;
    this.error = null;
    
    this.equipoService.obtenerTodosLosEquipos()
      .subscribe({
        next: (data) => {
          this.equipos = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar los equipos: ' + (err.message || 'Error desconocido');
          this.loading = false;
          console.error('Error cargando equipos', err);
        }
      });
  }

  eliminarEquipo(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este equipo?')) {
      this.equipoService.eliminarEquipo(id)
        .subscribe({
          next: () => {
            this.equipos = this.equipos.filter(equipo => equipo.id !== id);
          },
          error: (err) => {
            this.error = 'Error al eliminar el equipo: ' + (err.message || 'Error desconocido');
            console.error('Error eliminando equipo', err);
          }
        });
    }
  }

  obtenerFuncionarioActual(): void {
    this.authService.funcionario$.subscribe({
      next: (funcionario) => {
        if (funcionario) {
          this.nombreFuncionarioActual = funcionario.nombre_funcionario || funcionario.nombre_funcionario || '';
        }
      },
      error: (err) => {
        console.error('Error al obtener funcionario actual:', err);
      }
    });
  }
}
