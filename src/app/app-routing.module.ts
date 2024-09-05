import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { ListarNotasComponent } from './pages/listar-notas/listar-notas.component';
import { AtualizarSenhaComponent } from './pages/atualizar-senha/atualizar-senha.component';
import { ListarContaCorrenteComponent } from './pages/listar-conta-corrente/listar-conta-corrente.component';
import { ListarDisciplinasInscritasComponent } from './pages/listar-disciplinas-inscritas/listar-disciplinas-inscritas.component';
import { HistoricoAcademicoComponent } from './pages/historico-academico/historico-academico.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'notas', component: ListarNotasComponent},
  {path: 'auth/reset', component: AtualizarSenhaComponent},
  {path: 'contacorrente', component: ListarContaCorrenteComponent},
  {path: 'disciplinas', component: ListarDisciplinasInscritasComponent},
  {path: 'historico', component: HistoricoAcademicoComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
