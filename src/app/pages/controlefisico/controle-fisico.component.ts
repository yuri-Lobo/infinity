import { Component, OnInit } from "@angular/core";
import { DndDropEvent } from "ngx-drag-drop";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { EnumSituacaoServico } from "src/app/core/models/servico/enum/enumSituacaoServico";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NovoNaoPlanejadoComponent } from "./novo/novoNaoPlanejado.component";
import { NovoPlanejadoComponent } from "./novo/novoPlanejado.component";
import { NovoAndamentoComponent } from "./novo/novoAndamento.component";
import { ControleFisicoService } from "src/app/core/services/controleFisico.service";
import { ControleFisicoModel } from "src/app/core/models/controleFisico.models";
import { FuncionarioService } from "src/app/core/services/funcionario.service";
import { Funcionario } from "src/app/core/models/funcionario.models";
import { EquipeService } from "src/app/core/services/equipe.service";
import { Equipe } from "src/app/core/models/equipe.models";
import { MoverNaoPlanejadoPlanejado } from "./moves/naoPlanejadoPlanejado.component";
import { MoverNaoPlanejadoAndamento } from "./moves/naoPlanejadoAndamento.component";
import { SweetAlert } from "src/app/core/componentes/sweetalert/sweet.alert";
import { MoverPlanejadoAndamento } from "./moves/planejamentoAndamento.component";
import { MoverAndamentoConcluido } from "./moves/andamentoConcluido.component";
import { ProjetoService } from "src/app/core/services/projeto.service";
import { data } from "jquery";
import { CommunicationService } from "src/app/layouts/topbar/communication.service";

@Component({
  selector: "app-kanbanboard",
  templateUrl: "./controle-fisico.component.html",
  styleUrls: ["./controle-fisico.component.scss"],
})
export class ControleFisicoComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  localStorage = window.localStorage;
  public listaNaoPlanejadoCards = new Array<ControleFisicoModel>();
  public listaPlanejadoCards = new Array<ControleFisicoModel>();
  public listaAndamentoCards = new Array<ControleFisicoModel>();
  public listaConcluidoCards = new Array<ControleFisicoModel>();
  public listaFuncionarios: Funcionario[];
  public listaEquipes: Equipe[];
  

  constructor(
    private _service: ControleFisicoService,
    private _toastService: ToastAlert,
    private modalService: NgbModal,
    private _funcionarioService: FuncionarioService,
    private _sweetAlert: SweetAlert,
    private _equipeService: EquipeService, 
    private _projetoService: ProjetoService,
    private communicationService: CommunicationService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Infinity", path: "/" },
      { label: "Controle Físico", path: "/", active: true },
    ];

    this.montarCards();
    this.communicationService.obterEventoToolbar().subscribe(() => {
      this.montarCards()
    });
  }
  private montarCards() {
    this.listaAndamentoCards = [];
    this.listaConcluidoCards = [];
    this.listaNaoPlanejadoCards = [];
    this.listaPlanejadoCards = [];
    this._funcionarioService.listarFuncionarios().subscribe((func) => {
      this.listaFuncionarios = func;
      this._equipeService.listarEquipe().subscribe((funcao) => {
        this.listaEquipes = funcao;
        this._service.listar().subscribe(
          (lista) => {
            if (lista.length > 0) {
              lista.forEach((item) => {
                const executor = this.listaFuncionarios.find(
                  (funcionario) => funcionario.id === item.executorId
                );
                const executorString = executor
                  ? executor.nome
                  : "Executor não encontrado";

                const equipe = this.listaEquipes.find(
                  (equipe) => equipe.id === item.executorId
                );
                const equipeString = equipe
                  ? equipe.descricao
                  : "Descrição de executor não encontrada";

                switch (item.situacao) {
                  case EnumSituacaoServico.PLANEJADO:
                    if (item.tipoExecutor == "FUNCIONARIO") {
                      item.executorString = executorString;
                    } else {
                      item.executorString = equipeString;
                    }
                    if(item.projeto == this.localStorage.getItem('projeto')){
                      this.listaPlanejadoCards.push(item);
                    }
                    break;
                  case EnumSituacaoServico.ANDAMENTO:
                    if (item.tipoExecutor == "FUNCIONARIO") {
                      item.executorString = executorString;
                    } else {
                      item.executorString = equipeString;
                    }
                    if(item.projeto == this.localStorage.getItem('projeto')){
                      this.listaAndamentoCards.push(item);
                    }
                    break;
                  case EnumSituacaoServico.CONCLUIDO:
                    if (item.tipoExecutor == "FUNCIONARIO") {
                      item.executorString = executorString;
                    } else {
                      item.executorString = equipeString;
                    }
                    if(item.projeto == this.localStorage.getItem('projeto')){
                      this.listaConcluidoCards.push(item);
                    }
                    break;
                  case EnumSituacaoServico.NAO_PLANEJADO:
                  default:
                    //item.executorString = executorString;
                    if(item.projeto == this.localStorage.getItem('projeto')){
                      this.listaNaoPlanejadoCards.push(item);
                    }
                    break;
                }
              });
            }
          },
          (error) => {
            this._toastService.show("Erro ao carregar Planejados", "error");
          }
        );
      });
    });
  }
  async moverCard(event: DndDropEvent, refCardProx: number) {
    //Nao Planejado para Planejado
    if (event.data.situacao == "NAO_PLANEJADO" && refCardProx == 1) {
      const modal = this.modalService.open(MoverNaoPlanejadoPlanejado, {
        centered: true,
        backdrop: "static",
      });
      modal.componentInstance.id = event.data.id;
      modal.componentInstance.dadosEditando = event.data;

      modal.componentInstance.sucess.subscribe((dados) => {
        this.montarCards();
      });
    }
    //Nao Planejado para Andamento
    if (event.data.situacao == "NAO_PLANEJADO" && refCardProx == 2) {
      // const modal = this.modalService.open(MoverNaoPlanejadoAndamento, {
      //   centered: true,
      //   backdrop: "static",
      // });
      // modal.componentInstance.dadosEditando = event.data;
      // modal.componentInstance.sucess.subscribe((dados) => {
      //   this.montarCards();
      // });
      this._toastService.show("Primeiro mova o Card para Planejado", "warning");
    }

    //Nao planejado para Concluido
    if (event.data.situacao == "NAO_PLANEJADO" && refCardProx == 3) {
      this._toastService.show("Primeiro mova o Card para Planejado", "warning");
    }

    //Planejado para Nao Planejado
    if (event.data.situacao == "PLANEJADO" && refCardProx == 0) {
      let confirm = await this._sweetAlert.ShowYesNo(
        "Planejado para Não Planejado",
        "Os dados do Planejamento serão perdidos, Deseja continuar?"
      );
      if (confirm) {
        let novoCard = new ControleFisicoModel();
        novoCard.id = event.data.id;
        novoCard.servico = event.data.servico;
        novoCard.quantidade = event.data.quantidade;
        novoCard.unidade = event.data.unidade;
        novoCard.situacao = EnumSituacaoServico.NAO_PLANEJADO;
        this._service.editar(novoCard).subscribe((x) => {
          this.montarCards();
        });
      }
    }

    //Planejado para Andamento
    if (event.data.situacao == "PLANEJADO" && refCardProx == 2) {
      if (
        event.data.dataInicial == undefined ||
        event.data.dataFinal == undefined
      ) {
        const modal = this.modalService.open(MoverPlanejadoAndamento, {
          centered: true,
          backdrop: "static",
        });
        modal.componentInstance.dadosEditando = event.data;
        modal.componentInstance.sucess.subscribe((dados) => {
          this.montarCards();
        });
      } else {
        event.data.situacao = EnumSituacaoServico.ANDAMENTO;
        this._service.editar(event.data).subscribe((x) => {
          this.montarCards();
        });
      }
    }

    //Planejamento para Concluido
    if (event.data.situacao == "PLANEJADO" && refCardProx == 3) {
      this._toastService.show("Primeiro mova o Card para Andamento", "warning");
    }

    //Andamento para Não planejado
    if (event.data.situacao == "ANDAMENTO" && refCardProx == 0) {
      let confirm = await this._sweetAlert.ShowYesNo(
        "Andamento para Não Planejado",
        "Os dados do Andamento serão perdidos, Deseja continuar?"
      );
      if (confirm) {
        let novoCard = new ControleFisicoModel();
        novoCard.id = event.data.id;
        novoCard.servico = event.data.servico;
        novoCard.quantidade = event.data.quantidade;
        novoCard.unidade = event.data.unidade;
        novoCard.situacao = EnumSituacaoServico.NAO_PLANEJADO;
        this._service.editar(novoCard).subscribe((x) => {
          this.montarCards();
        });
      }
    }

    //Andamento para Planejado
    if (event.data.situacao == "ANDAMENTO" && refCardProx == 1) {
      event.data.situacao = EnumSituacaoServico.PLANEJADO;
      this._service.editar(event.data).subscribe((x) => {
        this.montarCards();
      });
    }

    //Andamento para Concluido
    if (event.data.situacao == "ANDAMENTO" && refCardProx == 3) {
      const modal = this.modalService.open(MoverAndamentoConcluido, {
        centered: true,
        backdrop: "static",
      });
      modal.componentInstance.dadosEditando = event.data;

      modal.componentInstance.sucess.subscribe((dados) => {
        this.montarCards();
      });
    }

    //Concluido para Andamento
    if (event.data.situacao == "CONCLUIDO" && refCardProx == 2) {
      let confirm = await this._sweetAlert.ShowYesNo(
        "Concluído para Andamento",
        "Os dados do Concluído serão perdidos, Deseja continuar?"
      );
      if (confirm) {
        let novoCard = new ControleFisicoModel();
        novoCard.id = event.data.id;
        novoCard.servico = event.data.servico;
        novoCard.quantidade = event.data.quantidade;
        novoCard.unidade = event.data.unidade;
        novoCard.dataFinal = event.data.dataFinal;
        novoCard.dataInicial = event.data.dataInicial;
        novoCard.tipoExecutor = event.data.tipoExecutor;
        debugger;
        novoCard.executorId = event.data.executorId;
        novoCard.local = event.data.local;

        novoCard.situacao = EnumSituacaoServico.ANDAMENTO;
        this._service.editar(novoCard).subscribe((x) => {
          this.montarCards();
        });
      }
    }
    //Concluido para Planejado
    if (event.data.situacao == "CONCLUIDO" && refCardProx == 1) {
      let confirm = await this._sweetAlert.ShowYesNo(
        "Concluído para Planejado",
        "Os dados do Concluído serão perdidos, Deseja continuar?"
      );
      if (confirm) {
        let novoCard = new ControleFisicoModel();
        novoCard.id = event.data.id;
        novoCard.servico = event.data.servico;
        novoCard.quantidade = event.data.quantidade;
        novoCard.unidade = event.data.unidade;
        if (event.data.dataFinal != undefined) {
          novoCard.dataFinal = event.data.dataFinal;
        }
        if (event.data.dataInicial != undefined) {
          novoCard.dataInicial = event.data.dataInicial;
        }
        novoCard.tipoExecutor = event.data.tipoExecutor;
        novoCard.executorId = event.data.executorId;
        novoCard.local = event.data.local;

        novoCard.situacao = EnumSituacaoServico.PLANEJADO;
        this._service.editar(novoCard).subscribe((x) => {
          this.montarCards();
        });
      }
    }
    //Concluido para Nao Planejado
  }

  abrirCadastro(refCard: string) {
    if (refCard == "NaoPlanejado") {
      const modal = this.modalService.open(NovoNaoPlanejadoComponent, {
        centered: true,
        backdrop: "static",
      });
      modal.componentInstance.sucess.subscribe((dados) => {
        if (dados != undefined) {
          this.montarCards();
        }
      });
    }

    if (refCard == "Planejado") {
      const modal = this.modalService.open(NovoPlanejadoComponent, {
        centered: true,
        backdrop: "static",
      });
      modal.componentInstance.sucess.subscribe((dados) => {
        this.montarCards();
      });
    }
    if (refCard == "Andamento") {
      const modal = this.modalService.open(NovoAndamentoComponent, {
        centered: true,
        backdrop: "static",
      });
      modal.componentInstance.sucess.subscribe((dados) => {
        this.montarCards();
      });
    }
  }

  editar(id: number, refCard: string) {
    let indexEditando;
    let dadosEditando;
    switch (refCard) {
      case "NaoPlanejado":
        const modalNaoPlanejado = this.modalService.open(
          NovoNaoPlanejadoComponent,
          {
            centered: true,
            backdrop: "static",
          }
        );
        indexEditando = this.listaNaoPlanejadoCards.findIndex(
          (i) => i.id === id
        );
        dadosEditando = new ControleFisicoModel();
        dadosEditando.servico =
          this.listaNaoPlanejadoCards[indexEditando].servico;
        dadosEditando.quantidade =
          this.listaNaoPlanejadoCards[indexEditando].quantidade;
        dadosEditando.unidade =
          this.listaNaoPlanejadoCards[indexEditando].unidade;
        modalNaoPlanejado.componentInstance.id = id;
        modalNaoPlanejado.componentInstance.dadosEditando = dadosEditando;
        modalNaoPlanejado.componentInstance.sucess.subscribe((dados) => {
          this.montarCards();
        });
        break;
      case "Planejado":
        const modalPlanejado = this.modalService.open(NovoPlanejadoComponent, {
          centered: true,
          backdrop: "static",
        });
        indexEditando = this.listaPlanejadoCards.findIndex((i) => i.id === id);
        let cardEditado = this.listaPlanejadoCards[indexEditando];
        dadosEditando = new ControleFisicoModel();
        dadosEditando.servico = cardEditado.servico;
        dadosEditando.dataFinal = cardEditado.dataFinal;
        dadosEditando.dataInicial = cardEditado.dataInicial;
        dadosEditando.quantidade = cardEditado.quantidade;
        dadosEditando.unidade = cardEditado.unidade;
        dadosEditando.local = cardEditado.local;
        dadosEditando.executor = cardEditado.executorId;
        dadosEditando.tipoExecutor = cardEditado.tipoExecutor;

        modalPlanejado.componentInstance.id = id;
        modalPlanejado.componentInstance.dadosEditando = dadosEditando;
        modalPlanejado.componentInstance.sucess.subscribe((dados) => {
          this.montarCards();
        });
        break;
      case "Andamento":
        const modalAndamento = this.modalService.open(NovoAndamentoComponent, {
          centered: true,
          backdrop: "static",
        });
        indexEditando = this.listaAndamentoCards.findIndex((i) => i.id === id);
        let cardEditadoAndamento = this.listaAndamentoCards[indexEditando];
        dadosEditando = new ControleFisicoModel();
        dadosEditando.servico = cardEditadoAndamento.servico;
        dadosEditando.dataFinal = cardEditadoAndamento.dataFinal;
        dadosEditando.dataInicial = cardEditadoAndamento.dataInicial;
        dadosEditando.quantidade = cardEditadoAndamento.quantidade;
        dadosEditando.unidade = cardEditadoAndamento.unidade;
        dadosEditando.local = cardEditadoAndamento.local;
        dadosEditando.executor = cardEditadoAndamento.executorId;
        dadosEditando.tipoExecutor = cardEditadoAndamento.tipoExecutor;

        modalAndamento.componentInstance.id = id;
        modalAndamento.componentInstance.dadosEditando = dadosEditando;
        modalAndamento.componentInstance.sucess.subscribe((dados) => {
          this.montarCards();
        });
        break;
    }
  }

  async excluir(id: number, refCard: string) {
    let confirm = await this._sweetAlert.ShowYesNo(
      "Excluir",
      "Tem certeza que deseja excluir o serviço?"
    );
    if (confirm) {
      if (id != undefined) {
        this._service.excluir(id).subscribe(
          (result) => {
            this.montarCards();
          },
          (error) => {
            this._toastService.show("Não foi possível excluir o card", "error");
            console.log(error);
          }
        );
      }
    }
  }
}
