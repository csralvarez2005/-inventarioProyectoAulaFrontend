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
      next: (data: any) => { 
        this.funcionarios = data; 
      }, 
      error: (err: any) => { 
        console.error('Error al cargar funcionarios:', err); 
      } 
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
