import { Component, OnInit, ViewChild } from '@angular/core';
import { Pauta } from 'src/app/interface/pauta';
import { PautaService } from '../../core/services/pauta.service';
import { TokenService } from '../../core/services/token.service';
import { UserService } from '../../core/services/user.service';
import { Utilizador } from '../../interface/utilizador';
import { Estudante } from '../../interface/estudante';
import { EstudanteService } from 'src/app/core/services/estudante.service';

@Component({
  selector: 'app-listar-notas',
  templateUrl: './listar-notas.component.html',
  styleUrls: ['./listar-notas.component.scss']
})
export class ListarNotasComponent implements OnInit {

  token = '';

  userlogado='';

  anoSeleccionado='2025';
  semestreSeleccionado='2';

  subjectId:any;

  estudante!: Estudante;
  
  pautas : Pauta[]=[];

  anos : number[]=[2023,2024,2025];

  semestres : number[]=[1,2];

  utilizador!: Utilizador|null;
 
  constructor(
    private pautaService: PautaService,
    private tokenService: TokenService,
    private userService: UserService,
    private estudanteService: EstudanteService
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


  listarNotas(){
     this.listar(Number(this.anoSeleccionado),Number(this.semestreSeleccionado));
  }

  listar(anolectivo: number,semestre:number){

    console.log(this.estudante," depois s    ")
    this.pautaService.listarNotas(anolectivo,semestre,this.estudante.id!,this.token).subscribe({
      next: (value) => {
        this.pautas=value;
        console.log("chegou ", value);
        
      },
      error: (err) =>{
        console.log("Ocorreu erro ", err)
      }
    })
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

getSeverityFinal(status: string) {
  switch (status) {
      case 'Aprovado':
          return 'success';
      case 'Reprovado':
          return 'danger';
          default: return;
  }
}
  

}




