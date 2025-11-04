import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delegacao } from 'src/app/interface/delegacao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DelegacaoService {

  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  getDelegacao():Observable<Delegacao[]>{
    
    return this.http.get<Delegacao[]>(`${this.apiUrl}/api/delegacao`);
  }
}
