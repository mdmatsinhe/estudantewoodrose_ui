import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListarNotasComponent } from './pages/listar-notas/listar-notas.component';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from './shared/header/header.component';
import { AtualizarSenhaComponent } from './pages/atualizar-senha/atualizar-senha.component';
import { ListarDisciplinasInscritasComponent } from './pages/listar-disciplinas-inscritas/listar-disciplinas-inscritas.component';
import { ListarContaCorrenteComponent } from './pages/listar-conta-corrente/listar-conta-corrente.component';
import { HistoricoAcademicoComponent } from './pages/historico-academico/historico-academico.component';
import { FormsModule } from '@angular/forms';  // Importe FormsModule para [(ngModel)]

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { AtualizarDadosComponent } from './pages/atualizar-dados/atualizar-dados.component';
import { ListarDisciplinasRecorrenciaComponent } from './pages/listar-disciplinas-recorrencia/listar-disciplinas-recorrencia.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps'; // Adicionado para o componente Steps
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';// Ajustado para ConfirmDialogModule e ConfirmationService
import {DividerModule} from 'primeng/divider';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

import 'zone.js/dist/zone';
import { FormStepsComponent } from './pages/form-steps/form-steps.component';
import { FiliacaoComponent } from './pages/form-steps/filiacao/filiacao.component';
import { EnderecoComponent } from './pages/form-steps/endereco/endereco.component';
import { ContactosComponent } from './pages/form-steps/contactos/contactos.component';
import { DadosCursoComponent } from './pages/form-steps/dados-curso/dados-curso.component';
import { DadosPessoaisComponent } from './pages/form-steps/dados-pessoais/dados-pessoais.component';
import { InscricaoComponent } from './pages/inscricao/inscricao.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListarNotasComponent,
    HeaderComponent,
    AtualizarSenhaComponent,
    ListarDisciplinasInscritasComponent,
    ListarContaCorrenteComponent,
    HistoricoAcademicoComponent,
    AtualizarDadosComponent,
    ListarDisciplinasRecorrenciaComponent,
    FormStepsComponent,
    FiliacaoComponent,
    EnderecoComponent,
    ContactosComponent,
    DadosCursoComponent,
    DadosPessoaisComponent,
    FormStepsComponent,
    InscricaoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    BrowserModule,
    FlexLayoutModule,
    NgxPaginationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    CardModule,
    ButtonModule,
    TagModule,
    TableModule,
    InputTextModule,
    MatSnackBarModule,
    MatSelectModule,
    ToastModule,
    DialogModule,
    FormsModule,
    DropdownModule,
    StepsModule,
    CalendarModule,
    ConfirmDialogModule,
    CalendarModule,
    CheckboxModule,
    DividerModule
  ],
  providers: [ConfirmationService,MessageService,{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
