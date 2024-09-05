import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pauta } from '../../interface/pauta';

@Injectable({
  providedIn: 'root'
})
export class PautaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  listarNotas(anoLectivo: number,semestre: number, idEstudante: number,token: string): Observable<Pauta[]>{
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.post<Pauta[]>(`${this.apiUrl}/api/pauta`,{idEstudante,anoLectivo,semestre},{headers});
  }

  listarHistorico(idEstudante: number,token: string): Observable<Pauta[]>{
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.post<Pauta[]>(`${this.apiUrl}/api/pauta/historico`,{idEstudante},{headers});
  }

}
