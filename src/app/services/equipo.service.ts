import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private apiUrl = `http://localhost:8080/api/equipos`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los equipos
   */
  obtenerTodosLosEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.apiUrl);
  }

  /**
   * Obtiene un equipo por su ID
   */
  obtenerEquipoPorId(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo equipo
   */
  crearEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.apiUrl, equipo);
  }

  /**
   * Actualiza un equipo existente
   */
  actualizarEquipo(id: number, equipo: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.apiUrl}/${id}`, equipo);
  }

  /**
   * Elimina un equipo por su ID
   */
  eliminarEquipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
