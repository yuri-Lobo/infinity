import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbDropdownModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PagesRoutingModule } from "./pages-routing.module";
import { DashboardsModule } from "./dashboards/dashboards.module";
import { CadastroModule } from "./cadastro/cadastro.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UsuarioListaComponent } from "./usuarios/usuario.lista.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbDropdownModule,
    DashboardsModule,
    PagesRoutingModule,
    CadastroModule,
    NgbModule,
    ReactiveFormsModule,
    NgbDropdownModule,
  ],
  entryComponents: [UsuarioListaComponent],
})
export class PagesModule {}
