import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContaCorrente } from 'src/app/interface/conta-corrente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaCorrenteService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  listarContaCorrente(anoLectivo: number,semestre: number, idEstudante: number,token: string): Observable<ContaCorrente[]>{
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.post<ContaCorrente[]>(`${this.apiUrl}/api/contacorrente`,{idEstudante,anoLectivo,semestre},{headers});
  }
}
