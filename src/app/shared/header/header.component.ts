import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { ContaCorrenteService } from 'src/app/core/services/conta-corrente.service';
import { EstudanteService } from 'src/app/core/services/estudante.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { ContaCorrente } from 'src/app/interface/conta-corrente';
import { Estudante } from 'src/app/interface/estudante';
import { MessageService } from 'primeng/api';
import { catchError, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Input()  nomeUtilizador : string = '';
  temDividas: boolean = false;
  estudante!: Estudante;
  token = '';
  userlogado='';
  subjectId:any;
  display: boolean = true;
  contasEmDivida: number = 0;
  contas: ContaCorrente[] = [];

  mostrarHistorico: boolean = false;
  mostrarExameRecorrencia: boolean = false;


  // Map para armazenar os códigos dos estudantes por área
 estudantesPorArea: Map<string, string[]> = new Map([
  ["C.J", ["20231913", "20232061", "20232164", "20231430", "20230964", "20231648"]],
  ["AGE", ["20231661", "20240599", "20231645", "20231245"]],
  ["E.A", ["20240599", "20230719", "20232106", "20232092", "20231980"]],
  ["EE.", ["20231693", "20231513", "20231473", "20231437"]],
  ["EC", ["20232096", "20232117", "20240968", "20230992"]],
  ["E.I.T.", ["20230337", "20231403", "20231348", "20240606", "20231758"]]
]);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private estudanteService: EstudanteService,
    private tokenService: TokenService,
    private contaCorrenteService: ContaCorrenteService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.possuiToken()){
      this.token=this.tokenService.retornarToken();
      console.log(this.token);
      this.userService.retornarUser().subscribe(user => this.subjectId = user);
      console.log(this.subjectId.subjectId,this.token)
      this.estudanteService.getByUser(this.subjectId.subjectId,this.token).subscribe( (dados) => {
      this.estudante=dados;
      this.userlogado=this.estudante.nome+' '+this.estudante.apelido+' - '+this.estudante.numero 

      this.display=!Array.from(this.estudantesPorArea.values()).some(lista =>
       lista.includes(this.estudante.numero+'')
     );
     console.log(this.display + 'o valor do item do menu');
      // this.listar(2023,2);
      
      });
      }
  }

  listarDebitos(anolectivo: number, semestre: number): Observable<ContaCorrente[]> {
    return this.contaCorrenteService.listarContaCorrente(anolectivo, semestre, this.estudante.id!, this.token).pipe(
      tap((value) => {
        this.contas = value;
        console.log(this.contas);
        this.calcularDividas();
        console.log(this.contasEmDivida + " verificar dividas");
      }),
      catchError(err => {
        console.error("Erro ao listar débitos", err);
        return of([]); // Retorna uma lista vazia em caso de erro para não quebrar a cadeia
      })
    );
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

      console.log(this.contasEmDivida+" quantas dividas existem "+this.contas+" nao sei");
  }

  mostrarAvisoDivida(): void {
    const messageRef = this.messageService.add({
      severity: 'error',
      summary: 'Atenção',
      detail: `Caro Estudante, para realizar esta operação regularize a situação financeira, existem dívidas por pagar. Valor total: ${this.contasEmDivida.toFixed(2)} Meticais.`,
      sticky: true
    });

    setTimeout(() => {
      this.router.navigate(['/contacorrente']);
    }, 3000);
  }

  irHistorico(){
    this.listarDebitos(2024,2).subscribe(() => {
      this.calcularDividas();
      console.log(this.contasEmDivida+" dividas calculadas");
      if (this.contasEmDivida > 0) {
        this.mostrarAvisoDivida();
      } else {
        this.router.navigate(['/historico']);
      }
    });
  }

  irInscricao(){
    this.listarDebitos(2024,2).subscribe(() => {
      this.calcularDividas();
      console.log(this.contasEmDivida+" dividas calculadas");
      if (this.contasEmDivida > 0) {
        this.mostrarAvisoDivida();
      } else {
        this.router.navigate(['/inscricao/semestral']);
      }
    });
  }

  

}
