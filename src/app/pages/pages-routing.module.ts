import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ControleFisicoComponent } from "./controlefisico/controle-fisico.component";
import { ServicoListaComponent } from "./cadastro/servico/servico.lista.component";
import { UsuarioListaComponent } from "./usuarios/usuario.lista.component";
import { ProjetoListaComponent } from "./cadastro/projeto/projeto.lista.component";

const routes: Routes = [
  { path: "servico", component: ServicoListaComponent },
  { path: "controlefisico", component: ControleFisicoComponent },
  { path: "usuario", component: UsuarioListaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
