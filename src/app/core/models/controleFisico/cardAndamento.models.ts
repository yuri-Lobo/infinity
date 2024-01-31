import { EnumExecutor } from "../servico/enum/enumExecutor";
import { EnumSituacaoServico } from "../servico/enum/enumSituacaoServico";
export class CardAndamento {
  id: number;
  servico: string;
  tipoExecutor: EnumExecutor;
  executor: string;
  local: string;
  quantidade: number;
  //depois mudar para Date
  dataInicial: string;
  unidade: string;
  dataFinal: string;
  situacao: EnumSituacaoServico;
}
