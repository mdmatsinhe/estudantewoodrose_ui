import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/interface/curso';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  getCursos(faculdadeId: number):Observable<Curso[]>{
    
    return this.http.get<Curso[]>(`${this.apiUrl}/api/curso/faculdade/${faculdadeId}`);
  }
}
