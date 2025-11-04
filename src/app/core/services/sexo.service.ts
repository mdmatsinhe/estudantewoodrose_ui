import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sexo} from '../../interface/sexo';

@Injectable({
  providedIn: 'root'
})
export class SexoService {

  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  getSexos():Observable<Sexo[]>{
    
    return this.http.get<Sexo[]>(`${this.apiUrl}/api/sexo`);
  }
}
