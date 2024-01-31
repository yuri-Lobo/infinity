import { EnumSituacaoServico } from "src/app/core/models/servico/enum/enumSituacaoServico";

// Kanban Board Data
export interface Task {
  servico: string;
  quantidade: string;
  executor: string;
  dataInicial: string;
  dataFinal: string;
  local: string;
  dataEntrega: string;
  status: EnumSituacaoServico;
}
