import { Component, OnInit } from '@angular/core';
import { EstudanteService } from 'src/app/core/services/estudante.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { Estudante } from 'src/app/interface/estudante';
import { Utilizador } from 'src/app/interface/utilizador';
import { Inscricao } from '../../interface/inscricao';
import { DisciplinasInscritasService } from '../../core/services/disciplinas-inscritas.service';
import { MessageService } from 'primeng/api';
import { PautaService } from 'src/app/core/services/pauta.service';
import { Pauta } from 'src/app/interface/pauta';
import { ContaCorrenteService } from 'src/app/core/services/conta-corrente.service';
import { ContaCorrente } from 'src/app/interface/conta-corrente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-disciplinas-inscritas',
  templateUrl: './listar-disciplinas-inscritas.component.html',
  styleUrls: ['./listar-disciplinas-inscritas.component.scss']
})
export class ListarDisciplinasInscritasComponent implements OnInit {

  token = '';

  userlogado = '';

  anoSeleccionado = '2025';
  semestreSeleccionado = '2';

  subjectId: any;

  estudante!: Estudante;

  disciplinasInscritas: Inscricao[] = [];

  anos: number[] = [2024,2025];

  semestres: number[] = [1, 2];

  utilizador!: Utilizador | null;

  notasDisciplina: Pauta[] = [];
  mostrarPopupNotas = false;

  contasEmDivida: number = 0;
  contas: ContaCorrente[] = [];
  
  constructor(
    private disciplinasInscritasService: DisciplinasInscritasService,
    private tokenService: TokenService,
    private userService: UserService,
    private estudanteService: EstudanteService,
    private messageService: MessageService,
    private pautaService: PautaService,
    private contaCorrenteService: ContaCorrenteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //  this.dataSource.paginator = this.paginator;
    if (this.tokenService.possuiToken()) {
      this.token = this.tokenService.retornarToken();

      this.userService.retornarUser().subscribe(user => this.subjectId = user);

      this.estudanteService.getByUser(this.subjectId.subjectId, this.token).subscribe((dados) => {
        this.estudante = dados;
        this.userlogado = this.estudante.nome + ' ' + this.estudante.apelido + ' - ' + this.estudante.numero

        // this.listar(2023,2);
        this.listar(Number(this.anoSeleccionado), Number(this.semestreSeleccionado));

        this.listarDebitos(Number(this.anoSeleccionado), Number(this.semestreSeleccionado));

      });

      this.exibirMensagemAlerta();
    }
  }


  listarDisciplinas() {
    this.listar(Number(this.anoSeleccionado), Number(this.semestreSeleccionado));
    this.listarDebitos(Number(this.anoSeleccionado), Number(this.semestreSeleccionado));
  }

  listar(anolectivo: number, semestre: number) {

    this.disciplinasInscritasService.listarDisciplinas(anolectivo, semestre, this.estudante.id!, this.token).subscribe({
      next: (value) => {
        this.disciplinasInscritas = value;
        this.messageService.clear();
        if(this.disciplinasInscritas.length==0){
        const messageRef = this.messageService.add({
          severity: 'error',
          summary: 'Atenção',
          detail: `Caro Estudante, nenhuma inscrição foi encontrada para o `+semestre+'° semestre do ano '+anolectivo,
          sticky: true
        });
       }
      },
      error: (err) => {
        console.log("Ocorreu erro ", err)
      }
    })
  }

  listarDebitos(anolectivo: number, semestre: number) {

    console.log(this.estudante, " depois s    ", anolectivo, " ", semestre)
    this.contaCorrenteService.listarContaCorrente(anolectivo, semestre, this.estudante.id!, this.token).subscribe({
      next: (value) => {
        this.contas = value;
        console.log(this.contas)
        this.calcularDividas();
        console.log(this.calcularDividas()+" verificar dividas")
        console.log("chegou ", value);

      },
      error: (err) => {
        console.log("Ocorreu erro ", err)
      }
    })
  }

  calcularDividas() {
    const today = new Date(); // Data atual
    this.contasEmDivida = this.contas
      .filter(contacorrente => !contacorrente.pago && contacorrente.situacao !== 'CANCELADO'
      && contacorrente.situacao !== 'CANCELADA'
        && contacorrente.taxa_desconto !== 100
        && new Date(contacorrente.prazo) < today
        && contacorrente.situacao !== 'NEGOCIADA')
      .reduce((acc, contacorrente) => acc + contacorrente.totalDebito, 0);
  }

  mostrarAvisoDivida(): void {
    const messageRef = this.messageService.add({
      severity: 'error',
      summary: 'Atenção',
      detail: `Caro Estudante, para vizualizar notas regularize a situação financeira, existem dívidas por pagar. Valor total: ${this.contasEmDivida.toFixed(2)} Meticais.`,
      sticky: true
    });

    setTimeout(() => {
      this.router.navigate(['/contacorrente']);
    }, 3000);
  }

  abrirPopupNotas(inscricao: Inscricao) {
  //  console.log(this.contasEmDivida+" dividas "+this.calcularDividas()+" total "+this.contas);
    if (!(this.contasEmDivida > 0)) {
      this.pautaService.listarNotasDisciplina(inscricao.idEstudante, inscricao.idDisciplina, inscricao.anoLectivo, inscricao.semestre, this.token).subscribe({
        next: (notas) => {
          if (notas && this.isNotaPublicada(notas[0])) {
            this.notasDisciplina = notas;
            this.mostrarPopupNotas = true;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Ainda não foram publicadas notas de ' + inscricao.disciplina
            });
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível carregar as notas da disciplina.'
          });
        }
      });
    } else {
      this.mostrarAvisoDivida();
    }
  }

  private isNotaPublicada(notas: Pauta): boolean {
    if (!notas) {
      // Caso notas seja null ou undefined, retorne false diretamente
      return false;
    }
    return (
      notas.publicadaTeste1 || notas.notaTeste1 !== null && notas.notaTeste1 !== undefined ||
      notas.publicadaTeste2 || notas.notaTeste2 !== null && notas.notaTeste2 !== undefined ||
      notas.publicadaTrabalho1 || notas.notaTrabalho1 !== null && notas.notaTrabalho1 !== undefined
    );
  }

  getSeverityFinal(status: string) {
    switch (status) {
      case 'Aprovado':
        return 'success';
      case 'Reprovado':
        return 'danger';
      default:
        return 'info';
    }
  }
  getSeverityFrequencia(status: string) {
    switch (status) {
      case 'Admitido':
        return 'warning';
      case 'Dispensado':
        return 'success';
      case 'Excluido':
        return 'danger';
      default: return;
    }
  }

  exibirMensagemAlerta(): void {
    
      this.messageService.add({
        severity: 'info',
        summary: 'Informação',
        detail: 'Caro estudante, ja pode se inscrever para os exames de recorrência. Aceda ao menu inscrição-exame de recorrência e clique no botão "Gerar Referência" para continuar. Nota: Seu nome irá constar na lista da disciplina após efectuar o pagamento.'
      });
    }
  

}
