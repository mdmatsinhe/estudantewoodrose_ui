import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Distrito } from 'src/app/interface/distrito';
import { Sexo } from 'src/app/interface/sexo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  getDistritos(token: string,provinciaId: number):Observable<Distrito[]>{
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.get<Distrito[]>(`${this.apiUrl}/api/distrito/provincia/${provinciaId}`,{headers});
  }

  getTodosDistritos(provinciaId: number):Observable<Distrito[]>{
  
    return this.http.get<Distrito[]>(`${this.apiUrl}/api/distrito/provincia/${provinciaId}`);
  }
}
