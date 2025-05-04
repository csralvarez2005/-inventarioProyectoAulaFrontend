import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/funcionario.model';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent implements OnInit{
  funcionarios: Funcionario[] = [];

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.obtenerFuncionarios();
  }

  obtenerFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe({
      next: (data) => {
        this.funcionarios = data;
      },
      error: (err) => {
        console.error('Error al obtener funcionarios', err);
      }
    });
  }

}
