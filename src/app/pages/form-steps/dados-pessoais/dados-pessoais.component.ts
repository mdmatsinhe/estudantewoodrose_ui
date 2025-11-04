import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DistritoService } from 'src/app/core/services/distrito.service';
import { FormDataService } from 'src/app/core/services/form-data.service';
import { NacionalidadeService } from 'src/app/core/services/nacionalidade.service';
import { ProvinciaService } from 'src/app/core/services/provincia.service';
import { SexoService } from 'src/app/core/services/sexo.service';
import { TipoDocumentoIdentificacaoService } from 'src/app/core/services/tipo-documento-identificacao.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { Distrito } from 'src/app/interface/distrito';
import { EstadoCivil } from 'src/app/interface/estado-civil';
import { Nacionalidade } from 'src/app/interface/nacionalidade';
import { Provincia } from 'src/app/interface/provincia';
import { Sexo } from 'src/app/interface/sexo';
import { TipoDocumentoIdentificacao } from 'src/app/interface/tipo-documento-identificacao';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss'],
  encapsulation: ViewEncapsulation.None, 
})
export class DadosPessoaisComponent {
  dadosPessoaisForm!: FormGroup;
  personalInformation: any;
  token ='';
  sexos: Sexo[] = [];
  selectedSexo!: Sexo;
  tiposDocumentos: TipoDocumentoIdentificacao[] = [];
  nacionalidades: Nacionalidade[] = [];
  selectedNacionalidade!: Nacionalidade;
  provincias: Provincia[] = [];
  selectedProvincia: Provincia|null=null;
  distritos: Distrito[] = [];
  selectedDistrito: Distrito|null=null;
  distritosFiltrados: Distrito[] = [];
  submitted: boolean = false;
  mostrarProvincias: boolean = false;

  constructor(
    private formDataService: FormDataService,
    private fb: FormBuilder,
    private router: Router,
    private provinciaService: ProvinciaService,
    private sexoService: SexoService,
    private nacionalidadeService: NacionalidadeService,
    private tipoDocumentoIdentificaoService: TipoDocumentoIdentificacaoService,
    private userService: UserService,
    private tokenService: TokenService,
    private distritoService: DistritoService,
    private messageService: MessageService) { }

  ngOnInit() { 
      this.personalInformation = '';
 
        this.dadosPessoaisForm = this.fb.group({
        nome: [this.formDataService.getData('nome') ||'', Validators.required],
        apelido: [this.formDataService.getData('apelido') ||'', Validators.required],
        dataNascimento: [this.formDataService.getData('dataNascimento') ||'', [Validators.required, 
          this.dataNaoFutura()]],
        sexo: [this.formDataService.getData('sexo') ||'', Validators.required],
        telefone: [this.formDataService.getData('telefone') ||'', [Validators.required, Validators.pattern(/^(82|83|84|85|86|87)\d{7}$/)]],
        telefoneFixo: [this.formDataService.getData('telefoneFixo') ||''],
        tipoDoc: [this.formDataService.getData('tipoDoc') ||'', Validators.required],
        numeroDoc: [this.formDataService.getData('numeroDoc') ||'', Validators.required],
        nacionalidade: [this.formDataService.getData('nacionalidade') ||'', Validators.required],
        email: [this.formDataService.getData('email') || ''],
        provincia: [this.formDataService.getData('provincia') || ''],
        distrito: [this.formDataService.getData('distrito') || '']
      });

        this.loadSexos();
        this.loadNacionalidades();
        this.loadProvincias();
        this.loadTiposDocumentos();
       // Sincronizando a exibição de província com a nacionalidade selecionada
    this.selectedNacionalidade = this.dadosPessoaisForm.get('nacionalidade')?.value;
    this.atualizarExibicaoProvincia(this.selectedNacionalidade.nacionalidade);
    this.loadSelectedValues();

  }
  // Validador customizado para garantir que a data não seja futura
  dataNaoFutura() {
    return (control: any) => {
      const dataNascimento = new Date(control.value);
      const dataAtual = new Date();
      if (dataNascimento > dataAtual) {
        return { 'dataFutura': true };
      }
      return null;
    };
  }

  loadSexos() {
    this.sexoService.getSexos().subscribe(
      {
        next: (value) => {
          this.sexos = value;
        },
        error: (err) => {
          console.error("Erro ao carregar estados civis:", err);
        }
      }
    );
  }

  loadProvincias() {
    this.provinciaService.getProvincias().subscribe(
      {
        next: (value) => {
          this.provincias = value;
        },
        error: (err) => {
          console.error("Erro ao carregar estados civis:", err);
        }
      }
    );
  }

  loadNacionalidades() {
    this.nacionalidadeService.getNacionalidades().subscribe(
      {
        next: (value) => {
          this.nacionalidades = value;
        },
        error: (err) => {
          console.error("Erro ao carregar estados civis:", err);
        }
      }
    );
  }

  loadTiposDocumentos() {
    this.tipoDocumentoIdentificaoService.getDocumentos().subscribe(
      {
        next: (value) => {
          this.tiposDocumentos = value;
        },
        error: (err) => {
          console.error("Erro ao carregar estados civis:", err);
        }
      }
    );
  }

  // Atualiza a exibição do campo de província baseado na nacionalidade selecionada
  atualizarExibicaoProvincia(nacionalidade: string) {
    this.mostrarProvincias = nacionalidade === 'Moçambicano(a)';
  }

  // Método para verificar a nacionalidade selecionada
  onNacionalidadeChange(event: any): void {
    this.selectedNacionalidade=this.dadosPessoaisForm.get('nacionalidade')?.value;
    this.mostrarProvincias = this.selectedNacionalidade.nacionalidade === 'Moçambicano(a)';
    
    if (!this.mostrarProvincias) {
      this.dadosPessoaisForm.get('provincia')?.reset();
    }
  }

  onProvinciaChange(event: any) {
    const selectedProvinciaId = event.value;
   // this.distritosFiltrados = this.distritos.filter(d => d.provinciaId === selectedProvinciaId);
    this.distritoService.getTodosDistritos(selectedProvinciaId?.id).subscribe(
      {
        next: (value) => {
          this.distritos = value;
        },
        error: (err) => {
          console.error("Erro ao carregar estados civis:", err);
        }
      }
    );
  }

  saveData() {
    const formValues = this.dadosPessoaisForm.value;
    for (const key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        this.formDataService.setData(key, formValues[key]);
      }
    }
  }

   // Carrega os valores selecionados para faculdade e curso
   loadSelectedValues(): void {
    const provincia = this.dadosPessoaisForm.get('provincia')?.value;
    if (provincia) {
      this.onProvinciaChange({ value: provincia });
    }
  }

  nextPage() {
    if (this.dadosPessoaisForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Campos obrigatórios',
        detail: 'Preencha todos os campos obrigatórios antes de continuar.',
      });
      // Marca todos os campos como "touched" para exibir mensagens de erro nos inputs
      this.dadosPessoaisForm.markAllAsTouched();
    } else {
          this.saveData();
          this.router.navigate(['steps/parents']);

      this.submitted = true;
    }
  }
}