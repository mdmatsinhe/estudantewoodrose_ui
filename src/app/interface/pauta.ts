export interface Pauta {
    anoLectivo:number;
    semestre:number;
    disciplina: string;
    notaTeste1: number;
    publicadaTeste1: boolean;
    notaTeste2: number;
    publicadaTeste2: boolean;
    notaTeste3: number;
    publicadaTeste3: boolean;
    notaTrabalho1: number;
    publicadaTrabalho1: boolean;
    notaTrabalho2: number;
    publicadaTrabalho2: boolean;
    notaTrabalho3: number;
    publicadaTrabalho3: boolean;
    notaFrequencia: number;
    publicadaFrequencia: boolean;
    resultadoFrequencia: string;
    notaExameNormal: number;
    publicadaExameNormal: boolean;
    notaExameRecorrencia: number;
    publicadaExameRecorrencia: boolean;
    notaFinal: number;
    publicadaNotaFinal: boolean;
    resultadoFinal: string;
  }