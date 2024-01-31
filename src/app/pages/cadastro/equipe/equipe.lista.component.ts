import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { SweetAlert } from "src/app/core/componentes/sweetalert/sweet.alert";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { CadastroEquipeService } from "./cadastroEquipe.service";
import {
  AdvancedSortableDirective,
  SortEvent,
} from "./equipe-sortable.directive";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Equipe } from "src/app/core/models/equipe.models";
import { EquipeService } from "src/app/core/services/equipe.service";
import { dadosCadastroEquipe } from "./dadosCadastroEquipe";
import { EquipeComponent } from "./equipe.component";

@Component({
  selector: "app-advanced",
  templateUrl: "./equipe.lista.component.html",
  styleUrls: ["./equipe.lista.component.scss"],

  providers: [CadastroEquipeService, DecimalPipe],
})
export class EquipeListaComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  listaEquipe: Equipe[];
  tables$: Observable<Equipe[]>;
  total$: Observable<number>;

  @ViewChildren(AdvancedSortableDirective)
  headers: QueryList<AdvancedSortableDirective>;

  constructor(
    public service: CadastroEquipeService,
    private modalService: NgbModal,
    private toastAlert: ToastAlert,
    private sweetAlert: SweetAlert,
    private _service: EquipeService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Infinity", path: "/" },
      { label: "Cadastro", path: "/" },
      { label: "Equipe", path: "/", active: true },
    ];

    this.listarEquipe();
  }

  listarEquipe() {
    this._service.listarEquipe().subscribe((x) => {
      if (x) {
        x.forEach((x) => {
          dadosCadastroEquipe.push(x);
        });
        this.listaEquipe = x;
      }
    });
  }
  
  async excluir(id: number) {
    let confirm = await this.sweetAlert.ShowYesNo(
      "Excluir",
      "Tem certeza que deseja excluir o funcionário?"
    );
    if (confirm) {
      if (id != undefined) {
        this._service.excluir(id).subscribe(
          (result) => {
            let indexRemover = this.listaEquipe.findIndex((i) => i.id === id);
            this.listaEquipe.splice(indexRemover, 1);
            this.toastAlert.show("Excluído com sucesso", "success");
          },
          (error) => {
            this.toastAlert.show(
              "Não foi possível excluir a função porque está em uso",
              "error"
            );
            console.log(error);
          }
        );
      }
    }
  }

  abrirCadastro() {
    const modal = this.modalService.open(EquipeComponent, {
      centered: true,
      backdrop: "static",
    });
    modal.componentInstance.sucess.subscribe((dados) => {
      if (dados != undefined) {
        this.listaEquipe.splice(0, 0, dados);
      }
    });
  }

  abrirEditar(id: number) {
    const modal = this.modalService.open(EquipeComponent, {
      centered: true,
      backdrop: "static",
    });
    let indexEditando = this.listaEquipe.findIndex((i) => i.id === id);
    let dadosEditando = this.listaEquipe[indexEditando];
    modal.componentInstance.id = id;
    modal.componentInstance.dadosEditando = dadosEditando;

    modal.componentInstance.sucess.subscribe((dados) => {
      if (dados != undefined) {
        if (id != undefined) {
          let indexEditar = this.listaEquipe.findIndex((i) => i.id === id);
          this.listaEquipe[indexEditar].codigo = dados.codigo;
          this.listaEquipe[indexEditar].descricao = dados.descricao;
          this.listaEquipe[indexEditar].funcionarios = dados.funcionarios;
        }
      }
    });
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
