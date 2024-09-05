import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { Utilizador } from 'src/app/interface/utilizador';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<Utilizador | null>(null);

  constructor(private tokenService: TokenService) { 
    if(this.tokenService.possuiToken()){
      this.decodificarJWT();
    }
  }

  private decodificarJWT(){
    const token = this.tokenService.retornarToken();
    const decode:any =jwtDecode(token);
    this.userSubject.next(decode);
  }

  retornarUser(){
    return this.userSubject.asObservable();
  }

  gravarToken(token: string){
    this.tokenService.gravarToken(token);
    this.decodificarJWT();
  }

  logout(){
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  estadoLogado(){
    return this.tokenService.possuiToken();
  }

}
