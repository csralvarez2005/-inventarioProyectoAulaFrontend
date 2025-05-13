import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-crear-funcionario',
  templateUrl: './crear-funcionario.component.html',
  styleUrls: ['./crear-funcionario.component.css']
})
export class CrearFuncionarioComponent {
  funcionarioForm: FormGroup; 
  mensaje: string = ''; 
  nombreFuncionarioActual: string = ''; 
  imagenSeleccionada: File | null = null;
  imagenPreview: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private funcionarioService: FuncionarioService, 
    private authService: AuthService,
    private router: Router
  ) { 
this.funcionarioForm = this.fb.group({
  tipo_documento: ['', Validators.required],
  identificacion: ['', Validators.required],
  nombre_funcionario: ['', Validators.required],
  apellido_funcionario: ['', Validators.required],
  cargo: ['', Validators.required],
  celular: ['', Validators.required],
  direccion: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  estado_civil: ['', Validators.required],
  fecha_nacimiento: ['', Validators.required],
  genero: ['', Validators.required],
  password: ['', Validators.required],
  rol: ['', Validators.required], 
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
  
  ngOnInit(): void {    
    this.obtenerFuncionarioActual(); 
  } 

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
      
      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  crearFuncionario(): void { 
    if (this.funcionarioForm.invalid) return; 

    const funcionario: Funcionario = this.funcionarioForm.value; 

    this.funcionarioService.create(funcionario).subscribe({ 
      next: (funcionarioCreado) => {
        this.mensaje = 'Funcionario creado correctamente';
        
        // Si hay una imagen seleccionada, la subimos
        if (this.imagenSeleccionada) {
          this.subirImagen(funcionarioCreado.id);
        } else {
          this.router.navigate(['/listar-funcionarios']);
        }
      }, 
      error: (err: any) => this.mensaje = 'Error al crear funcionario: ' + err.error.message 
    }); 
  }

  subirImagen(funcionarioId: number): void {
    if (!this.imagenSeleccionada) return;

    const formData = new FormData();
    formData.append('imagen', this.imagenSeleccionada);

    this.funcionarioService.subirImagenFuncionario(funcionarioId, formData).subscribe({
      next: () => {
        this.mensaje += '. Imagen subida correctamente.';
        setTimeout(() => {
          this.router.navigate(['/listar-funcionarios']);
        }, 1500);
      },
      error: (err) => {
        this.mensaje += '. Error al subir la imagen: ' + (err.error?.message || err.message);
      }
    });
  }
}