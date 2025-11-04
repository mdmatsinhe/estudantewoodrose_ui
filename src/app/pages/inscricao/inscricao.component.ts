import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstudanteService } from 'src/app/core/services/estudante.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { Estudante } from 'src/app/interface/estudante';
import { SessaoTurmaRequest } from 'src/app/interface/sessao-turma-request';
import { SessaoTurmaService } from '../../core/services/sessao-turma.service';
import { SessaoTurmaResponse } from '../../interface/sessao-turma-response';
import { DisciplinaSemestreService } from '../../core/services/disciplina-semestre.service';
import { DisciplinaSemestreResponse } from 'src/app/interface/disciplina-semestre-response';
import { InscricaoRequest } from 'src/app/interface/inscricao-request';
import { InscricaoService } from '../../core/services/inscricao.service';
import { MessageService } from 'primeng/api';
import { ReportService } from '../../core/services/report.service';
import { Router } from '@angular/router';
import { DisciplinasInscritasService } from '../../core/services/disciplinas-inscritas.service';
import { Inscricao } from 'src/app/interface/inscricao';
import { ContaCorrente } from 'src/app/interface/conta-corrente';
import { ContaCorrenteService } from '../../core/services/conta-corrente.service';
import { CursoService } from '../../core/services/curso.service';
import { Curso } from 'src/app/interface/curso';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.scss']
})
export class InscricaoComponent implements OnInit {

  inscricaoForm!: FormGroup;
  display: boolean = false;
  token = '';
  totalDisciplinasGrade:number=0;
  userlogado='';

  estudante!: Estudante;
  disciplinasInscritas: Inscricao[] = [];
  subjectId:any;

  turmaSelecionada: any;
  anoLectivoSelecionado: any;
  semestreSeleccionado: any;

  disciplinaAtrasoSelecccionada!: DisciplinaSemestreResponse;

  anosLectivos = [{ label: '2025', value: 2025 }];
  cursos:Curso[]=[];
  turmas: SessaoTurmaResponse[] = [];
  turmasAtraso: SessaoTurmaResponse[] = [];
  disciplinas: any[] = [];
  disciplinasSelecionadas: DisciplinaSemestreResponse[] = [];
  disciplinasAtraso: DisciplinaSemestreResponse[] = [];
  mostrarDisciplinasAtraso = false;
  dropdownOptions: { label: string; value: DisciplinaSemestreResponse }[] = [];

  constructor(private fb: FormBuilder,
    private tokenService: TokenService,
    private userService: UserService,
    private estudanteService: EstudanteService,
    private sessaoTurmaService: SessaoTurmaService,
    private disciplinaSemestreService: DisciplinaSemestreService,
    private inscricaoService: InscricaoService,
    private messageService: MessageService,
    private reportService: ReportService,
    private router: Router,
    private disciplinasInscritasService: DisciplinasInscritasService,
    private cursoService: CursoService
    ) {}

  ngOnInit() {
   
    this.inscricaoForm = this.fb.group({
      numero: [null],
      nome: [null],
      apelido: [null],
      curso: [null],
      curriculo: [null],
      anoLectivo: [2025],
      anoCurso: [null],
      semestre: [null],
      turma: [null],
      turmaAtraso: [null],
      disciplinaAtraso: [null]
    });

     if(this.tokenService.possuiToken()){
      this.token=this.tokenService.retornarToken();
      console.log(this.token);
      this.userService.retornarUser().subscribe(user => this.subjectId = user);
     
      this.estudanteService.getByUser(this.subjectId.subjectId,this.token).subscribe( (dados) => {
      this.estudante=dados;
      this.userlogado=this.estudante.nome+' '+this.estudante.apelido+' - '+this.estudante.numero 
      console.log(dados," viste");
       
      this.cursoService.getCursos(this.estudante.faculdadeId!).subscribe(
        {
          next: (value) => {
            this.cursos = value.sort((a: any, b: any) => {
              return (a.nome || "").localeCompare(b.nome || "");
            });
          },
          error: (err) => {
            console.error("Erro ao carregar estados civis:", err);
          }
        }
      );// Preencher os campos do formulário

      this.inscricaoForm.patchValue({
      numero: this.estudante.numero,
      nome: this.estudante.nome,
      apelido: this.estudante.apelido,
      curso:this.estudante.cursoNome,
      curriculo:this.estudante.curriculoNome
      });

      });
    }
   
  
  }

  onAnoLectivoChange() {
    // Lógica para carregar turmas e disciplinas
  }

  onAnoCursoChange() {
    // Lógica para carregar disciplinas
  }

  onCursoChange() {
   

      const request: SessaoTurmaRequest = {
        cursoId: this.estudante.cursoId, // ID do curso do estudante
        anoLectivo: this.inscricaoForm.get('anoLectivo')?.value,
      };
     //this.semestreSeleccionado=request.semestreId;
     this.anoLectivoSelecionado=request.anoLectivo;
       // Verificar se o estudante já está inscrito
  if (request.anoLectivo && request.cursoId) {
    this.inscricaoService.verificarInscricao(this.estudante.id, request.anoLectivo, this.token).subscribe(
      (inscrito) => {
        if (inscrito) {
          // Exibir mensagem Toast
          this.exibirMensagem('O estudante já está inscrito no ano lectivo '+request.anoLectivo+'.', 'error');
          return;
        } else {
          // Continuar carregando turmas se o estudante não estiver inscrito
          if (request.cursoId) {
            
            console.log(request.anoLectivo+' a '+request.cursoId);
            this.sessaoTurmaService.buscarSessoesTurma(request, this.token).subscribe(
              (sessoes) => {
                if (Array.isArray(sessoes) && sessoes.length > 0) {
                this.turmas = sessoes;
                //this.inscricaoForm.patchValue({ turma: null }); // Limpa o campo de turma para nova seleção
                }else{
                  this.exibirMensagem('Não foi configurada nenhuma turma para o ano lectivo '+request.anoLectivo+'.', 'info');
                }
              },
              (error) => {
                console.error('Erro ao buscar turmas:', error);
              }
            );
          }
        }
      },
      (error) => {
        console.error('Erro ao verificar inscrição:', error);
      }
    );
  }
  }

  exibirMensagem(mensagem: string, tipo: 'success' | 'info' | 'warn' | 'error'): void {
    // Use o componente de Toast de sua biblioteca (PrimeNG, Angular Material, etc.)
    // Exemplo com PrimeNG:
    this.messageService.add({ severity: tipo, summary: 'Aviso', detail: mensagem });
  }

  adicionarDisciplina(): void {
    const disciplinaSelecionada = this.inscricaoForm.get('disciplinaAtraso')?.value;

    const turmaSelecionada = this.inscricaoForm.get('turmaAtraso')?.value;

    // Verificar se o limite de disciplinas extras foi atingido
  const totalDisciplinasExtrasPermitidas = 2; // Limite máximo de disciplinas extras
  const totalDisciplinasExtras = this.disciplinas.length - this.totalDisciplinasGrade; // Cálculo de extras já adicionadas

  if (totalDisciplinasExtras >= totalDisciplinasExtrasPermitidas) {
    // Emitir mensagem de erro
    this.exibirMensagem("Apenas pode adicionar até duas disciplinas além da grade curricular. ","error");
    
    return; // Interrompe o processo
  }

    if (disciplinaSelecionada && turmaSelecionada) {
      // Adicionar a turma ao objeto selecionado
      disciplinaSelecionada.turma = turmaSelecionada.nome;
      disciplinaSelecionada.turmaId=turmaSelecionada.id;

      // Adicionar à tabela
      this.disciplinas.push(disciplinaSelecionada);

      // Remover do dropdown e do array original de disciplinas atrasadas
      this.disciplinasAtraso = this.disciplinasAtraso.filter(
        item => item.id !== disciplinaSelecionada.id
      );

      this.dropdownOptions = this.dropdownOptions.filter(
        item => item.value.id !== disciplinaSelecionada.id
      );

      // Limpar seleção
      this.inscricaoForm.patchValue({ turmaAtraso: null }); //
      this.inscricaoForm.patchValue({ disciplinaAtraso: null }); //
    }
  }

  getSemestreCurso(ano: number, semestre: number): number {
    // Validação simples para garantir que os valores sejam válidos
    if (ano <= 0 || semestre <= 0 || semestre > 2) {
      throw new Error('Ano ou semestre inválido');
    }
  
    // Cálculo do semestreCurso
    return (ano - 1) * 2 + semestre;
  }

  onTurmaAtrasoChange(event: any):void{

  }

  onTurmaChange(event: any): void {
    this.turmaSelecionada = event.value; // Armazena a turma selecionada
    const curriculoId = this.estudante.curriculoId;
 

  if (curriculoId) {
  
    this.disciplinaSemestreService.buscarPorCurriculo(curriculoId,this.token).subscribe(
      (disciplinas: DisciplinaSemestreResponse[]) => {
        // Adiciona a turma selecionada às disciplinas carregadas
        this.disciplinas = disciplinas.map((disciplina) => ({
          ...disciplina,
          turma: this.turmaSelecionada.nome, // Adiciona a turma selecionada
          turmaId: this.turmaSelecionada.id
        }));
        this.totalDisciplinasGrade=this.disciplinas.length;
      },
      (error) => {
        this.exibirMensagem("Erro ao buscar disciplinas: "+error,"error");
      }
    );
  }

   
  }

  registrarInscricao(): void {
   
    const inscricoes: InscricaoRequest[] = this.disciplinasSelecionadas.map(disciplina => ({
      estudanteId: this.estudante.id, // O ID do estudante autenticado
      disciplinaId: disciplina.id!,
      turma: disciplina.turma!,
      anoLectivo: this.inscricaoForm.get('anoLectivo')?.value,
      turmaId:disciplina.turmaId,
      planoMensalidades:4
    }));

    this.disciplinasInscritasService.listarDisciplinas(this.anoLectivoSelecionado, this.semestreSeleccionado, this.estudante.id!, this.token).subscribe({
      next: (value) => {
        this.disciplinasInscritas = value;
        this.messageService.clear();
        if(this.disciplinasInscritas.length>0){
        const messageRef = this.messageService.add({
          severity: 'error',
          summary: 'Atenção',
          detail: `Caro Estudante, ja tem uma inscrição activa para o `+this.semestreSeleccionado+'° semestre do ano '+this.anoLectivoSelecionado,
          sticky: true
        });
        return;
       }else{

        this.inscricaoService.registrarInscricao(inscricoes,this.token).subscribe({
          next: (value)=>{
               this.inscricaoService.gerarPlanos(value,this.token).subscribe(()=>{
                this.display = true;
               })
          },
          error: (error) =>{
            this.exibirMensagem("Erro ao registar inscrições: "+error,"error");
          }
        });

       }
      },
      error: (err) => {
        console.log("Ocorreu erro ", err)
      }
    })
  }


  fechar(){

    this.reportService.downloadBoletimInscricao(this.estudante.id,this.inscricaoForm.get('anoLectivo')?.value,this.inscricaoForm.get('semestre')?.value);
    this.display=false;
    this.router.navigateByUrl("/disciplinas");
  }

  imprimir(){
    this.reportService.downloadBoletimInscricao(this.estudante.id,this.inscricaoForm.get('anoLectivo')?.value,this.inscricaoForm.get('semestre')?.value);
  }

}
