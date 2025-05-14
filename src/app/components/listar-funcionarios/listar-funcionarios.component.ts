import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent implements OnInit{
  funcionarios: Funcionario[] = [];
  nombreFuncionarioActual: string = '';
  imagenes: { [key: number]: string } = {};

  constructor(
    private funcionarioService: FuncionarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerFuncionarios();
    this.obtenerFuncionarioActual();
  }

  obtenerFuncionarios(): void {
    this.funcionarioService.getAll().subscribe({
      next: (data: Funcionario[]) => { // Tipado de 'data' como Funcionario[]
        this.funcionarios = data;
        this.funcionarios.forEach(funcionario => {
          if (funcionario.imagen_url) {
            const url = this.getImagenUrl(funcionario.imagen_url);
            this.imagenes[funcionario.id] = url;
          }
        });
      },
      error: (err: any) => {
        console.error('Error al cargar funcionarios:', err);
        // Aquí puedes agregar un mensaje en la UI para informar al usuario
      }
    });
  }

  obtenerFuncionarioActual(): void {
    this.authService.funcionario$.subscribe({
      next: (funcionario) => {
        if (funcionario) {
          this.nombreFuncionarioActual = funcionario.nombre_funcionario || '';
        }
      },
      error: (err) => {
        console.error('Error al obtener funcionario actual:', err);
      }
    });
  }

  getImagenUrl(nombreArchivo: string): string {
    return `http://localhost:8080/${nombreArchivo}`;
  }
}
