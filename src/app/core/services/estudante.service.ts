import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudante } from 'src/app/interface/estudante';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getByUser(idUtilizador: number, token:string): Observable<Estudante>{
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.get<Estudante>(`${this.apiUrl}/api/estudante/get/${idUtilizador}`,{headers});
  }
}
