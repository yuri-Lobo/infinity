import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { DateService } from "src/app/core/services/date.service";
import { ServicoService } from "src/app/core/services/servico.service";
import { ServicoGeral } from "src/app/core/models/servico/servicoGeral.model";
import { EnumSituacaoServico } from "src/app/core/models/servico/enum/enumSituacaoServico";
import { EnumExecutor } from "src/app/core/models/servico/enum/enumExecutor";
import { FuncionarioService } from "src/app/core/services/funcionario.service";
import { Funcionario } from "src/app/core/models/funcionario.models";
import { Equipe } from "src/app/core/models/equipe.models";
import { EquipeService } from "src/app/core/services/equipe.service";
import { ControleFisicoModel } from "src/app/core/models/controleFisico.models";
import { ControleFisicoService } from "src/app/core/services/controleFisico.service";
import { Data } from "pako";

@Component({
  selector: "app-modals",
  templateUrl: "./novoPlanejado.component.html",
  styleUrls: ["./novoCard.component.scss"],
})
export class NovoPlanejadoComponent implements OnInit {
  public dados = new ControleFisicoModel();
  public listaServicos: ServicoGeral[];
  public listaEquipes: Equipe[];
  public listaFuncionarios: Funcionario[];
  public tipoExecutor: EnumExecutor;
  public servico: ServicoGeral;
  public quantidade: number;
  public executorSelecionado: Funcionario;
  public equipeSelecionada: Equipe;
  

  editando: boolean;
  titulo: string;
  @Output() sucess = new EventEmitter();
  @Input() id: any;
  @Input() dadosEditando: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _toastService: ToastAlert,
    public _dateService: DateService,
    public _servicoService: ServicoService,
    public _funcionarioService: FuncionarioService,
    public _equipeService: EquipeService,
    public _controleService: ControleFisicoService, 
  ) {}
  async ngOnInit() {
    this.tipoExecutor = 0;
    this.carregarServico();
    this.carregarFuncionarios();
    this.carregarEquipe();

    if (this.id != undefined) {
      this.editando == true;
      this.titulo = "Editando Planejado";
      this.dados = this.dadosEditando;
      if (this.dados.dataFinal != undefined || this.dados.dataFinal != null) {
        this.dados.dataFinal = this.dadosEditando.dataFinal.substring(0, 10);
      }

      if (
        this.dados.dataInicial != undefined ||
        this.dados.dataInicial != null
      ) {
        this.dados.dataInicial = this.dadosEditando.dataInicial.substring(
          0,
          10
        );
      }
      this.quantidade = this.dadosEditando.quantidade;
      if (this.dadosEditando.tipoExecutor == "EQUIPE") {
        this.tipoExecutor = EnumExecutor.EQUIPE;
      } else this.tipoExecutor = EnumExecutor.FUNCIONARIO;
    } else this.titulo = "Novo Planejado";
  }
  salvar(dataFinal: Date, dataInicial: Date, local: string, unidade: string) {
    if (this.servico == undefined) {
      this._toastService.show("Serviço não foi informado!", "warning");
    }
    if (local == undefined) {
      this._toastService.show("Local não foi informado!", "warning");
      return;
    }
    if (this.dados.executorId == undefined) {
      this._toastService.show("Executor não foi informado!", "warning");
      return;
    }
    if (this.dados.quantidade == undefined) {
      this._toastService.show("Quantidade não foi informada!", "warning");
      return;
    }
    if (unidade == undefined) {
      this._toastService.show("Unidade não foi informada!", "warning");
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
    cardNovo.situacao = EnumSituacaoServico.PLANEJADO;
    cardNovo.executorId = this.dados.executorId;
    cardNovo.quantidade = this.dados.quantidade;
    cardNovo.servico = this.servico.descricao;
    cardNovo.unidade = unidade;
    cardNovo.local = local;
    cardNovo.projeto = localStorage.getItem('projeto'); 
    
    if (this.tipoExecutor == 0) {
      cardNovo.tipoExecutor = EnumExecutor.FUNCIONARIO;
    } else cardNovo.tipoExecutor = EnumExecutor.EQUIPE;
    cardNovo.dataInicial = dataInicial;
    cardNovo.dataFinal = dataFinal;
    if (this.id != undefined) {
      cardNovo.id = this.id;
      this._controleService.editar(cardNovo).subscribe((x) => {
        this.sucess.emit(cardNovo);
      });
    } else {
      this._controleService.adicionarCard(cardNovo).subscribe((x) => {
        cardNovo.id = x.id;
        this.sucess.emit(cardNovo);
      });
    }
    this.limpar();
  }

  quantidadeSelect(event: any) {
    this.dados.quantidade = Number(event.target.value);
  }

  servicoSelect(event: any) {
    this.servico = event;
    this.dados.unidade = event.unidade;
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

  carregarServico() {
    this._servicoService.listarServicos().subscribe((x) => {
      this.listaServicos = x;
      if (this.id != undefined) {
        this.servico = this.listaServicos.find(
          (s) => s.descricao === this.dadosEditando.servico
        );
      }
    });
  }

  carregarFuncionarios() {
    this._funcionarioService.listarFuncionarios().subscribe((resultado) => {
      this.listaFuncionarios = resultado;
      if (this.id != undefined) {
        if (this.dadosEditando.tipoExecutor == "FUNCIONARIO") {
          let executorEdit = this.listaFuncionarios.find(
            (s) => s.id === this.dadosEditando.executor
          );

          this.dados.executorId = executorEdit.id;
          this.executorSelecionado = executorEdit;
        }
      }
    });
  }

  carregarEquipe() {
    this._equipeService.listarEquipe().subscribe((resultado) => {
      this.listaEquipes = resultado;
      if (this.id != undefined) {
        if (this.dadosEditando.tipoExecutor == "EQUIPE") {
          let executorEdit = this.listaEquipes.find(
            (s) => s.id === this.dadosEditando.executor
          );

          this.dados.executorId = executorEdit.id;
          this.equipeSelecionada = executorEdit;
        }
      }
    });
  }

  limpar() {
    this.dados = new ControleFisicoModel();
    this.servico = new ServicoGeral();
    this.quantidade = 0;
    this.executorSelecionado = new Funcionario();
    this.equipeSelecionada = new Equipe();
  }
}
