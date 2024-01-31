export class ProjetoGeral {
  id: number;
  nome: string;
  descricao: string;
  status= "ATIVO";
}
// Search Data
export interface SearchResult {
  tables: ProjetoGeral[];
  total: number;
}
