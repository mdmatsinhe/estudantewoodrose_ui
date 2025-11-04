import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from 'src/app/interface/turno';
import { environment } from 'src/environments/environment';
import { Sexo} from '../../interface/sexo';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  getTurno():Observable<Turno[]>{
    
    return this.http.get<Turno[]>(`${this.apiUrl}/api/turno`);
  }
}
