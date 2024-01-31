import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Funcao } from "../models/funcao.models";

@Injectable({ providedIn: "root" })
export class FuncaoService {
  constructor(private http: HttpClient) {}

  listarFuncao() {
    return this.http.get<any>(`${environment.apiUrl}/api/Funcao`).pipe(
      map((funcoes) => {
        if (funcoes == null) {
          funcoes = [];
        } else {
          funcoes = funcoes.data;
        }
        return funcoes;
      })
    );
  }

  excluir(id: number) {
    return this.http
      .delete<boolean>(`${environment.apiUrl}/api/Funcao/${id}`)
      .pipe(
        map((resultado) => {
          return resultado;
        })
      );
  }

  salvar(filtro: Funcao) {
    return this.http.post<any>(`${environment.apiUrl}/api/Funcao`, filtro).pipe(
      map((resultado) => {
        return resultado;
      })
    );
  }

  editar(id: number, filtro: Funcao) {
    return this.http.put<any>(`${environment.apiUrl}/api/Funcao`, filtro);
  }
}
