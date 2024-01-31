// Table data
export interface Funcionario {
  name: string;
  position: string;
  office: string;
  age: number;
  date: string;
  salary: string;
}

// Search Data
export interface SearchResult {
  tables: Funcionario[];
  total: number;
}
