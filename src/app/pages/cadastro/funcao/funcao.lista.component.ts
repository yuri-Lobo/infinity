import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { DecimalPipe } from "@angular/common";

import { Observable } from "rxjs";

import { Table } from "./advanced.model";

import { tableData } from "./data";

import { AdvancedService } from "./advanced.service";
import {
  AdvancedSortableDirective,
  SortEvent,
} from "./advanced-sortable.directive";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FuncaoComponent } from "./funcao.component";
import { CadastroFuncaoService } from "./cadastroFuncao.service";
import { Funcao } from "src/app/core/models/funcao.models";
import { FuncaoService } from "src/app/core/services/funcao.service";
import { SweetAlert } from "src/app/core/componentes/sweetalert/sweet.alert";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { dadosCadstroFuncao } from "./dadosCadastroFuncao";

@Component({
  selector: "app-advanced",
  templateUrl: "./funcao.lista.component.html",
  styleUrls: ["./funcao.lista.component.scss"],
  providers: [CadastroFuncaoService, DecimalPipe],
})

/**
 * Advanced table component - handling the advanced table with sidebar and content
 */
export class FuncaoListaComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;
  listaFuncao: Funcao[];
  tables$: Observable<Funcao[]>;
  total$: Observable<number>;

  @ViewChildren(AdvancedSortableDirective)
  headers: QueryList<AdvancedSortableDirective>;

  constructor(
    public service: CadastroFuncaoService,
    private modalService: NgbModal,
    private toastAlert: ToastAlert,
    private sweetAlert: SweetAlert,
    private _service: FuncaoService
  ) {}

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [
      { label: "Infinity", path: "/" },
      { label: "Cadastro", path: "/" },
      { label: "Função", path: "/", active: true },
    ];

    /**
     * fetch data
     */
    this.listarFuncao();
  }

  listarFuncao() {
    this._service.listarFuncao().subscribe((x) => {
      if (x) {
        x.forEach((x) => {
          dadosCadstroFuncao.push(x);
        });
        this.listaFuncao = x;
      }
    });
  }

  abrirCadastro() {
    const modal = this.modalService.open(FuncaoComponent, {
      centered: true,
      backdrop: "static",
    });
    modal.componentInstance.sucess.subscribe((dados) => {
      if (dados != undefined) {
        this.listaFuncao.splice(0, 0, dados);
      }
    });
  }

  abrirEditar(id: number) {
    const modal = this.modalService.open(FuncaoComponent, {
      centered: true,
      backdrop: "static",
    });
    let indexEditando = this.listaFuncao.findIndex((i) => i.id === id);
    let dadosEditando = new Funcao();
    dadosEditando.codigo = this.listaFuncao[indexEditando].codigo;
    dadosEditando.descricao = this.listaFuncao[indexEditando].descricao;
    modal.componentInstance.id = id;
    modal.componentInstance.dadosEditando = dadosEditando;
    modal.componentInstance.sucess.subscribe((dados) => {
      if (dados != undefined) {
        if (id != undefined) {
          let indexEditar = this.listaFuncao.findIndex((i) => i.id === id);
          this.listaFuncao[indexEditar].descricao = dados.descricao;
          this.listaFuncao[indexEditar].codigo = dados.codigo;
        }
      }
    });
  }

  async excluir(id: number) {
    let confirm = await this.sweetAlert.ShowYesNo(
      "Excluir",
      "Tem certeza que deseja excluir a função?"
    );
    if (confirm) {
      if (id != undefined) {
        this._service.excluir(id).subscribe(
          (result) => {
            let indexRemover = this.listaFuncao.findIndex((i) => i.id === id);
            this.listaFuncao.splice(indexRemover, 1);
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

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
