import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoDocumentoIdentificacao } from '../../interface/tipo-documento-identificacao';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoIdentificacaoService {

  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }

  getDocumentos():Observable<TipoDocumentoIdentificacao[]>{
    
    return this.http.get<TipoDocumentoIdentificacao[]>(`${this.apiUrl}/api/tipo-documento-identificacao`);
  }
}
