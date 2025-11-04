import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessaoTurmaRequest } from 'src/app/interface/sessao-turma-request';
import { environment } from 'src/environments/environment';
import { SessaoTurmaResponse } from '../../interface/sessao-turma-response';

@Injectable({
  providedIn: 'root'
})
export class SessaoTurmaService {

  private apiUrl = environment.apiUrl+'/api/sessoes-turma';

  constructor(private http: HttpClient) {}

  buscarSessoesTurma(request: SessaoTurmaRequest,token: string): Observable<SessaoTurmaResponse[]> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.post<SessaoTurmaResponse[]>(`${this.apiUrl}/buscar`, request,{headers});
  }
}
