export interface ReferenciaRecorrencia{
    id?:number;
    tipoEmolumento: string;
    entidade: string;
    referencia: string
    totalDebito: number;
    prazo: Date;    
    situacao: string;
}