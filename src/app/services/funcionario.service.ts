import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from '../models/funcionario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private apiUrl = 'http://localhost:8080/api/funcionarios'; // ajusta si cambia el puerto/backend

  constructor(private http: HttpClient) {}

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }
  createFuncionario(dto: Funcionario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, dto);
  }
}
