import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
nombreFuncionario: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.obtenerNombreFuncionario();
  }

  obtenerNombreFuncionario(): void {
    this.authService.getFuncionarioActual().subscribe(
      (funcionario) => {
        if (funcionario) {
          this.nombreFuncionario = funcionario.nombre_funcionario;
        }
      },
      (error) => {
        console.error('Error al obtener datos del funcionario:', error);
      }
    );
  }

}
