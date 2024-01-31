import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { CardPlanejado } from "src/app/core/models/controleFisico/cardPlanejado.model";
import { DateService } from "src/app/core/services/date.service";
import { EquipeService } from "src/app/core/services/equipe.service";
import { FuncionarioService } from "src/app/core/services/funcionario.service";
import { Equipe } from "src/app/core/models/equipe.models";
import { ServicoGeral } from "src/app/core/models/servico/servicoGeral.model";
import { EnumExecutor } from "src/app/core/models/servico/enum/enumExecutor";
import { ControleFisicoModel } from "src/app/core/models/controleFisico.models";
import { EnumSituacaoServico } from "src/app/core/models/servico/enum/enumSituacaoServico";
import { ControleFisicoService } from "src/app/core/services/controleFisico.service";
import { Funcionario } from "src/app/core/models/funcionario.models";

@Component({
  selector: "app-modals",
  templateUrl: "./naoPlanejadoPlanejado.component.html",
  styleUrls: ["./moves.component.scss"],
})
export class MoverNaoPlanejadoPlanejado implements OnInit {
  public dados = new ControleFisicoModel();
  public listaFuncionarios: Funcionario[];
  public listaEquipes: Equipe[];
  public tipoExecutor: EnumExecutor;
  public quantidade: number;
  public executorSelecionado: Funcionario;
  public equipeSelecionada: Equipe;

  @Output() sucess = new EventEmitter();
  @Input() id: any;
  @Input() dadosEditando: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _toastService: ToastAlert,
    public _dateService: DateService,
    public _funcionarioService: FuncionarioService,
    public _equipeService: EquipeService,
    public _controleService: ControleFisicoService
  ) {}

  async ngOnInit() {
    this.quantidade = this.dadosEditando.quantidade;
    this.carregarEquipe();
    this.carregarFuncionarios();
  }

  moverCard(dataFinal: Date, dataInicial: Date, local: string) {
    if (local == undefined) {
      this._toastService.show("Local não foi informado!", "warning");
      return;
    }
    if (this.dados.executorId == undefined) {
      this._toastService.show("Executor não foi informado!", "warning");
      return;
    }

    if (this.dados.quantidade == undefined) {
      if (this.quantidade != undefined || this.quantidade == 0) {
        this.dados.quantidade = this.quantidade;
      } else {
        this._toastService.show("Quantidade não foi informada!", "warning");
        return;
      }
    }

    let cardNovo = new ControleFisicoModel();
    cardNovo.id = this.id;
    cardNovo.situacao = EnumSituacaoServico.PLANEJADO;
    cardNovo.quantidade = this.dados.quantidade;
    cardNovo.executorId = this.dados.executorId;
    cardNovo.servico = this.dadosEditando.servico;
    cardNovo.unidade = this.dadosEditando.unidade;
    cardNovo.dataInicial = this.dadosEditando.dataInicial;
    cardNovo.dataFinal = this.dadosEditando.dataFinal;

    cardNovo.local = local;
    if (this.tipoExecutor == 0) {
      cardNovo.tipoExecutor = EnumExecutor.FUNCIONARIO;
    } else cardNovo.tipoExecutor = EnumExecutor.EQUIPE;

    cardNovo.dataInicial = dataInicial;
    cardNovo.dataFinal = dataFinal;
    this._controleService.editar(cardNovo).subscribe((x) => {
      this.sucess.emit(x);
    });
    this.activeModal.dismiss();
  }

  alterarTipoExecutor(event: any) {
    if (event.target.value == "0") {
      this.tipoExecutor = 0;
    } else {
      this.tipoExecutor = 1;
    }
  }

  executorSelect(event: any) {
    this.dados.executorId = event.id;
  }

  quantidadeSelect(event: any) {
    this.dados.quantidade = Number(event.target.value);
  }

  carregarFuncionarios() {
    this._funcionarioService.listarFuncionarios().subscribe((resultado) => {
      this.listaFuncionarios = resultado;
    });
  }

  carregarEquipe() {
    this._equipeService.listarEquipe().subscribe((resultado) => {
      this.listaEquipes = resultado;
    });
  }

  limpar() {
    this.quantidade = 0;
    this.dados.local = "";
    this.executorSelecionado = new Funcionario();
    this.dados.executorId = 0;
    this.dados.dataFinal = new Date();
    this.dados.dataInicial = undefined;
  }
}
