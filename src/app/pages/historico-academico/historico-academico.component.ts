
import { EstudanteService } from 'src/app/core/services/estudante.service';
import { PautaService } from 'src/app/core/services/pauta.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { Estudante } from 'src/app/interface/estudante';
import { Pauta } from 'src/app/interface/pauta';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ContaCorrente } from 'src/app/interface/conta-corrente';
import { ContaCorrenteService } from '../../core/services/conta-corrente.service';
import { MessageService } from 'primeng/api';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-historico-academico',
  templateUrl: './historico-academico.component.html',
  styleUrls: ['./historico-academico.component.scss']
})
export class HistoricoAcademicoComponent {

  isDesktop$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => !result.matches)
  );

  token = '';

  userlogado='';

  anoSeleccionado='2023';
  semestreSeleccionado='2';

  subjectId:any;

  estudante!: Estudante;

  pautas : Pauta[]=[];

  contasEmDivida: number = 0;
  contas: ContaCorrente[] = [];

  constructor(
    private pautaService: PautaService,
    private tokenService: TokenService,
    private userService: UserService,
    private estudanteService: EstudanteService,
    private breakpointObserver: BreakpointObserver,
    private contaCorrenteService: ContaCorrenteService,
    private messageService: MessageService,
    private router: Router
    ) { }

    ngOnInit(): void {
      //  this.dataSource.paginator = this.paginator;
      if(this.tokenService.possuiToken()){
         this.token=this.tokenService.retornarToken();
         console.log(this.token);
         this.userService.retornarUser().subscribe(user => this.subjectId = user);
         console.log(this.subjectId.subjectId,this.token)
         this.estudanteService.getByUser(this.subjectId.subjectId,this.token).subscribe( (dados) => {
         this.estudante=dados;
         this.userlogado=this.estudante.nome+' '+this.estudante.apelido+' - '+this.estudante.numero 
        
         // this.listar(2023,2)
         this.listar();
         });
      }
       }

  

       listar(){

       
        this.pautaService.listarHistorico(this.estudante.id!,this.token).subscribe({
          next: (value) => {
            this.pautas=value;
            
          },
          error: (err) =>{
            console.log("Ocorreu erro ", err)
          }
        })
      }
}
