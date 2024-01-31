import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { CadastroFuncionarioService } from "./cadastroFuncionario.service";
import {
  AdvancedSortableDirective,
  SortEvent,
} from "./funcionario-sortable.directive";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FuncionarioComponent } from "./funcionario.component";
import { dadosCadastroFuncionario } from "./dadosCadastroFuncionario";
import { Funcionario } from "src/app/core/models/funcionario.models";
import { SweetAlert } from "src/app/core/componentes/sweetalert/sweet.alert";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { FuncionarioService } from "src/app/core/services/funcionario.service";

@Component({
  selector: "app-advanced",
  templateUrl: "./funcionario.lista.component.html",
  styleUrls: ["./funcionario.lista.component.scss"],

  providers: [CadastroFuncionarioService, DecimalPipe],
})
export class FuncionarioListaComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  listaFuncionario: Funcionario[];
  tables$: Observable<Funcionario[]>;
  total$: Observable<number>;

  @ViewChildren(AdvancedSortableDirective)
  headers: QueryList<AdvancedSortableDirective>;

  constructor(
    public service: CadastroFuncionarioService,
    private modalService: NgbModal,
    private toastAlert: ToastAlert,
    private sweetAlert: SweetAlert,
    private _service: FuncionarioService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Infinity", path: "/" },
      { label: "Cadastro", path: "/" },
      { label: "Funcionário", path: "/", active: true },
    ];

    this.listarFuncionario();
  }

  listarFuncionario() {
    this._service.listarFuncionarios().subscribe((x) => {
      if (x) {
        x.forEach((x) => {
          dadosCadastroFuncionario.push(x);
        });
        this.listaFuncionario = x;
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
            let indexRemover = this.listaFuncionario.findIndex(
              (i) => i.id === id
            );
            this.listaFuncionario.splice(indexRemover, 1);
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
    const modal = this.modalService.open(FuncionarioComponent, {
      centered: true,
      backdrop: "static",
    });
    modal.componentInstance.sucess.subscribe((dados) => {
      if (dados != undefined) {
        this.listaFuncionario.splice(0, 0, dados);
      }
    });
  }

  abrirEditar(id: number) {
    const modal = this.modalService.open(FuncionarioComponent, {
      centered: true,
      backdrop: "static",
    });
    let indexEditando = this.listaFuncionario.findIndex((i) => i.id === id);
    let dadosEditando = this.listaFuncionario[indexEditando];
    modal.componentInstance.id = id;
    modal.componentInstance.dadosEditando = dadosEditando;
    modal.componentInstance.sucess.subscribe((dados) => {
      if (dados != undefined) {
        if (id != undefined) {
          let indexEditar = this.listaFuncionario.findIndex((i) => i.id === id);
          this.listaFuncionario[indexEditar].nome = dados.nome;
          this.listaFuncionario[indexEditar].funcao = dados.funcao;
          this.listaFuncionario[indexEditar].cpf = dados.cpf;
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
