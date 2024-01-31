import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { ProjetoGeral } from "src/app/core/models/projeto/projetoGeral.model";
import { ProjetoService } from "src/app/core/services/projeto.service";

@Component({
  selector: "app-modals",
  templateUrl: "./projeto.component.html",
  styleUrls: ["./projeto.lista.component.scss"],
})
export class ProjetoComponent implements OnInit {
  editando: boolean;
  titulo: string;
  public dados = new ProjetoGeral();

  @Output() sucess = new EventEmitter();
  @Input() id: any;
  @Input() dadosEditando: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _toastService: ToastAlert,
    private _service: ProjetoService
  ) {}

  ngOnInit() {
    if (this.id != undefined) {
      this.editando == true;
      this.titulo = "Editando Projeto";
      this.dados.nome = this.dadosEditando.codigo;
      this.dados.descricao = this.dadosEditando.descricao;
    } else this.titulo = "Novo Projeto";
  }

  salvar(nome: string, descricao: string) {
    if (nome == undefined) {
      this._toastService.show("Não foi informado o nome!", "warning");
      return;
    }
    if (descricao == undefined) {
      this._toastService.show("Não foi informado a Descrição!", "warning");
      return;
    }
    

    let novoProjeto = new ProjetoGeral();

    novoProjeto.nome = nome;
    novoProjeto.descricao = descricao;

    if (this.id != undefined) {
      novoProjeto.id = this.id;
      this._service.editar(this.id, novoProjeto).subscribe((x) => {
        this.sucess.emit(x.data);
      });
    } else {
      this._service.salvar(novoProjeto).subscribe((x) => {
        novoProjeto.id = x.data.id;
        this._toastService.show("Projeto adicionado com sucesso!", "success");
        this.sucess.emit(novoProjeto);
      });
    }

    this.activeModal.dismiss();
  }

  limpar() {
    this.dados = new ProjetoGeral();
  }
}
