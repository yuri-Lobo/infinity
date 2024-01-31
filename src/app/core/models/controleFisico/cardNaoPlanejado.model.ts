import { EnumSituacaoServico } from "../servico/enum/enumSituacaoServico";

export class CardNaoPlanejado {
  id: number;
  servico: string;
  quantidade: number;
  unidade: string;

  situacao: EnumSituacaoServico;
}
