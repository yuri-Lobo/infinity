import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { ControleFisicoModel } from "src/app/core/models/controleFisico.models";
import { EnumSituacaoServico } from "src/app/core/models/servico/enum/enumSituacaoServico";
import { ControleFisicoService } from "src/app/core/services/controleFisico.service";
import { DateService } from "src/app/core/services/date.service";

@Component({
  selector: "app-modals",
  templateUrl: "./andamentoConcluido.component.html",
  styleUrls: ["./moves.component.scss"],
})
export class MoverAndamentoConcluido implements OnInit {
  public dados = new ControleFisicoModel();
  @Input() id: any;
  @Input() dadosEditando: any;
  @Output() sucess = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private _toastService: ToastAlert,
    public _controleService: ControleFisicoService,
    public _dateService: DateService
  ) {}
  async ngOnInit() {}

  moverCard(dataEntrega: Date) {
    debugger;
    let cardNovo = new ControleFisicoModel();
    cardNovo = this.dadosEditando;
    cardNovo.situacao = EnumSituacaoServico.CONCLUIDO;
    if (dataEntrega != undefined) {
      cardNovo.dataEntrega = dataEntrega;
    } else {
      debugger;
      cardNovo.dataEntrega = this._dateService.DateNowToDateTime();
    }
    this._controleService.editar(cardNovo).subscribe((x) => {
      this.sucess.emit(x);
    });
    this.activeModal.dismiss();
  }
}
