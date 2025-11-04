export interface InscricaoRequest {
     estudanteId: number;  // ID do estudante
     disciplinaId: number; // ID da disciplina
     turma: string;        // Nome da turma
   // Semestre calculado
     anoLectivo: number;   
     turmaId:number;
     planoMensalidades?:number;
  }