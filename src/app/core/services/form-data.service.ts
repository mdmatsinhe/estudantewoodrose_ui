import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private formData: any = {};

  constructor() { }

  // Definir ou atualizar os dados do formulário
  setData(key: string, value: any) {
    this.formData[key] = value;
  }

  // Obter os dados do formulário
  getData(key: string): any {
    return this.formData[key];
  }

  // Limpar os dados do formulário
  clearData() {
    this.formData = {};
  }
}
