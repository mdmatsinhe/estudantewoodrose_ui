import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { ListarNotasComponent } from './pages/listar-notas/listar-notas.component';
import { AtualizarSenhaComponent } from './pages/atualizar-senha/atualizar-senha.component';
import { ListarContaCorrenteComponent } from './pages/listar-conta-corrente/listar-conta-corrente.component';
import { ListarDisciplinasInscritasComponent } from './pages/listar-disciplinas-inscritas/listar-disciplinas-inscritas.component';
import { HistoricoAcademicoComponent } from './pages/historico-academico/historico-academico.component';
import { AtualizarDadosComponent } from './pages/atualizar-dados/atualizar-dados.component';
import { ListarDisciplinasRecorrenciaComponent } from './pages/listar-disciplinas-recorrencia/listar-disciplinas-recorrencia.component';
import { FormStepsComponent } from './pages/form-steps/form-steps.component';
import { DadosPessoaisComponent } from './pages/form-steps/dados-pessoais/dados-pessoais.component';
import { DadosCursoComponent } from './pages/form-steps/dados-curso/dados-curso.component';
import { FiliacaoComponent } from './pages/form-steps/filiacao/filiacao.component';
import { ContactosComponent } from './pages/form-steps/contactos/contactos.component';
import { InscricaoComponent } from './pages/inscricao/inscricao.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'auth/reset', component: AtualizarSenhaComponent},
  {path: 'contacorrente', component: ListarContaCorrenteComponent},
  {path: 'disciplinas', component: ListarDisciplinasInscritasComponent},
  {path: 'historico', component: HistoricoAcademicoComponent},
  {path: 'atualizar/dados', component: AtualizarDadosComponent},
  {path: 'inscricao/exame-recorrencia', component: ListarDisciplinasRecorrenciaComponent},
  {path: 'inscricao/semestral', component: InscricaoComponent},
  {path: 'steps', component: FormStepsComponent, children: [
    { path: '', redirectTo: 'personal', pathMatch: 'full' }, // Rota padrão
    { path: 'personal', component: DadosPessoaisComponent },
    { path: 'course', component: DadosCursoComponent },
    { path: 'parents', component: FiliacaoComponent },
    { path: 'confirmation', component: ContactosComponent }
]},

  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
