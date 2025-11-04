import { Component, OnInit } from '@angular/core';
import { EstudanteService } from 'src/app/core/services/estudante.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { Estudante } from 'src/app/interface/estudante';
import { Inscricao } from 'src/app/interface/inscricao';
import { Utilizador } from 'src/app/interface/utilizador';
import { ContaCorrente } from '../../interface/conta-corrente';
import { ContaCorrenteService } from '../../core/services/conta-corrente.service';
import { MessageService } from 'primeng/api';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-listar-conta-corrente',
  templateUrl: './listar-conta-corrente.component.html',
  styleUrls: ['./listar-conta-corrente.component.scss']
})
export class ListarContaCorrenteComponent implements OnInit {

  token = '';

  userlogado='';
  today: Date = new Date(); // 
  anoSeleccionado='2025';
  semestreSeleccionado='2';
  reciboSelecionado: any;
  subjectId:any;

  page:any;

  estudante!: Estudante;
  
  contas : ContaCorrente[]=[];

  anos : number[]=[2024,2025];

  semestres : number[]=[1,2];

  utilizador!: Utilizador|null;

  contasEmDivida: number = 0; 

  constructor(
    private contaCorrenteService: ContaCorrenteService,
    private tokenService: TokenService,
    private userService: UserService,
    private estudanteService: EstudanteService,
    private messageService: MessageService,
    private reportService: ReportService,
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
    console.log(dados," viste");
    // this.listar(2023,2);
    this.listar(Number(this.anoSeleccionado),Number(this.semestreSeleccionado));
    });
    }
  }

  isPrazoExpirado(contacorrente: any): boolean {
    return !contacorrente.pago && new Date(contacorrente.prazo) < this.today;
  }

  getButtonProperties(contacorrente: any): { icon: string, class: string, title: string } {
    if (contacorrente.situacao === 'CANCELADO' || contacorrente.taxa_desconto === 100) {
      return {
        icon: 'pi pi-ban',
        class: 'p-button-secondary',
        title: 'Isento (Cancelado ou Desconto Total)'
      };
    } else if (!contacorrente.pago && new Date(contacorrente.prazo) < this.today) {
      return {
        icon: 'pi pi-exclamation-triangle',
        class: 'p-button-danger',
        title: 'Fora do Prazo'
      };
    } else if (!contacorrente.pago && new Date(contacorrente.prazo) >= this.today) {
      return {
        icon: 'pi pi-clock',
        class: 'p-button-warning',
        title: 'Dentro do Prazo'
      };
    }
    return {
      icon: 'pi pi-check',
      class: 'p-button-success',
      title: 'Quitado'
    };
  }

  listarDebitos(){
     this.listar(Number(this.anoSeleccionado),Number(this.semestreSeleccionado));
  }

  listar(anolectivo: number,semestre:number){

    console.log(this.estudante," depois s    ",anolectivo," ",semestre)
    this.contaCorrenteService.listarContaCorrente(anolectivo,semestre,this.estudante.id!,this.token).subscribe({
      next: (value) => {
        this.contas=value;
        this.contas = this.contas.sort((a, b) => (a.pago === false ? -1 : 1) - (b.pago === false ? -1 : 1));
       // this.calcularDividas();
        console.log("chegou ", value);
        
      },
      error: (err) =>{
        console.log("Ocorreu erro ", err)
      }
    })
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

  verificarPrazoPagamento(datalimite: Date, dataAtual: Date): boolean {
    return datalimite > dataAtual;
  }

  calcularDividas() {
    this.contasEmDivida = this.contas
      .filter(contacorrente => !contacorrente.pago)
      .reduce((acc, contacorrente) => acc + contacorrente.totalDebito, 0);

    if (this.contasEmDivida > 0) {
      this.mostrarAvisoDivida();
    }
  }

  mostrarAvisoDivida() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso de Dívida',
      detail: 'Você tem emolumentos pendentes. Por favor, pague para visualizar suas notas.',
      sticky: true,
      life: 5000 // Tempo de duração do TOAST (opcional)
    });
  }

  extrato(){
    this.reportService.downloadExtrato(this.estudante.id,Number(this.anoSeleccionado),Number(this.semestreSeleccionado));
  }

  imprimirRecibo(conta: ContaCorrente) {
    this.reciboSelecionado = conta;
    this.reportService.downloadRecibo(this.estudante.id,Number(this.reciboSelecionado.recibo));
  /*
    setTimeout(() => {
     // const printContent = this.reciboContent.nativeElement.innerHTML;
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Recibo</title></head><body>');
       // printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
    }, 100);*/
  }
  
}
