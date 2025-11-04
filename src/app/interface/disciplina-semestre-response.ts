export interface DisciplinaSemestreResponse {
    id?:number;
    nomeDisciplina: string;
    turma?: string; 
    turmaId:number;// Adiciona a propriedade turma como opcional
  }