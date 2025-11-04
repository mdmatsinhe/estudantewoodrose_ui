import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DisciplinaSemestreResponse } from 'src/app/interface/disciplina-semestre-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaSemestreService {

  private apiUrl = environment.apiUrl+'/api/disciplinas';

  constructor(private http: HttpClient) {}

  buscarPorCurriculo(curriculoId: number,token: string): Observable<DisciplinaSemestreResponse[]> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.get<DisciplinaSemestreResponse[]>(
      `${this.apiUrl}/por-curriculo?curriculoId=${curriculoId}`,{headers}
    );
  }

  listarDisciplinasAtrasadas(estudanteId:number,curriculoId: number, semestreAtual: number,token:string): Observable<DisciplinaSemestreResponse[]> {
   
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    })
    return this.http.get<DisciplinaSemestreResponse[]>(`${this.apiUrl}/atrasadas?curriculoId=${curriculoId}&semestreCurso=${semestreAtual}&estudanteId=${estudanteId}`, { headers });
  }
}
