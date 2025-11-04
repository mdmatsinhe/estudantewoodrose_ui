import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DelegacaoService } from 'src/app/core/services/delegacao.service';
import { Delegacao } from 'src/app/interface/delegacao';
import { Turno } from 'src/app/interface/turno';
import { TurnoService } from '../../../core/services/turno.service';
import { FaculdadeService } from '../../../core/services/faculdade.service';
import { Faculdade } from '../../../interface/faculdade';
import { Curso } from 'src/app/interface/curso';
import { CursoService } from 'src/app/core/services/curso.service';
import { FormDataService } from 'src/app/core/services/form-data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dados-curso',
  templateUrl: './dados-curso.component.html',
  styleUrls: ['./dados-curso.component.scss']
})
export class DadosCursoComponent implements OnInit {
  dadosCursoForm!: FormGroup;
  personalInformation: any;
  delegacoes: Delegacao[] = [];
  selectedDelegacao!: Delegacao;

  faculdades:Faculdade[]=[];
  selectedFaculdade!:Faculdade;

  cursos: Curso[]=[];
  selectedCurso!:Curso;

  turnos: Turno[] = [];
  submitted: boolean = false;

  constructor(
    private formDataService: FormDataService,
    private fb: FormBuilder,
    private router: Router,
    private turnoService: TurnoService,
    private delegacaoService: DelegacaoService,
    private faculdadeService: FaculdadeService,
    private cursoService: CursoService,
    private messageService: MessageService
    ) {}

  ngOnInit(): void {
    this.dadosCursoForm = this.fb.group({
      delegacao: [this.formDataService.getData('delegacao') ||'', Validators.required],
      faculdade: [this.formDataService.getData('faculdade') ||'', Validators.required],
      curso: [this.formDataService.getData('curso') ||'', Validators.required],
      turno: [this.formDataService.getData('turno') ||'', Validators.required]
    });

    this.loadDelegacao();
    this.loadTurno();

    this.loadSelectedValues();
  }

  loadDelegacao() {
    this.delegacaoService.getDelegacao().subscribe(
      {
        next: (value) => {
          this.delegacoes = value;
        },
        error: (err) => {
          console.error("Erro ao carregar estados civis:", err);
        }
      }
    );
  }

  loadTurno() {
    this.turnoService.getTurno().subscribe(
      {
        next: (value) => {
          this.turnos = value;
        },
        error: (err) => {
          console.error("Erro ao carregar estados civis:", err);
        }
      }
    );
  }

  onDelegacaoChange(event:any){
    this.selectedDelegacao=this.dadosCursoForm.get('delegacao')?.value;
    const delegacaoId = this.selectedDelegacao?.id;

    this.faculdadeService.getFaculdade(delegacaoId!).subscribe(
      {
        next: (value) => {
          this.faculdades = value;
        },
        error: (err) => {
          console.error("Erro ao carregar estados civis:", err);
        }
      }
    );   
  }

  onFaculdadeChange(event:any){
    this.selectedFaculdade=this.dadosCursoForm.get('faculdade')?.value;
    const faculdadeId = this.selectedFaculdade?.id;

    this.cursoService.getCursos(faculdadeId!).subscribe(
      {
        next: (value) => {
          this.cursos = value;
        },
        error: (err) => {
          console.error("Erro ao carregar estados civis:", err);
        }
      }
    );  
  }

    // Carrega os valores selecionados para faculdade e curso
    loadSelectedValues(): void {
      const delegacao = this.dadosCursoForm.get('delegacao')?.value;
      if (delegacao) {
        this.onDelegacaoChange({ value: delegacao });
      }
  
      const faculdade = this.dadosCursoForm.get('faculdade')?.value;
      if (faculdade) {
        this.onFaculdadeChange({ value: faculdade });
      }
    }

  saveData() {
    const formValues = this.dadosCursoForm.value;
    for (const key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        this.formDataService.setData(key, formValues[key]);
      }
    }
  }

  nextPage() {
    if (this.dadosCursoForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Campos obrigatórios',
        detail: 'Preencha todos os campos obrigatórios antes de continuar.',
      });
      // Marca todos os campos como "touched" para exibir mensagens de erro nos inputs
      this.dadosCursoForm.markAllAsTouched();
    }else{
      this.saveData();
        this.router.navigate(['steps/confirmation']);
    }   
}

prevPage() {
  this.saveData();
    this.router.navigate(['steps/parents']);
}
}
