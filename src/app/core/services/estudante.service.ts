import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Distrito } from 'src/app/interface/distrito';
import { Estudante } from 'src/app/interface/estudante';
import { environment } from 'src/environments/environment';
import { Provincia } from '../../interface/provincia';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getByUser(idUtilizador: number, token:string): Observable<Estudante>{
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });
    return this.http.get<Estudante>(`${this.apiUrl}/api/estudante/get/${idUtilizador}`,{headers});
  }

  updateEstudante(id: number, estudanteData: any,token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });
    console.log(estudanteData+' dados recebidos')
    return this.http.put(`${this.apiUrl}/api/estudante/${id}`, estudanteData,{headers});
  }

  createEstudante(estudanteData: any): Observable<any> {
  
    console.log(estudanteData+' dados recebidos')
    return this.http.post(`${this.apiUrl}/api/estudante/novo`, estudanteData);
  }

}
