import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { ServicoGeral } from "src/app/core/models/servico/servicoGeral.model";
import { ServicoService } from "src/app/core/services/servico.service";

@Component({
  selector: "app-modals",
  templateUrl: "./servico.component.html",
  styleUrls: ["./servico.lista.component.scss"],
})
export class ServicoComponent implements OnInit {
  editando: boolean;
  titulo: string;
  public dados = new ServicoGeral();

  @Output() sucess = new EventEmitter();
  @Input() id: any;
  @Input() dadosEditando: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _toastService: ToastAlert,
    private _service: ServicoService
  ) {}

  ngOnInit() {
    if (this.id != undefined) {
      this.editando == true;
      this.titulo = "Editando Serviço";
      this.dados.codigo = this.dadosEditando.codigo;
      this.dados.descricao = this.dadosEditando.descricao;
      this.dados.unidade = this.dadosEditando.unidade;
    } else this.titulo = "Novo Serviço";
  }

  salvar(codigo: string, descricao: string, unidade: string) {
    if (codigo == undefined) {
      this._toastService.show("Não foi informado o código!", "warning");
      return;
    }
    if (descricao == undefined) {
      this._toastService.show("Não foi informado a Descrição!", "warning");
      return;
    }
    if (unidade == undefined) {
      this._toastService.show("Não foi informado a Unidade!", "warning");
      return;
    }

    let novoServico = new ServicoGeral();

    novoServico.codigo = codigo;
    novoServico.descricao = descricao;
    novoServico.unidade = unidade;

    if (this.id != undefined) {
      novoServico.id = this.id;
      this._service.editar(this.id, novoServico).subscribe((x) => {
        this.sucess.emit(x.data);
      });
    } else {
      this._service.salvar(novoServico).subscribe((x) => {
        novoServico.id = x.data.id;
        this._toastService.show("Serviço adicionado com sucesso!", "success");
        this.sucess.emit(novoServico);
      });
    }

    this.activeModal.dismiss();
  }

  limpar() {
    this.dados = new ServicoGeral();
  }
}
