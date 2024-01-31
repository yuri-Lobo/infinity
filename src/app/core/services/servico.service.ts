import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ServicoGeral } from "../models/servico/servicoGeral.model";

@Injectable({ providedIn: "root" })
export class ServicoService {
  constructor(private http: HttpClient) {}

  listarServicos() {
    return this.http.get<any>(`${environment.apiUrl}/api/servico`).pipe(
      map((servicos) => {
        if (servicos == null) {
          servicos = [];
        } else {
          servicos = servicos.data;
        }
        return servicos;
      })
    );
  }

  excluir(id: number) {
    return this.http
      .delete<boolean>(`${environment.apiUrl}/api/servico/${id}`)
      .pipe(
        map((resultado) => {
          return resultado;
        })
      );
  }

  salvar(filtro: ServicoGeral) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/servico`, filtro)
      .pipe(
        map((resultado) => {
          return resultado;
        })
      );
  }

  editar(id: number, filtro: ServicoGeral) {
    return this.http.put<any>(`${environment.apiUrl}/api/servico`, filtro);
  }
}
