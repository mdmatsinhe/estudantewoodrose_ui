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

  gerarReferencia(idEstudante: number, idPauta: number, idUser: number, anoLectivo: number, semestre: number, token: string): Observable<any> {
   
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.post(`${this.apiUrl}/api/contacorrente/gerar-referencia`, {
      idEstudante,
      idPauta,
      idUser,
      anoLectivo,
      semestre
    },{headers});
  }

  listarReferenciasRecorrenciaPendentes(estudanteId: number, anoLectivo: number, semestre: number,token: string): Observable<any> {
    
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.get(`${this.apiUrl}/api/contacorrente/referencias-recorrencia`, {
      headers: headers, // Adiciona os cabeçalhos à requisição
      params: {
        idEstudante: estudanteId.toString(),
        anoLectivo: anoLectivo.toString(),
        semestre: semestre.toString()
      }
    });
  }

  gerarReferenciaMatricula(idEstudante: number): Observable<any> {
   
    return this.http.post(`${this.apiUrl}/api/contacorrente/gerar-taxa-matricula?estudanteId=${idEstudante}`,{});
  }

}
