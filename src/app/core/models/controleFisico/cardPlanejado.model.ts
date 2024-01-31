import { EnumExecutor } from "../servico/enum/enumExecutor";
import { EnumSituacaoServico } from "../servico/enum/enumSituacaoServico";

export class CardPlanejado {
  id: number;
  servico: string;
  tipoExecutor: EnumExecutor;
  unidade: string;
  executor: string;
  local: string;
  quantidade: number;
  dataInicial: Date;
  dataFinal: Date;
  situacao: EnumSituacaoServico;
}
