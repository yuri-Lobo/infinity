import { EnumExecutor } from "./servico/enum/enumExecutor";
import { EnumSituacaoServico } from "./servico/enum/enumSituacaoServico";

export class ControleFisicoModel {
  id: number;
  servico: string;
  tipoExecutor?: EnumExecutor;
  executorId: number;
  local: string;
  quantidade?: number;
  unidade: string;
  dataInicial?: Date;
  dataFinal?: Date;
  dataEntrega?: Date;
  situacao: EnumSituacaoServico;
  executorString: string;
  dataInicialString: string;
  dataFinalString: string;
  dataEntregaString: string;
  projeto: string;
  status = "ATIVO";
}
