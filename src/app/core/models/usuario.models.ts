import { BaseResourceModel } from "./base-resource.model";
import { Unidade } from "./unidade.model";

export class Usuario extends BaseResourceModel {
  constructor(
    public username?: string,
    public nome?: string,
    public password?: string,
    public senhaTemporaria?: any,
    public status?: any
  ) {
    super();
  }

  static fromJson(jsonData: any): Usuario {
    return Object.assign(new Usuario(), jsonData);
  }
}

// Search Data
export interface SearchResult {
  tables: Usuario[];
  total: number;
}
