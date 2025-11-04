import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EstudanteService } from 'src/app/core/services/estudante.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { Estudante } from 'src/app/interface/estudante';
import { Pauta } from 'src/app/interface/pauta';
import { ContaCorrenteService } from '../../core/services/conta-corrente.service';
import { FormsModule } from '@angular/forms';  
import { PautaService } from 'src/app/core/services/pauta.service';
import { ReferenciaRecorrencia } from '../../interface/referencia-recorrencia';

@Component({
  selector: 'app-listar-disciplinas-recorrencia',
  templateUrl: './listar-disciplinas-recorrencia.component.html',
  styleUrls: ['./listar-disciplinas-recorrencia.component.scss']
})
export class ListarDisciplinasRecorrenciaComponent implements OnInit {


  token = '';

  userlogado='';

  estudante!: Estudante;
  
  pautas : Pauta[]=[];

  subjectId:any;

  anoLectivoOptions = [2024,2025];
  semestreOptions = [1, 2];
  disciplinas: Pauta[] = [];

  
  selectedAnoLectivo='2024';
  selectedSemestre='2';

  selectedDisciplina?: Pauta;

  referencias: ReferenciaRecorrencia[] = [];

  constructor(
    private contaCorrenteService: ContaCorrenteService, 
    private messageService: MessageService,
    private tokenService: TokenService,
    private userService: UserService,
    private estudanteService: EstudanteService,
    private pautaService: PautaService
    ) {}

  ngOnInit() {
    // Carregar lista inicial de referências, se necessário

    if(this.tokenService.possuiToken()){
      this.token=this.tokenService.retornarToken();
      console.log(this.token);
      this.userService.retornarUser().subscribe(user => this.subjectId = user);
     
      this.estudanteService.getByUser(this.subjectId.subjectId,this.token).subscribe( (dados) => {
      this.estudante=dados;
      this.userlogado=this.estudante.nome+' '+this.estudante.apelido+' - '+this.estudante.numero 
      console.log(dados," viste");
      // this.listar(2023,2);
     this.listarPautas();
      });
   }

  }

  listarPautas() {
    this.pautaService.listarDisciplinasReprovadas(this.estudante.id!, Number(this.selectedAnoLectivo), Number(this.selectedSemestre), this.token).subscribe({
      next: value => {
        this.pautas = value;
        if (this.pautas.length === 0) {
          this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Não há disciplinas para exame de recorrência' });
        }
      },
      error: err => {
        console.log('Ocorreu erro ao listar pautas', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao listar disciplinas recorrência' });
      }
    });
    this.listarReferencias();
  }

  onDisciplinaChange(event: any): void {
    this.selectedDisciplina = event.value;
    console.log('Objeto da pauta selecionada:', this.selectedDisciplina);

    // Extrair o ID da pauta selecionada
    const idPauta = this.selectedDisciplina?.id;
    console.log('ID da pauta selecionada:', idPauta);
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


  gerarReferencia() {
    if (!this.selectedAnoLectivo || !this.selectedSemestre || !this.selectedDisciplina) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos' });
      return;
    }

    this.contaCorrenteService.gerarReferencia(this.estudante.id!, Number(this.selectedDisciplina?.id),Number(this.subjectId.subjectId), Number(this.selectedAnoLectivo), Number(this.selectedSemestre),this.token)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Referência gerada com sucesso!' });
          this.listarReferencias();
        },
        error: err => {
          if (err.status === 409) {
            this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Já existe uma referência para esta disciplina' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao gerar referência' });
          }
        }
      });
  }

  listarReferencias() {
    this.contaCorrenteService.listarReferenciasRecorrenciaPendentes(this.estudante.id!, Number(this.selectedAnoLectivo), Number(this.selectedSemestre),this.token)
      .subscribe({
        next: (data) => {
          this.referencias = data;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao listar referências' });
        }
      });
  }

}
