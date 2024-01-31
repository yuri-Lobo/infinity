import { Funcao } from "./funcao.models";

export class Funcionario {
  id: number;
  nome: string;
  funcao: string;
  cpf: string;
  status = "ATIVO";
}

export interface SearchResult {
  tables: any[];
  total: number;
}
