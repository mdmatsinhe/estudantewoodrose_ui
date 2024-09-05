import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserService } from './user.service';
import { Utilizador } from '../../interface/utilizador';

interface AuthResponse{
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { }

  autenticar(username: string, password: string): Observable<HttpResponse<AuthResponse>>{

    return this.http.post<AuthResponse>(`${this.apiUrl}/api/login`,{username,password},{observe: 'response'}).pipe(
      tap((response)=>{
        const authtoken = response.body?.token || ' ';

        console.log(authtoken+" token")
        this.userService.gravarToken(authtoken)
      })
    );

  }

  atualizarSenha(id:number,password: string, loginCount: number, token: string): Observable<any>{
  

    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/api/login`,{id,password,loginCount},{headers});
  }
}
