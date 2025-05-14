import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

export interface LoginRequest {
  identificacion: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; 
  private funcionarioSubject = new BehaviorSubject<Funcionario | null>(null); 
  public funcionario$ = this.funcionarioSubject.asObservable(); 

  constructor(private http: HttpClient) { 
    // Verificar si hay un token guardado al iniciar el servicio 
    const token = this.getToken(); 
    if (token && !this.isTokenExpired()) { 
      this.cargarPerfilFuncionario(); 
    } 
  } 

  // Método de login
  login(request: LoginRequest): Observable<any> { 
    return this.http.post<any>(`${this.apiUrl}/auth/login`, request) 
      .pipe( 
        tap(response => { 
          if (response && response.token) { 
            this.guardarToken(response.token); 
            this.cargarPerfilFuncionario(); 
          } 
        }) 
      ); 
  } 

  // Cargar perfil del funcionario
  cargarPerfilFuncionario(): void {
    const headers = this.getAuthHeaders();
    this.http.get<Funcionario>(`${this.apiUrl}/api/funcionarios/perfil`, { headers }).subscribe({ 
      next: (funcionario) => { 
        this.funcionarioSubject.next(funcionario); 
      }, 
      error: (err) => { 
        console.error('Error al cargar perfil:', err); 
        this.logout(); 
      } 
    }); 
  } 

  // Guardar token en localStorage
  guardarToken(token: string): void { 
    const payload = { 
      token: token, 
      timestamp: new Date().getTime() 
    }; 
    localStorage.setItem('auth_data', JSON.stringify(payload)); 
  } 

  // Eliminar token y datos de autenticación
  logout(): void { 
    localStorage.removeItem('auth_data'); 
    this.funcionarioSubject.next(null); 
  } 

  // Obtener el token almacenado
  getToken(): string | null { 
    const authData = localStorage.getItem('auth_data'); 
    if (authData) { 
      try { 
        const parsed = JSON.parse(authData);
        return parsed.token; 
      } catch (e) { 
        console.error('Error al parsear auth_data:', e); 
      } 
    }
    return null; 
  } 

  // Verificar si el token ha expirado usando el campo `exp` de JWT
  isTokenExpired(): boolean { 
    const token = this.getToken();
    if (!token) return true;

    const payload = this.parseJwt(token);
    const expiration = payload?.exp * 1000; // Convertir exp de segundos a milisegundos
    const now = new Date().getTime();

    return expiration < now;
  }

  // Parsear JWT para obtener el payload
  parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  // Obtener cabeceras con el token
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean { 
    return !!this.getToken() && !this.isTokenExpired();
  } 
getFuncionarioActual(): Observable<Funcionario> {
  // Usar el método centralizado para obtener el token
  const token = this.getToken();

  // Crear las cabeceras HTTP con el token de autenticación
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  // Realizar la solicitud para obtener el perfil del funcionario
  return this.http.get<Funcionario>(`${this.apiUrl}/api/funcionarios/perfil`, { headers });
}

}


  

