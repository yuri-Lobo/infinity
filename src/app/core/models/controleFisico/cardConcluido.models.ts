import { EnumExecutor } from "../servico/enum/enumExecutor";
import { EnumSituacaoServico } from "../servico/enum/enumSituacaoServico";

export class CardConcluido {
  id: number;
  servico: string;
  tipoExecutor: EnumExecutor;
  executor: string;
  local: string;
  quantidade: number;
  unidade: string;

  //talvez n precise
  dataInicial: string;
  dataFinal: string;
  dataEntrega: string; // depois mudar para Date
  situacao: EnumSituacaoServico;
}
