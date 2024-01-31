import { Funcionario } from "./funcionario.models";

export class Equipe {
  id: number;
  codigo: string;
  descricao: string;
  funcionarios: Funcionario[];
  status = "ATIVO";
}
// Search Data
export interface SearchResult {
  tables: any[];
  total: number;
}
