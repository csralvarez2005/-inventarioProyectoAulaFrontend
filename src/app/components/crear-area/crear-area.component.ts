import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Area } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';

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

  constructor(private areaService: AreaService, private router: Router) {}

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

}
