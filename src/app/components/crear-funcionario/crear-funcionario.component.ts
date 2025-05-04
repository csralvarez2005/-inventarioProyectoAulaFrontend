import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/models/funcionario.model';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-crear-funcionario',
  templateUrl: './crear-funcionario.component.html',
  styleUrls: ['./crear-funcionario.component.css']
})
export class CrearFuncionarioComponent {
  funcionarioForm: FormGroup;
  mensaje: string = '';

  constructor(private fb: FormBuilder, private funcionarioService: FuncionarioService) {
    this.funcionarioForm = this.fb.group({
      tipo_documento: ['', Validators.required],
      apellido_funcionario: ['', Validators.required],
      cargo: ['', Validators.required],
      celular: [''],
      direccion: [''],
      email: ['', [Validators.required, Validators.email]],
      estado: ['activo'],
      estado_civil: [''],
      fecha_nacimiento: ['', Validators.required],
      genero: [''],
      identificacion: ['', Validators.required],
      nombre_funcionario: ['', Validators.required]
    });
  }

  crearFuncionario(): void {
    if (this.funcionarioForm.invalid) return;

    const funcionario: Funcionario = this.funcionarioForm.value;

    this.funcionarioService.createFuncionario(funcionario).subscribe({
      next: () => this.mensaje = 'Funcionario creado exitosamente.',
      error: err => this.mensaje = 'Error al crear funcionario: ' + err.error.message
    });
  }

}
