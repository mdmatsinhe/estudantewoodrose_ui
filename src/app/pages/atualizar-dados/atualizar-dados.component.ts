import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudanteService } from 'src/app/core/services/estudante.service';
import { Provincia } from 'src/app/interface/provincia';
import { Utilizador } from 'src/app/interface/utilizador';
import { Distrito } from '../../interface/distrito';
import { EstadoCivilService } from '../../core/services/estado-civil.service';
import { TokenService } from 'src/app/core/services/token.service';
import { ProvinciaService } from '../../core/services/provincia.service';
import { SexoService } from '../../core/services/sexo.service';
import { NacionalidadeService } from '../../core/services/nacionalidade.service';
import { TipoDocumentoIdentificacaoService } from '../../core/services/tipo-documento-identificacao.service';
import { EstadoCivil } from '../../interface/estado-civil';
import { Sexo } from '../../interface/sexo';
import { TipoDocumentoIdentificacao } from 'src/app/interface/tipo-documento-identificacao';
import { Nacionalidade } from 'src/app/interface/nacionalidade';
import { DistritoService } from '../../core/services/distrito.service';
import { Estudante } from 'src/app/interface/estudante';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-atualizar-dados',
  templateUrl: './atualizar-dados.component.html',
  styleUrls: ['./atualizar-dados.component.scss']
})
export class AtualizarDadosComponent implements OnInit {

  estudanteForm: FormGroup = this.fb.group({});
  token = '';
  sexos: Sexo[] = [];
  estadosCivis: EstadoCivil[] = [];;
  tiposDocumentos: TipoDocumentoIdentificacao[] = [];
  nacionalidades: Nacionalidade[] = [];

  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  distritosFiltrados: Distrito[] = [];
  utilizador!: Utilizador | null;
  estudante!: Estudante;
  userlogado = '';
  subjectId: any;


  constructor(private fb: FormBuilder, private estudanteService: EstudanteService,
    private estadoCivilService: EstadoCivilService,
    private tokenService: TokenService,
    private provinciaService: ProvinciaService,
    private sexoService: SexoService,
    private nacionalidadeService: NacionalidadeService,
    private tipoDocumentoIdentificaoService: TipoDocumentoIdentificacaoService,
    private distritoService: DistritoService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.estudanteForm = this.fb.group({
      nuit:null,
      nome: ['', Validators.required],
      apelido: ['', Validators.required],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      endereco: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nomePai: ['', Validators.required],
      nomeMae: ['', Validators.required],
      tipoDocumentoIdentificacao: ['', Validators.required],
      numeroDocumentoIdentificacao: ['', Validators.required],
      validadeDocumentoIdentificacao: ['', Validators.required],
      nacionalidade: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      telefonePai:[0],
      telefoneMae:[0],
      telefoneFixo:[0],
      nomeResponsavelFinanceiro:[''],
      emailResponsavelFinanceiro:[''],
    });

    if (this.tokenService.possuiToken()) {
      this.token = this.tokenService.retornarToken();
      this.loadEstadosCivis(this.token);
      this.loadNacionalidades();
      this.loadProvincias();
      this.loadSexos();
      this.loadTiposDocumentos();
      this.userService.retornarUser().subscribe(user => this.subjectId = user);
      this.estudanteService.getByUser(this.subjectId.subjectId, this.token).subscribe(
        (data) => {
          this.estudante = data;
          console.log(this.estudante.provinciaId+'  '+this.estudante.distritoId)
          this.estudanteForm.controls['provincia'].setValue(this.estudante.provinciaId);
          this.carregarDistritos(this.estudante.provinciaId, this.estudante.distritoId);
          this.estudanteForm.patchValue(this.estudante);  // Preenche o formulário com os dados
        }
      );
    }
    // this.loadProvincias();
    // this.loadDistritos();
  }



  loadEstadosCivis(token: string) {
    this.estadoCivilService.getEstadosCivis(token).subscribe(
      {
        next: (value) => {
          this.estadosCivis = value;
        },
        error: (err) => {
          console.error("Erro ao carregar estados civis:", err);
        }
      }
    );
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

  carregarDistritos(provinciaId: number, distritoIdSelecionado?: number) {
    this.distritoService.getDistritos(this.token, provinciaId).subscribe((distritos) => {
      this.distritos = distritos;

      // Se `distritoIdSelecionado` for passado, define-o como o valor selecionado no formulário
      if (distritoIdSelecionado) {
        this.estudanteForm.controls['distrito'].setValue(distritoIdSelecionado);
      }
    });
  }

  onProvinciaChange(event: any) {
    const selectedProvinciaId = event.value;
    this.distritosFiltrados = this.distritos.filter(d => d.provinciaId === selectedProvinciaId);
    this.distritoService.getDistritos(this.token, selectedProvinciaId).subscribe(
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

  onSubmit() {
    if (this.estudanteForm.valid) {
      const estudanteData = { ...this.estudante, ...this.estudanteForm.value };
      console.log(estudanteData);
      this.estudanteService.updateEstudante(this.estudante.id, estudanteData,this.token).subscribe(() => {
        alert('Dados atualizados com sucesso!');
      });// Lógica de envio do formulário
    }
  }

}
