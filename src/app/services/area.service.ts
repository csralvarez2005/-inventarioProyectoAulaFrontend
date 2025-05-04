import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private apiUrl = 'http://localhost:8080/api/areas';

  constructor(private http: HttpClient) {}

  listarAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl);
  }

  obtenerAreaPorId(id: number): Observable<Area> {
    return this.http.get<Area>(`${this.apiUrl}/${id}`);
  }

  crearArea(area: Area): Observable<Area> {
    return this.http.post<Area>(this.apiUrl, area);
  }

  actualizarArea(id: number, area: Area): Observable<Area> {
    return this.http.put<Area>(`${this.apiUrl}/${id}`, area);
  }

  eliminarArea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
