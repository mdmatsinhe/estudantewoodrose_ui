import { Component, OnInit } from '@angular/core';
import { EstudanteService } from 'src/app/core/services/estudante.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { Estudante } from 'src/app/interface/estudante';
import { Utilizador } from 'src/app/interface/utilizador';
import { Inscricao } from '../../interface/inscricao';
import { DisciplinasInscritasService } from '../../core/services/disciplinas-inscritas.service';

@Component({
  selector: 'app-listar-disciplinas-inscritas',
  templateUrl: './listar-disciplinas-inscritas.component.html',
  styleUrls: ['./listar-disciplinas-inscritas.component.scss']
})
export class ListarDisciplinasInscritasComponent implements OnInit{

  token = '';

  userlogado='';

  anoSeleccionado='2024';
  semestreSeleccionado='1';

  subjectId:any;

  estudante!: Estudante;
  
  disciplinasInscritas : Inscricao[]=[];

  anos : number[]=[2023,2024];

  semestres : number[]=[1,2];

  utilizador!: Utilizador|null;


  constructor(
    private disciplinasInscritasService: DisciplinasInscritasService,
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


  listarDisciplinas(){
     this.listar(Number(this.anoSeleccionado),Number(this.semestreSeleccionado));
  }

  listar(anolectivo: number,semestre:number){

    console.log(this.estudante," depois s    ")
    this.disciplinasInscritasService.listarDisciplinas(anolectivo,semestre,this.estudante.id!,this.token).subscribe({
      next: (value) => {
        this.disciplinasInscritas=value;
        console.log("chegou ", value);
        
      },
      error: (err) =>{
        console.log("Ocorreu erro ", err)
      }
    })
  }


}
