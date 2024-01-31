import { EnumExecutor } from "./enum/enumExecutor";
import { EnumSituacaoServico } from "./enum/enumSituacaoServico";

export class FiltroListagemServico {
  id: number;
  servico: string;
  tipoExecutor: EnumExecutor;
  executor: string;
  local: string;
  quantidade: number;
  dataInicial: Date;
  dataFinal: Date;
  dataEntrega: Date;
  situacao: EnumSituacaoServico;
}
