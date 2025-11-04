import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoCivil } from '../../interface/estado-civil';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {
  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  getEstadosCivis(token: string):Observable<EstadoCivil[]>{
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.get<EstadoCivil[]>(`${this.apiUrl}/api/estado-civil`,{headers});
  }
}
