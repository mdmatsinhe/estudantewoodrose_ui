import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/interface/curso';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) { }


  downloadRelatorio(id: number): void {
    this.http.post(`${this.apiUrl}/api/relatorios/talao-pagamento`, { id }, { responseType: 'blob' })
      .subscribe({
        next: (response) => {
          // Criar URL para download
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);

          // Criar um link para download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'talao_pagamento.pdf'; // Nome do arquivo
          a.click();

          // Liberar memória
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Erro ao baixar o relatório:', error);
        }
      });
  }

  downloadBoletimInscricao(estudanteId: number,anoLectivo:number,semestre:number): void {
    this.http.post(`${this.apiUrl}/api/relatorios/boletim-inscricao`, { estudanteId,anoLectivo,semestre}, { responseType: 'blob' })
      .subscribe({
        next: (response) => {
          // Criar URL para download
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);

          // Criar um link para download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'boletim_inscricao.pdf'; // Nome do arquivo
          a.click();

          // Liberar memória
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Erro ao baixar o relatório:', error);
        }
      });
  }

  downloadExtrato(estudanteId: number,anoLectivo:number,semestre:number): void {
    this.http.post(`${this.apiUrl}/api/relatorios/extrato`, { estudanteId,anoLectivo,semestre}, { responseType: 'blob' })
      .subscribe({
        next: (response) => {
          // Criar URL para download
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          // Criar um link para download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'extrato_financeiro.pdf'; // Nome do arquivo
          a.click();
          // Liberar memória
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Erro ao baixar o relatório:', error);
        }
      });
  }

  downloadRecibo(estudanteId: number,recibo:number): void {
    this.http.post(`${this.apiUrl}/api/relatorios/recibo`, { estudanteId,recibo}, { responseType: 'blob' })
      .subscribe({
        next: (response) => {
          // Criar URL para download
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          // Criar um link para download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'recibo'+recibo+'.pdf'; // Nome do arquivo
          a.click();
          // Liberar memória
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Erro ao baixar o relatório:', error);
        }
      });
  }

}
