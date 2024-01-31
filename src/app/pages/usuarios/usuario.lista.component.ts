import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { SweetAlert } from "src/app/core/componentes/sweetalert/sweet.alert";
import { CadastroUsuarioService } from "./listagem";
import { Usuario } from "src/app/core/models/usuario.models";
import {
  AdvancedSortableDirective,
  SortEvent,
} from "./usuario-sortable.directive";
import { dadosCadstroUsuario } from "./dadosCadastroUsuario";
import { UsuarioComponent } from "../cadastro/usuarios/usuario.component";
import { UserProfileService } from "src/app/core/services/user.service";
import { format } from "date-fns";
@Component({
  selector: "app-advanced",
  templateUrl: "./usuario.lista.component.html",
  styleUrls: ["./usuario.lista.component.scss"],
  providers: [CadastroUsuarioService, DecimalPipe],
})
export class UsuarioListaComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  listaUsuario: Usuario[];
  tables$: Observable<Usuario[]>;
  total$: Observable<number>;

  @ViewChildren(AdvancedSortableDirective)
  headers: QueryList<AdvancedSortableDirective>;

  constructor(
    public service: CadastroUsuarioService,
    private modalService: NgbModal,
    private toastAlert: ToastAlert,
    private sweetAlert: SweetAlert,
    private _service: UserProfileService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Infinity", path: "/" },
      { label: "Usuarios", path: "/", active: true },
    ];

    this.listarUsuario();
  }

  listarUsuario() {
    this._service.listarUsuarios().subscribe((x) => {
      if (x) {
        //this.listaUsuario = x;
        x.forEach((x) => {
          dadosCadstroUsuario.push(x);
        });
        this.listaUsuario = x;
      }
    });
  }
  formatDate(obj: any) {
    const formattedDate = format(new Date(obj), "DD/MM/YYYY HH:mm:ss");
    return formattedDate;
  }
  abrirCadastro() {
    const modal = this.modalService.open(UsuarioComponent, {
      centered: true,
      backdrop: "static",
    });
    modal.componentInstance.sucess.subscribe((dados) => {
      this.listarUsuario();
    });
  }

  abrirEditar(id: number) {
    const modal = this.modalService.open(UsuarioComponent, {
      centered: true,
      backdrop: "static",
    });
    let indexEditando = this.listaUsuario.findIndex((i) => i.id === id);
    let dadosEditando = new Usuario();
    dadosEditando.username = this.listaUsuario[indexEditando].username;
    dadosEditando.password = this.listaUsuario[indexEditando].password;
    modal.componentInstance.id = id;
    modal.componentInstance.dadosEditando = dadosEditando;
    modal.componentInstance.sucess.subscribe((dados) => {
      this.listarUsuario();
    });
  }

  async excluir(id: number) {
    let confirm = await this.sweetAlert.ShowYesNo(
      "Excluir",
      "Tem certeza que deseja excluir o usuário?"
    );
    if (confirm) {
      if (id != undefined) {
        this._service.excluir(id).subscribe(
          (result) => {
            let indexRemover = this.listaUsuario.findIndex((i) => i.id === id);
            this.listaUsuario.splice(indexRemover, 1);
            this.toastAlert.show("Excluído com sucesso", "success");
          },
          (error) => {
            this.toastAlert.show(
              "Não foi possível excluir o usuário porque está em uso",
              "error"
            );
            console.log(error);
          }
        );
      }
    }
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
