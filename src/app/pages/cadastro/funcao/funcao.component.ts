import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { Funcao } from "src/app/core/models/funcao.models";
import { FuncaoService } from "src/app/core/services/funcao.service";

@Component({
  selector: "app-modals",
  templateUrl: "./funcao.component.html",
  styleUrls: ["./funcao.lista.component.scss"],
})
export class FuncaoComponent implements OnInit {
  editando: boolean;
  titulo: string;
  public dados = new Funcao();

  @Output() sucess = new EventEmitter();
  @Input() id: any;
  @Input() dadosEditando: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _toastService: ToastAlert,
    private _service: FuncaoService
  ) {}

  ngOnInit() {
    if (this.id != undefined) {
      this.editando == true;
      this.titulo = "Editando Função";
      this.dados.codigo = this.dadosEditando.codigo;
      this.dados.descricao = this.dadosEditando.descricao;
    } else this.titulo = "Nova Função";
  }

  salvar(codigo: string, descricao: string) {
    if (codigo == undefined) {
      this._toastService.show("Não foi informado o código!", "warning");
      return;
    }
    if (descricao == undefined) {
      this._toastService.show("Não foi informado a Descrição!", "warning");
      return;
    }

    let novaFuncao = new Funcao();

    novaFuncao.codigo = codigo;
    novaFuncao.descricao = descricao;

    if (this.id != undefined) {
      novaFuncao.id = this.id;
      this._service.editar(this.id, novaFuncao).subscribe((x) => {
        this.sucess.emit(x.data);
      });
    } else {
      this._service.salvar(novaFuncao).subscribe((x) => {
        novaFuncao.id = x.data.id;
        this._toastService.show("Função adicionada com sucesso!", "success");
        this.sucess.emit(novaFuncao);
      });
    }

    this.activeModal.dismiss();
  }

  limpar() {
    this.dados = new Funcao();
  }
}
