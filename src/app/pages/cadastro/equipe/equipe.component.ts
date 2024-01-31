import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SweetAlert } from "src/app/core/componentes/sweetalert/sweet.alert";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { Funcionario } from "src/app/core/models/funcionario.models";
import { FuncionarioService } from "src/app/core/services/funcionario.service";
import { dadosCadastroFuncionario } from "../funcionario/dadosCadastroFuncionario";
import { Equipe } from "src/app/core/models/equipe.models";
import { EquipeService } from "src/app/core/services/equipe.service";

@Component({
  selector: "app-modals",
  templateUrl: "./equipe.component.html",
  styleUrls: ["./equipe.lista.component.scss"],
})
export class EquipeComponent implements OnInit {
  editando: boolean;
  titulo: string;
  listaFuncionario: Funcionario[];
  funcionariosSelecionados: Array<Funcionario> = new Array<Funcionario>();

  public dado = new Equipe();

  @Output() sucess = new EventEmitter();
  @Input() id: any;
  @Input() dadosEditando: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _toastService: ToastAlert,
    private sweetAlert: SweetAlert,
    private modalService: NgbModal,
    private _funcionarioService: FuncionarioService,
    private _service: EquipeService
  ) {}
  ngOnInit() {
    if (this.id != undefined) {
      this.editando == true;
      this.titulo = "Editando Equipe";
      this.dado.descricao = this.dadosEditando.descricao;
      this.dado.codigo = this.dadosEditando.codigo;
      this.funcionariosSelecionados = this.dadosEditando.funcionarios;
    } else this.titulo = "Nova Equipe";
    this.listarFuncionario();
  }

  listarFuncionario() {
    this._funcionarioService.listarFuncionarios().subscribe((x) => {
      if (x) {
        this.listaFuncionario = x;
      }
    });
  }

  funcionarioSelect(event) {
    if (event != undefined && event != null)
      this.funcionariosSelecionados.push(event);

    // let indexRemover = this.listaFuncionario.findIndex(
    //   (i) => i.id === event.id
    // );
    // this.listaFuncionario.splice(indexRemover, 1);
  }

  apagarFuncionario(id: number) {
    if (id > 0) {
      let indexRemover = this.funcionariosSelecionados.findIndex(
        (i) => i.id === id
      );
      // this.listaFuncionario.push(this.funcionariosSelecionados[indexRemover]);

      this.funcionariosSelecionados.splice(indexRemover, 1);
    }
  }

  salvar(descricao: string, codigo: string) {
    if (descricao == undefined) {
      this._toastService.show("Não foi informado a Descrição!", "warning");
      return;
    }

    if (codigo == undefined) {
      this._toastService.show("Não foi informado o Código!", "warning");
      return;
    }

    if (this.funcionariosSelecionados.length == 0) {
      this._toastService.show("Selecione ao menos um Funcionário!", "warning");
      return;
    }

    let novaEquipe = new Equipe();
    novaEquipe.descricao = descricao;
    novaEquipe.codigo = codigo;
    novaEquipe.funcionarios = this.funcionariosSelecionados;

    if (this.id != undefined) {
      novaEquipe.id = this.id;
      this._service.editar(this.id, novaEquipe).subscribe((x) => {
        this.sucess.emit(x.data);
      });
    } else {
      this._service.salvar(novaEquipe).subscribe((x) => {
        novaEquipe.id = x.data.id;
        this._toastService.show("Equipe adicionado com sucesso!", "success");
        this.sucess.emit(novaEquipe);
      });
    }
    this.activeModal.dismiss();
  }

  limpar() {
    this.funcionariosSelecionados = [];
    this.dado = new Equipe();
  }
}
