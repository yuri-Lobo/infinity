import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Projeto } from "../models/projeto.models";
import { ProjetoGeral } from "../models/projeto/projetoGeral.model";
import { Observable } from "rxjs";


@Injectable({ providedIn: "root" })
export class ProjetoService {
  constructor(private http: HttpClient) {}

  getItems() {
    // Simulate fetching data from a database/API
    return this.http.get<any[]>('/api/projeto'); 
  }

  listarProjetos() {
    return this.http.get<any>(`${environment.apiUrl}/api/projeto`).pipe(
      map((projetos) => {
        if (projetos == null) {
          projetos = [];
        } else {
          projetos = projetos.data;
        }
        return projetos;
      })
    );
  }

  excluir(id: number) {
    return this.http
      .delete<boolean>(`${environment.apiUrl}/api/projeto/${id}`)
      .pipe(
        map((resultado) => {
          return resultado;
        })
      );
  }

  salvar(filtro: Projeto) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/projeto`, filtro)
      .pipe(
        map((resultado) => {
          return resultado;
        })
      );
  }

  editar(id: number, filtro: Projeto) {
    return this.http.put<any>(`${environment.apiUrl}/api/projeto`, filtro);
  }
}
