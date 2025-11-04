import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nacionalidade} from '../../interface/nacionalidade';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadeService {

  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  getNacionalidades():Observable<Nacionalidade[]>{
  
    return this.http.get<Nacionalidade[]>(`${this.apiUrl}/api/nacionalidade`);
  }
}
