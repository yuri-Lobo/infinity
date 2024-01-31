import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { CardAndamento } from "src/app/core/models/controleFisico/cardAndamento.models";
import { DateService } from "src/app/core/services/date.service";
import { dadosFuncionarioTeste } from "src/app/core/componentes/dadosParaTeste/dadosFuncionarios";
import { CardPlanejado } from "src/app/core/models/controleFisico/cardPlanejado.model";
import { Funcionario } from "src/app/core/models/funcionario.models";
import { Equipe } from "src/app/core/models/equipe.models";
import { EnumExecutor } from "src/app/core/models/servico/enum/enumExecutor";
import { ControleFisicoService } from "src/app/core/services/controleFisico.service";
import { EquipeService } from "src/app/core/services/equipe.service";
import { FuncionarioService } from "src/app/core/services/funcionario.service";
import { ControleFisicoModel } from "src/app/core/models/controleFisico.models";
import { EnumSituacaoServico } from "src/app/core/models/servico/enum/enumSituacaoServico";

@Component({
  selector: "app-modals",
  templateUrl: "./naoPlanejadoAndamento.component.html",
  styleUrls: ["./moves.component.scss"],
})
export class MoverNaoPlanejadoAndamento implements OnInit {
  public dados = new ControleFisicoModel();
  public listaFuncionarios: Funcionario[];
  public listaEquipes: Equipe[];
  public tipoExecutor: EnumExecutor;
  public executorSelecionado: Funcionario;
  public equipeSelecionada: Equipe;
  public quantidade: number;

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
    debugger;
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

    if (dataInicial == undefined) {
      this._toastService.show("Data Inicial não foi informada!", "warning");
      return;
    }
    if (dataFinal == undefined) {
      this._toastService.show("Data Final não foi informada!", "warning");
      return;
    }

    if (dataInicial != undefined && dataFinal != undefined) {
      if (dataInicial > dataFinal) {
        this._toastService.show(
          "A data inicial não pode ser maior que a data final",
          "warning"
        );
        return;
      }
    }

    let cardNovo = new ControleFisicoModel();
    cardNovo.id = this.id;
    cardNovo.situacao = EnumSituacaoServico.ANDAMENTO;
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
      debugger;
      this.listaFuncionarios = resultado;
    });
  }

  carregarEquipe() {
    this._equipeService.listarEquipe().subscribe((resultado) => {
      debugger;
      this.listaEquipes = resultado;
    });
  }
}
