import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  NgbDropdownModule,
  NgbModalModule,
  NgbTypeaheadModule,
  NgbPaginationModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { DndModule } from "ngx-drag-drop";
import { AppRoutingModule } from "./cadastro-routing.module";
import { UIModule } from "../../shared/ui/ui.module";
import { ServicoListaComponent } from "./servico/servico.lista.component";
import { ControleFisicoComponent } from "../controlefisico/controle-fisico.component";
import { ServicoComponent } from "./servico/servico.component";
import { UiSwitchModule } from "ngx-ui-switch";
import { NovoServicoComponent } from "../controlefisico/novoservico";
import { MoverPlanejadoAndamento } from "../controlefisico/moves/planejamentoAndamento.component";
import { MoverAndamentoConcluido } from "../controlefisico/moves/andamentoConcluido.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { MoverNaoPlanejadoPlanejado } from "../controlefisico/moves/naoPlanejadoPlanejado.component";
import { MoverNaoPlanejadoAndamento } from "../controlefisico/moves/naoPlanejadoAndamento.component";
import { NovoNaoPlanejadoComponent } from "../controlefisico/novo/novoNaoPlanejado.component";
import { NovoPlanejadoComponent } from "../controlefisico/novo/novoPlanejado.component";
import { NovoAndamentoComponent } from "../controlefisico/novo/novoAndamento.component";
import { EquipeListaComponent } from "./equipe/equipe.lista.component";
import { FuncaoListaComponent } from "./funcao/funcao.lista.component";
import { FuncionarioListaComponent } from "./funcionario/funcionario.lista.component";
import { EquipeComponent } from "./equipe/equipe.component";
import { FuncionarioComponent } from "./funcionario/funcionario.component";
import { FuncaoComponent } from "./funcao/funcao.component";
import { UsuarioComponent } from "./usuarios/usuario.component";
import { UsuarioListaComponent } from "../usuarios/usuario.lista.component";
import { ProjetoListaComponent } from "./projeto/projeto.lista.component";
import { ProjetoComponent } from "./projeto/projeto.component";
import { ProjetoService } from "src/app/core/services/projeto.service";


@NgModule({
  declarations: [
    ServicoListaComponent,
    ControleFisicoComponent,
    ServicoComponent,
    UsuarioListaComponent,
    EquipeListaComponent,
    FuncaoListaComponent,
    FuncionarioListaComponent,
    EquipeComponent,
    FuncionarioComponent,
    FuncaoComponent,
    ProjetoListaComponent,
    ProjetoComponent,
    UsuarioComponent,
    NovoServicoComponent,
    MoverPlanejadoAndamento,
    MoverAndamentoConcluido,
    MoverNaoPlanejadoPlanejado,
    MoverNaoPlanejadoAndamento,
    NovoNaoPlanejadoComponent,
    NovoPlanejadoComponent,
    NovoAndamentoComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbDropdownModule,
    UIModule,
    FormsModule,
    DndModule,
    NgbModalModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    UiSwitchModule,
    HttpClientModule,
    NgbTypeaheadModule,
    NgbTooltipModule,
    NgSelectModule,
  ],
  entryComponents: [
    EquipeComponent,
    FuncionarioComponent,
    FuncaoComponent,
    UsuarioComponent,
    EquipeListaComponent,
    FuncaoListaComponent,
    FuncionarioListaComponent,
    ProjetoListaComponent,
    ProjetoComponent,
    ServicoComponent,
    UsuarioListaComponent,
    MoverPlanejadoAndamento,
    NovoServicoComponent,
    MoverAndamentoConcluido,
    MoverNaoPlanejadoPlanejado,
    MoverNaoPlanejadoAndamento,
    NovoNaoPlanejadoComponent,
    NovoPlanejadoComponent,
    NovoAndamentoComponent,
  ],
  providers: [ProjetoService], 
  bootstrap: [ProjetoComponent],
})
export class CadastroModule {}
