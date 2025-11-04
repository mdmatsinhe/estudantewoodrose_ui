export interface ContaCorrente{
    id?:number;
    descricao: string;
    entidade: string;
    referencia: string
    totalDebito: number;
    prazo: Date;
    credito: number;
    dataPagamento: Date;
    pago: boolean;
    situacao: string;
    taxa_desconto:number;
    recibo?:number;
}