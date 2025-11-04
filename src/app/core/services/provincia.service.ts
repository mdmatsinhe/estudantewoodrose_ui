import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Provincia } from '../../interface/provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  getProvincias():Observable<Provincia[]>{
  
    return this.http.get<Provincia[]>(`${this.apiUrl}/api/provincia`);
  }
}
