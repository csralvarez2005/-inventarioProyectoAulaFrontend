import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Area } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crear-area',
  templateUrl: './crear-area.component.html',
  styleUrls: ['./crear-area.component.css']
})
export class CrearAreaComponent {
  area: Area = {
    nombre: '',
    tipo: '',
  };
  nombreFuncionarioActual: string = '';
  constructor(private areaService: AreaService, private router: Router,private authService: AuthService) {}

  guardarArea(): void {
    this.areaService.crearArea(this.area).subscribe({
      next: () => {
        alert('Área creada exitosamente');
        this.router.navigate(['/areas']);
      },
      error: (error) => {
        console.error('Error al crear área:', error);
        alert('Error al crear el área');
      }
    });
  }

  ngOnInit(): void {    
     this.obtenerFuncionarioActual();
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
