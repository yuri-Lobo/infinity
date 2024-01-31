import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import {
  AdvancedSortableDirective,
  SortEvent,
} from "./servico-sortable.directive";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ServicoComponent } from "./servico.component";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { SweetAlert } from "src/app/core/componentes/sweetalert/sweet.alert";
import { ServicoService } from "src/app/core/services/servico.service";
import { CadastroServicoService } from "./listagem";
import { dadosCadstroServico } from "./dadosCadastroServico";
import { ServicoGeral } from "src/app/core/models/servico/servicoGeral.model";

@Component({
  selector: "app-advanced",
  templateUrl: "./servico.lista.component.html",
  styleUrls: ["./servico.lista.component.scss"],
  providers: [CadastroServicoService, DecimalPipe],
})
export class ServicoListaComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  listaServico: ServicoGeral[];
  tables$: Observable<ServicoGeral[]>;
  total$: Observable<number>;

  @ViewChildren(AdvancedSortableDirective)
  headers: QueryList<AdvancedSortableDirective>;

  constructor(
    public service: CadastroServicoService,
    private modalService: NgbModal,
    private toastAlert: ToastAlert,
    private sweetAlert: SweetAlert,
    private _service: ServicoService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Infinity", path: "/" },
      { label: "Cadastro", path: "/" },
      { label: "Serviço Geral", path: "/", active: true },
    ];

    this.listarServico();
  }

  listarServico() {
    this._service.listarServicos().subscribe((x) => {
      if (x) {
        x.forEach((x) => {
          dadosCadstroServico.push(x);
        });
        this.listaServico = x;
      }
    });
  }

  abrirCadastro() {
    const modal = this.modalService.open(ServicoComponent, {
      centered: true,
      backdrop: "static",
    });
    modal.componentInstance.sucess.subscribe((dados) => {
      if (dados != undefined) {
        this.listaServico.splice(0, 0, dados);
      }
    });
  }

  abrirEditar(id: number) {
    const modal = this.modalService.open(ServicoComponent, {
      centered: true,
      backdrop: "static",
    });
    let indexEditando = this.listaServico.findIndex((i) => i.id === id);
    let dadosEditando = new ServicoGeral();
    dadosEditando.codigo = this.listaServico[indexEditando].codigo;
    dadosEditando.descricao = this.listaServico[indexEditando].descricao;
    dadosEditando.unidade = this.listaServico[indexEditando].unidade;
    modal.componentInstance.id = id;
    modal.componentInstance.dadosEditando = dadosEditando;
    modal.componentInstance.sucess.subscribe((dados) => {
      if (dados != undefined) {
        if (id != undefined) {
          let indexEditar = this.listaServico.findIndex((i) => i.id === id);
          this.listaServico[indexEditar].descricao = dados.descricao;
          this.listaServico[indexEditar].codigo = dados.codigo;
          this.listaServico[indexEditar].unidade = dados.unidade;
        }
      }
    });
  }

  async excluir(id: number) {
    let confirm = await this.sweetAlert.ShowYesNo(
      "Excluir",
      "Tem certeza que deseja excluir o serviço?"
    );
    if (confirm) {
      if (id != undefined) {
        this._service.excluir(id).subscribe(
          (result) => {
            let indexRemover = this.listaServico.findIndex((i) => i.id === id);
            this.listaServico.splice(indexRemover, 1);
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
