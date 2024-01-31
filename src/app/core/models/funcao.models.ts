export class Funcao {
  id: number;
  codigo: string;
  descricao: string;
  status = "ATIVO";
}

// Search Data
export interface SearchResult {
  tables: Funcao[];
  total: number;
}
