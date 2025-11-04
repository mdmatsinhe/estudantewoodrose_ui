import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Distrito } from 'src/app/interface/distrito';
import { Sexo } from 'src/app/interface/sexo';
import { environment } from 'src/environments/environment';
import { Faculdade } from '../../interface/faculdade';

@Injectable({
  providedIn: 'root'
})
export class FaculdadeService {

  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  getFaculdade(delegacaoId: number):Observable<Faculdade[]>{
    
    return this.http.get<Faculdade[]>(`${this.apiUrl}/api/faculdade/delegacao/${delegacaoId}`);
  }
}
