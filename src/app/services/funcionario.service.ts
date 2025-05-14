import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';
import { catchError, Observable } from 'rxjs';
import { FuncionarioDTO } from '../models/funcionario-dto.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

constructor(private http: HttpClient) {}
   private apiUrl = 'http://localhost:8080/api/funcionarios';

  // Obtiene las cabeceras con el token de autorización
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // CRUD básico
  create(dto: FuncionarioDTO): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, dto, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, dto: FuncionarioDTO): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/${id}`, dto, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Autenticación / Utilitarios
  getByIdentificacion(identificacion: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/identificacion/${identificacion}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  existsByIdentificacion(identificacion: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${identificacion}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Subir imagen
  subirImagenFuncionario(id: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/imagen`, formData, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  actualizarImagenUrl(id: number, imagenUrl: string): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/${id}/imagen-url`, { imagen_url: imagenUrl }, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud HTTP:', error);
    // Aquí puedes personalizar el manejo de errores, como mostrar un mensaje en la interfaz de usuario
    throw error;
  }
  // Genera una URL para mostrar una imagen ya subida
 // Método para obtener la URL de la imagen con los headers
// Método para obtener la imagen desde el backend (requiere autenticación con token)
getImagenUrl(nombreArchivo: string): Observable<Blob> {
  const headers = this.getAuthHeaders(); // Utiliza el método para obtener los headers con el token
  
  // Asegúrate de que la URL se construya correctamente
  const url = `http://localhost:8080/uploads/${nombreArchivo}`;
  
  return this.http.get<Blob>(url, {
    headers,
    responseType: 'blob' as 'json' // Asegúrate de que el tipo de respuesta sea blob
  }).pipe(
    catchError(this.handleError)
  );
}

}