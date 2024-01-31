import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SweetAlert } from "src/app/core/componentes/sweetalert/sweet.alert";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { Funcao } from "src/app/core/models/funcao.models";
import { Funcionario } from "src/app/core/models/funcionario.models";
import { FuncionarioService } from "src/app/core/services/funcionario.service";
import { FuncaoComponent } from "../funcao/funcao.component";
import { FuncaoService } from "src/app/core/services/funcao.service";
import { ValidarCpf } from "src/app/core/helpers/validarCPF";

@Component({
  selector: "app-modals",
  templateUrl: "./funcionario.component.html",
  styleUrls: ["./funcionario.lista.component.scss"],
})
export class FuncionarioComponent implements OnInit {
  editando: boolean;
  titulo: string;
  funcao: Funcao;
  listaFuncao: Funcao[];

  public dados = new Funcionario();

  @Output() sucess = new EventEmitter();
  @Input() id: any;
  @Input() dadosEditando: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _toastService: ToastAlert,
    private _service: FuncionarioService,
    private sweetAlert: SweetAlert,
    private modalService: NgbModal,
    private _funcaoService: FuncaoService
  ) {}

  async ngOnInit() {
    await this.listarFuncoes();
    if (this.id != undefined) {
      debugger;
      this.editando == true;
      this.titulo = "Editando Funcionário";
      this.dados.nome = this.dadosEditando.nome;

      this.dados.cpf = this.dadosEditando.cpf;
    } else this.titulo = "Novo Funcionário";
  }

  salvar(nome: string, cpf: string) {
    if (nome == undefined) {
      this._toastService.show("Não foi informado o Nome!", "warning");
      return;
    }

    if (cpf == undefined) {
      this._toastService.show("Não foi informado o CPF!", "warning");
      return;
    }

    let cpfValido = ValidarCpf.cpf(cpf.toString());
    if (cpfValido == false) {
      this._toastService.show("CPF inválido", "error");
      return;
    }

    let novoFuncionario = new Funcionario();
    novoFuncionario.nome = nome;
    novoFuncionario.cpf = cpf;
    novoFuncionario.funcao = this.funcao.descricao;

    if (this.id != undefined) {
      novoFuncionario.id = this.id;
      this._service.editar(this.id, novoFuncionario).subscribe((x) => {
        this.sucess.emit(x.data);
      });
    } else {
      this._service.salvar(novoFuncionario).subscribe((x) => {
        novoFuncionario.id = x.data.id;
        this._toastService.show(
          "Funcionário adicionado com sucesso!",
          "success"
        );
        this.sucess.emit(novoFuncionario);
      });
    }
    this.activeModal.dismiss();
  }

  funcaoSelect(event) {
    this.funcao = event;
  }

  async listarFuncoes() {
    // this._funcaoService.listarFuncao().subscribe((x) => {
    //   debugger;
    //   this.listaFuncao = x;
    // });
    var teste = await this._funcaoService.listarFuncao().toPromise();
    this.listaFuncao = teste;

    if (this.id != undefined) {
      debugger;
      const funcaoEncontrada = teste.find(
        (funcao) => funcao.descricao === this.dadosEditando.funcao
      );
      debugger;
      if (funcaoEncontrada) {
        // Atribuir a função em vez da descrição
        this.funcao = funcaoEncontrada;
      }
    }
  }

  limpar() {
    this.dados = new Funcionario();
    this.funcao = new Funcao();
  }
}
