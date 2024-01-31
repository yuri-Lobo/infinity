import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/auth.models";
import { environment } from "src/environments/environment";
import { map } from "rxjs/internal/operators/map";
import { Usuario } from "../models/usuario.models";

@Injectable({ providedIn: "root" })
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getAll() {
    console.log("aaaa");
    return this.http.get<User[]>(`/api/login`);
  }
  getUsuarios() {
    return this.http.get<User[]>(`/api/users`);
  }

  listarUsuarios() {
    return this.http.get<any>(`${environment.apiUrl}/api/usuario`).pipe(
      map((usuarios) => {
        if (usuarios == null) {
          usuarios = [];
        } else {
          usuarios = usuarios.data;
        }
        return usuarios;
      })
    );
  }

  excluir(id: number) {
    return this.http
      .delete<boolean>(`${environment.apiUrl}/api/usuario/${id}`)
      .pipe(
        map((resultado) => {
          return resultado;
        })
      );
  }

  salvar(filtro: Usuario) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/usuario`, filtro)
      .pipe(
        map((resultado) => {
          return resultado;
        })
      );
  }

  editar(id: number, filtro: Usuario) {
    return this.http.put<any>(`${environment.apiUrl}/api/usuario`, filtro);
  }
}
