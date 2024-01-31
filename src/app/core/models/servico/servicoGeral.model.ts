export class ServicoGeral {
  id: number;
  codigo: string;
  descricao: string;
  unidade: string;
  status= "ATIVO";
}
// Search Data
export interface SearchResult {
  tables: ServicoGeral[];
  total: number;
}
