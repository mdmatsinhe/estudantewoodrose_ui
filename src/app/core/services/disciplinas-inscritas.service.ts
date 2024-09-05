import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscricao } from 'src/app/interface/inscricao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasInscritasService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  listarDisciplinas(anoLectivo: number,semestre: number, idEstudante: number,token: string): Observable<Inscricao[]>{
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.post<Inscricao[]>(`${this.apiUrl}/api/inscricao`,{idEstudante,anoLectivo,semestre},{headers});
  }
}
