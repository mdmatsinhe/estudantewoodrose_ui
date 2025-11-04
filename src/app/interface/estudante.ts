import { Distrito } from "./distrito";
import { EstadoCivil } from "./estado-civil";
import { Nacionalidade } from "./nacionalidade";
import { Sexo } from "./sexo";
import { TipoDocumentoIdentificacao } from './tipo-documento-identificacao';

export interface Estudante{
    id: number;
    numero: number;
    apelido: string;
    nome: string;
    numeroDocumentoIdentificacao: string;
    nomeCompleto: string;
    dataNascimento: Date;
    tipoDocumentoIdentificacaoId: number;  // Ou use uma interface se necessário
    validadeDocumentoIdentificacao: Date;
    estadoCivilId: number;
    nacionalidadeId: number;
    distritoId: number;
    telefone: number;
    telefoneFixo:number;
    email: string;
    nomeMae: string;
    telefoneMae:number;
    nomePai: string;
    telefonePai:number;
    nomeEncarregado:string;
    telefoneEncarregado:number;
    tipoEncarregado:string;
    endereco: string;
    nuit: string;
    sexoId: number;
    anoIngresso: number;
    cursoId:number;
    turnoId:number;
    provinciaId:number;
    cursoNome?:string;
    curriculoNome?:string;
    curriculoId?:number;
    faculdadeId?:number;
    nomeResponsavelFinanceiro?:string;
    emailResponsavelFinanceiro?:string;

}