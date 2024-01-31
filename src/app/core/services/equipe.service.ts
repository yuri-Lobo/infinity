import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Equipe } from "../models/equipe.models";

@Injectable({ providedIn: "root" })
export class EquipeService {
  constructor(private http: HttpClient) {}

  listarEquipe() {
    return this.http.get<any>(`${environment.apiUrl}/api/equipe`).pipe(
      map((equipes) => {
        if (equipes == null) {
          equipes = [];
        } else {
          equipes = equipes.data;
        }
        return equipes;
      })
    );
  }

  excluir(id: number) {
    return this.http
      .delete<boolean>(`${environment.apiUrl}/api/equipe/${id}`)
      .pipe(
        map((resultado) => {
          return resultado;
        })
      );
  }

  salvar(filtro: Equipe) {
    return this.http.post<any>(`${environment.apiUrl}/api/equipe`, filtro).pipe(
      map((resultado) => {
        return resultado;
      })
    );
  }

  editar(id: number, filtro: Equipe) {
    return this.http.put<any>(`${environment.apiUrl}/api/equipe`, filtro);
  }
}
