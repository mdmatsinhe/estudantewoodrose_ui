import { Injectable } from '@angular/core';

const KEY='jwt_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  gravarToken(token: string){
    return localStorage.setItem(KEY, token);
  }

  excluirToken(){
    localStorage.removeItem(KEY);
  }

  retornarToken(){
    return localStorage.getItem(KEY) ?? ''
  }

  possuiToken(){
    return !!this.retornarToken();
  }
}
