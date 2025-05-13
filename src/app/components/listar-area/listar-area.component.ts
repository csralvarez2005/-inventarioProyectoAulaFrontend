import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listar-area',
  templateUrl: './listar-area.component.html',
  styleUrls: ['./listar-area.component.css']
})
export class ListarAreaComponent implements OnInit{
  areas: Area[] = [];
  nombreFuncionarioActual: string = '';

  constructor(private areaService: AreaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerAreas();
     this.obtenerFuncionarioActual();
  }

  obtenerAreas(): void {
    this.areaService.listarAreas().subscribe(data => {
      this.areas = data;
    });
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
