import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastAlert } from "src/app/core/componentes/toasts/toast.alert";
import { DateService } from "src/app/core/services/date.service";
import { ServicoService } from "src/app/core/services/servico.service";
import { ControleFisicoService } from "src/app/core/services/controleFisico.service";
import { ServicoGeral } from "src/app/core/models/servico/servicoGeral.model";
import { EnumSituacaoServico } from "src/app/core/models/servico/enum/enumSituacaoServico";
import { ControleFisicoModel } from "src/app/core/models/controleFisico.models";
import { ProjetoGeral } from "src/app/core/models/projeto/projetoGeral.model";

@Component({
  selector: "app-modals",
  templateUrl: "./novoNaoPlanejado.component.html",
  styleUrls: ["./novoCard.component.scss"],
})
export class NovoNaoPlanejadoComponent implements OnInit {
  public dados = new ControleFisicoModel();
  public quantidade: number;
  public servico: ServicoGeral;
  public listaServicos: ServicoGeral[];
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
    public _controleService: ControleFisicoService
  ) {}
  async ngOnInit() {
    this.carregarServico();

    if (this.id != undefined) {
      this.editando == true;
      this.titulo = "Editando Não Planejado";
      this.quantidade = this.dadosEditando.quantidade;
      this.dados.unidade = this.dadosEditando.unidade;
    } else this.titulo = "Novo Não Planejado";
  }

  ngAfterViewInit() {}

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
  

  salvar(unidade: string) {
    if (this.servico == undefined) {
      this._toastService.show("Serviço não foi informado!", "warning");
      return;
    }
    if (this.quantidade == undefined) {
      this._toastService.show("Quantidade não foi informada!", "warning");
      return;
    }
    if (unidade == undefined) {
      this._toastService.show("Unidade não foi informada!", "warning");
      return;
    }
    let cardNovo = new ControleFisicoModel();
    cardNovo.quantidade = this.quantidade;
    cardNovo.servico = this.servico.descricao;
    cardNovo.unidade = unidade;
    cardNovo.situacao = EnumSituacaoServico.NAO_PLANEJADO;
    cardNovo.projeto = localStorage.getItem('projeto');    

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
    this.quantidade = event.target.value;
  }
  servicoSelect(event: any) {
    this.servico = event;
    this.dados.unidade = event.unidade;
  }

  limpar() {
    this.dados.unidade = "";
    this.servico = new ServicoGeral();
    this.quantidade = 0;
  }
}
