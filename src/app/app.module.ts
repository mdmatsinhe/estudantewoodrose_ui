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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListarNotasComponent } from './pages/listar-notas/listar-notas.component';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from './shared/header/header.component';
import { AtualizarSenhaComponent } from './pages/atualizar-senha/atualizar-senha.component';
import { ListarDisciplinasInscritasComponent } from './pages/listar-disciplinas-inscritas/listar-disciplinas-inscritas.component';
import { ListarContaCorrenteComponent } from './pages/listar-conta-corrente/listar-conta-corrente.component';
import { HistoricoAcademicoComponent } from './pages/historico-academico/historico-academico.component';

require('zone.js/dist/zone');
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListarNotasComponent,
    HeaderComponent,
    AtualizarSenhaComponent,
    ListarDisciplinasInscritasComponent,
    ListarContaCorrenteComponent,
    HistoricoAcademicoComponent
  ],
  imports: [
    BrowserModule,
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
