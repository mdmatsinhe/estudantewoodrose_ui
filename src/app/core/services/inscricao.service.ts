import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InscricaoRequest } from 'src/app/interface/inscricao-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {

  private apiUrl = environment.apiUrl+'/api/inscricao';

  constructor(private http: HttpClient) {}

  registrarInscricao(inscricoes: InscricaoRequest[],token:string): Observable<InscricaoRequest[]> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.post<InscricaoRequest[]>(`${this.apiUrl}/nova`, inscricoes,{headers});
  }

  gerarPlanos(inscricoes: InscricaoRequest[],token:string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.post<void>(`${this.apiUrl}/gerar-planos`, inscricoes,{headers});
  }

  verificarInscricao(estudanteId: number, anoLectivo: number,token:string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.get<boolean>(`${this.apiUrl}/verificar-inscricao`, {
      headers: headers,
      params: {
        estudanteId: estudanteId.toString(),
        anoLectivo: anoLectivo.toString()
      }
    });
  }
}
