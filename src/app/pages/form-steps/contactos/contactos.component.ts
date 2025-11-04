import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudanteService } from 'src/app/core/services/estudante.service';
import { FormDataService } from 'src/app/core/services/form-data.service';
import { ReportService } from 'src/app/core/services/report.service';
import { Estudante } from 'src/app/interface/estudante';
import { ReferenciaRecorrencia } from 'src/app/interface/referencia-recorrencia';
import { ContaCorrenteService } from '../../../core/services/conta-corrente.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {
  dadosConfirmationForm!: FormGroup;
  estudante!: Estudante;
  display: boolean = false;
  referencias: ReferenciaRecorrencia[] = [];
  referenciaId:number| null = null;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    public formDataService: FormDataService,
    private estudanteService: EstudanteService,
    private contaCorrenteService: ContaCorrenteService,
    private reportService: ReportService) {

      // Inicializando o objeto estudante com valores padrão
    this.estudante = {
      id: 0,
      numero: 0,
      apelido: '',
      nome: '',
      numeroDocumentoIdentificacao: '',
      nomeCompleto: '',
      dataNascimento: new Date(),
      tipoDocumentoIdentificacaoId: 0,
      validadeDocumentoIdentificacao: new Date(),
      estadoCivilId: 0,
      nacionalidadeId: 0,
      distritoId: 0,
      telefone: 0,
      telefoneFixo: 0,
      email: '',
      nomeMae: '',
      telefoneMae: 0,
      nomePai: '',
      telefonePai: 0,
      nomeEncarregado: '',
      telefoneEncarregado: 0,
      tipoEncarregado: '',
      endereco: '',
      nuit: '',
      sexoId: 0,
      anoIngresso: 0,
      cursoId: 0,
      turnoId: 0,
      provinciaId:0
    };
 
  }
  ngOnInit(): void {
    this.dadosConfirmationForm = this.fb.group({
      termos: [null, Validators.required]
    });
   
  }

  formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-PT', {
      style: 'decimal',
     // Ajuste a moeda conforme necessário
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      // Ajusta o separador decimal para vírgula
      useGrouping: true // Mantém os separadores de milhar
    }).format(valor);
  }

  nextPage() {
    
    this.router.navigate(['steps/course']);

}

prevPage() {
this.router.navigate(['steps/course']);
}

formatDate(date: Date): string {
  return date.toISOString().slice(0, -1); // Remove o 'Z' no final
}

irAoLogin(){
  this.display=false;
  this.router.navigate(['login']);
}

baixarRelatorio(): void {
  if (this.referenciaId) {
    this.reportService.downloadRelatorio(this.referenciaId); // Chamar o método de download com o ID capturado
  } else {
    console.error('Nenhuma referência disponível para download.');
  }
}

onSubmit() {
  
  if (this.dadosConfirmationForm.valid) {
    this.estudante.apelido = this.formDataService.getData('apelido') || '';
    this.estudante.nome = this.formDataService.getData('nome') || '';
    this.estudante.numeroDocumentoIdentificacao = this.formDataService.getData('numeroDoc') || '';
    this.estudante.tipoDocumentoIdentificacaoId = this.formDataService.getData('tipoDoc')?.id || 0;
    this.estudante.dataNascimento = this.formDataService.getData('dataNascimento') || new Date();
    this.estudante.nacionalidadeId = this.formDataService.getData('nacionalidade')?.id || 0;
    this.estudante.telefone = this.formDataService.getData('telefone') || 0;
    this.estudante.telefoneFixo = this.formDataService.getData('telefoneFixo') || 0;
    this.estudante.nomePai = this.formDataService.getData('nomePai') || '';
    this.estudante.nomeMae = this.formDataService.getData('nomeMae') || '';
    this.estudante.telefonePai = this.formDataService.getData('telefonePai') || 0;
    this.estudante.telefoneMae = this.formDataService.getData('telefoneMae') || 0;
    this.estudante.nomeEncarregado = this.formDataService.getData('nomeEncarregado') || '';
    this.estudante.tipoEncarregado = this.formDataService.getData('tipoEncarregado') || '';
    this.estudante.telefoneEncarregado = this.formDataService.getData('telefoneEncarregado') || 0;
    this.estudante.sexoId = this.formDataService.getData('sexo')?.id || 0;
    this.estudante.distritoId = this.formDataService.getData('distrito')?.id || 0;
    this.estudante.email = this.formDataService.getData('email') || '';
    this.estudante.cursoId = this.formDataService.getData('curso')?.id || 0;
    this.estudante.turnoId = this.formDataService.getData('turno')?.id || 0;

    console.log(this.estudante);
  
    // Enviando os dados para o backend
    this.estudanteService.createEstudante(this.estudante).subscribe((novoEstudante) => {
      
       // Gerar a referência de matrícula
       this.contaCorrenteService.gerarReferenciaMatricula(novoEstudante.id).subscribe(
      {next: (referenciasGeradas) => {
        this.formDataService.clearData();
        this.referencias = Array.isArray(referenciasGeradas) ? referenciasGeradas : [referenciasGeradas];
        this.display = true; // Exibir o modal
        if (this.referencias.length > 0) {
          this.referenciaId = this.referencias[0].id!; // Capturar o ID da primeira referência
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }});
     
    });
  }
}

}