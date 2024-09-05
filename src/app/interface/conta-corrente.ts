export interface ContaCorrente{
    descricao: string;
    entidade: string;
    referencia: string
    totalDebito: number;
    prazo: Date;
    credito: number;
    dataPagamento: Date;
    pago: boolean;
}