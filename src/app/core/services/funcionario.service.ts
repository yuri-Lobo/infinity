import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Funcionario } from "../models/funcionario.models";

@Injectable({ providedIn: "root" })
export class FuncionarioService {
  constructor(private http: HttpClient) {}

  listarFuncionarios() {
    return this.http.get<any>(`${environment.apiUrl}/api/funcionario`).pipe(
      map((funcionarios) => {
        if (funcionarios == null) {
          funcionarios = [];
        } else {
          funcionarios = funcionarios.data;
        }
        return funcionarios;
      })
    );
  }

  excluir(id: number) {
    return this.http
      .delete<boolean>(`${environment.apiUrl}/api/funcionario/${id}`)
      .pipe(
        map((resultado) => {
          return resultado;
        })
      );
  }

  salvar(filtro: Funcionario) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/funcionario`, filtro)
      .pipe(
        map((resultado) => {
          return resultado;
        })
      );
  }

  editar(id: number, filtro: Funcionario) {
    return this.http.put<any>(`${environment.apiUrl}/api/funcionario`, filtro);
  }
}
