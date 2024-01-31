import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { ControleFisicoModel } from "src/app/core/models/controleFisico.models";
import { CardAndamento } from "src/app/core/models/controleFisico/cardAndamento.models";
import { EnumSituacaoServico } from "src/app/core/models/servico/enum/enumSituacaoServico";
import { ControleFisicoService } from "src/app/core/services/controleFisico.service";
import { DateService } from "src/app/core/services/date.service";

@Component({
  selector: "app-modals",
  templateUrl: "./planejamentoAndamento.component.html",
  styleUrls: ["./moves.component.scss"],
})
export class MoverPlanejadoAndamento implements OnInit {
  public dados = new ControleFisicoModel();

  @Output() sucess = new EventEmitter();
  @Input() id: any;
  @Input() dadosEditando: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _toastService: ToastAlert,
    public _dateService: DateService,
    public _controleService: ControleFisicoService
  ) {}
  async ngOnInit() {}
  moverCard(dataFinal: Date, dataInicial: Date) {
    debugger;
    if (dataFinal == undefined) {
      this._toastService.show("Data Final não foi informada!", "warning");
      return;
    }
    if (dataInicial == undefined) {
      this._toastService.show("Data Inicial não foi informada!", "warning");
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
    debugger;

    let cardNovo = new ControleFisicoModel();
    cardNovo = this.dadosEditando;
    cardNovo.dataInicial = this.dados.dataInicial;
    cardNovo.dataFinal = this.dados.dataFinal;

    cardNovo.situacao = EnumSituacaoServico.ANDAMENTO;
    this._controleService.editar(cardNovo).subscribe((x) => {
      this.sucess.emit(x);
    });
    this.activeModal.dismiss();
  }
  limpar() {
    this.dados.dataFinal = new Date();
    this.dados.dataInicial = new Date();
  }
}
