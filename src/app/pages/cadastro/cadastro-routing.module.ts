import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ControleFisicoComponent } from "../controlefisico/controle-fisico.component";
import { ServicoListaComponent } from "./servico/servico.lista.component";
import { EquipeListaComponent } from "./equipe/equipe.lista.component";
import { FuncaoListaComponent } from "./funcao/funcao.lista.component";
import { FuncionarioListaComponent } from "./funcionario/funcionario.lista.component";
import { ProjetoListaComponent } from "./projeto/projeto.lista.component";

const routes: Routes = [
  {
    path: "servico",
    component: ServicoListaComponent,
  },
  {
    path: "equipe",
    component: EquipeListaComponent,
  },
  {
    path: "funcao",
    component: FuncaoListaComponent,
  },
  {
    path: "funcionario",
    component: FuncionarioListaComponent,
  },
  {
    path: "controlefisico",
    component: ControleFisicoComponent,
  },
  {
    path: "projeto",
    component: ProjetoListaComponent,
  },
  // {
  //   path: "usuario",
  //   component: UsuarioListaComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
