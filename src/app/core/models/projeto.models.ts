export class Projeto {
  id: number;
  nome: string;
  descricao: string;
  status = "ATIVO";
}

export interface SearchResult {
  tables: Projeto[];
  total: number;
}
