import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { Usuario } from "src/app/core/models/usuario.models";
import { UserProfileService } from "src/app/core/services/user.service";

@Component({
  selector: "app-modals",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.lista.component.scss"],
})
export class UsuarioComponent implements OnInit {
  editando: boolean;
  titulo: string;
  public dados = new Usuario();

  @Output() sucess = new EventEmitter();
  @Input() id: any;
  @Input() dadosEditando: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _toastService: ToastAlert,
    private _service: UserProfileService
  ) {}

  ngOnInit() {
    if (this.id != undefined) {
      this.editando == true;
      this.titulo = "Editando Usuário";
      this.dados.username = this.dadosEditando.username;
      this.dados.password = this.dadosEditando.password;
      this.dados.nome = this.dadosEditando.nome;
      this.dados.status = this.dadosEditando.status == "ATIVO" ? true : false;
      this.dados.senhaTemporaria = this.dadosEditando.password ? true : false;
    } else this.titulo = "Novo Usuário";
  }

  salvar(username: string, password: string) {
    console.log("aaa");
    if (username == undefined) {
      this._toastService.show("Não foi informado o username!", "warning");
      return;
    }
    if (password == undefined) {
      this._toastService.show("Não foi informado a Password!", "warning");
      return;
    }

    let novoUsuario = new Usuario();
    novoUsuario.username = username;
    novoUsuario.password = password;
    novoUsuario.nome = this.dados.nome;
    novoUsuario.status = this.dados.status ? "ATIVO" : "INATIVO";
    novoUsuario.senhaTemporaria = this.dados.senhaTemporaria;

    if (this.id != undefined) {
      novoUsuario.id = this.id;
      this._service.editar(this.id, novoUsuario).subscribe((x) => {
        this.sucess.emit(x.data);
      });
    } else {
      this._service.salvar(novoUsuario).subscribe((x) => {
        novoUsuario.id = x.data.id;
        this._toastService.show("Usuário adicionado com sucesso!", "success");
        //this.sucess.emit(novoUsuario);
        this.sucess.emit(novoUsuario);
      });
    }
    this.sucess.emit(novoUsuario);

    this.activeModal.dismiss();
  }
}
