import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { SweetAlert } from "src/app/core/componentes/sweetalert/sweet.alert";
import { CadastroProjetoService } from "./listagem";
import { ProjetoGeral } from "src/app/core/models/projeto/projetoGeral.model";
import {
  AdvancedSortableDirective,
  SortEvent,
} from "./projeto-sortable.directive";
import { ProjetoService } from "src/app/core/services/projeto.service";
import { dadosCadstroProjeto } from "./dadosCadastroProjeto";
import { ProjetoComponent } from "./projeto.component";

@Component({
  selector: "app-advanced",
  templateUrl: "./projeto.lista.component.html",
  styleUrls: ["./projeto.lista.component.scss"],
  providers: [CadastroProjetoService, DecimalPipe],
})
export class ProjetoListaComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  listaProjeto: ProjetoGeral[];
  tables$: Observable<ProjetoGeral[]>;
  total$: Observable<number>;

  @ViewChildren(AdvancedSortableDirective)
  headers: QueryList<AdvancedSortableDirective>;

  constructor(
    public service: CadastroProjetoService,
    private modalService: NgbModal,
    private toastAlert: ToastAlert,
    private sweetAlert: SweetAlert,
    private _service: ProjetoService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Infinity", path: "/" },
      { label: "Cadastro", path: "/" },
      { label: "Projeto Geral", path: "/", active: true },
    ];

    this.listarProjeto();
  }

  listarProjeto() {
    this._service.listarProjetos().subscribe((x) => {
      if (x) {
        x.forEach((x) => {
          dadosCadstroProjeto.push(x);
        });
        this.listaProjeto = x;
      }
    });
  }

  abrirCadastro() {
    const modal = this.modalService.open(ProjetoComponent, {
      centered: true,
      backdrop: "static",
    });
    modal.componentInstance.sucess.subscribe((dados) => {
      if (dados != undefined) {
        this.listaProjeto.splice(0, 0, dados);
      }
    });
  }

  abrirEditar(id: number) {
    const modal = this.modalService.open(ProjetoComponent, {
      centered: true,
      backdrop: "static",
    });
    let indexEditando = this.listaProjeto.findIndex((i) => i.id === id);
    let dadosEditando = new ProjetoGeral();
    dadosEditando.nome = this.listaProjeto[indexEditando].nome;
    dadosEditando.descricao = this.listaProjeto[indexEditando].descricao;
    modal.componentInstance.id = id;
    modal.componentInstance.dadosEditando = dadosEditando;
    modal.componentInstance.sucess.subscribe((dados) => {
      if (dados != undefined) {
        if (id != undefined) {
          let indexEditar = this.listaProjeto.findIndex((i) => i.id === id);
          this.listaProjeto[indexEditar].descricao = dados.descricao;
          this.listaProjeto[indexEditar].nome = dados.nome;
        }
      }
    });
  }

  async excluir(id: number) {
    let confirm = await this.sweetAlert.ShowYesNo(
      "Excluir",
      "Tem certeza que deseja excluir o projeto?"
    );
    if (confirm) {
      if (id != undefined) {
        this._service.excluir(id).subscribe(
          (result) => {
            let indexRemover = this.listaProjeto.findIndex((i) => i.id === id);
            this.listaProjeto.splice(indexRemover, 1);
            this.toastAlert.show("Excluído com sucesso", "success");
          },
          (error) => {
            this.toastAlert.show(
              "Não foi possível excluir o projeto porque está em uso",
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
