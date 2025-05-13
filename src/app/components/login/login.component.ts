import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm: FormGroup;
  error: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicialización del formulario con validaciones
    this.loginForm = this.fb.group({
      identificacion: ['', [Validators.required, Validators.minLength(6)]], // Ejemplo de validación
      password: ['', [Validators.required, Validators.minLength(6)]] // Asegúrate que tenga una longitud mínima
    });
  }

  // Método para hacer login
  onLogin() {
    if (this.loginForm.invalid) {
      // Si el formulario es inválido, no hacer nada
      return;
    }

    this.loading = true;  // Activar el estado de carga
    this.error = '';       // Limpiar errores anteriores

    const credentials = this.loginForm.value;

    // Llamada al servicio de autenticación
    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Si la respuesta es exitosa, guardar el token
        localStorage.setItem('token', response.token);  // Guarda el token JWT
        this.router.navigate(['/dashboard']);            // Redirigir al dashboard
      },
      error: (err) => {
        console.error('Error de autenticación:', err);
        this.error = 'Credenciales inválidas';           // Mostrar error
        this.loading = false;                            // Desactivar el estado de carga
      },
      complete: () => {
        this.loading = false;  // Asegúrate de desactivar la carga en el final
      }
    });
  }

  // Método para obtener los controles del formulario (opcional, solo para facilitar)
  get f() { return this.loginForm.controls; }

}
