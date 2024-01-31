import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CardAndamento } from "../models/controleFisico/cardAndamento.models";
import { CardNaoPlanejado } from "../models/controleFisico/cardNaoPlanejado.model";
import { CardPlanejado } from "../models/controleFisico/cardPlanejado.model";
import { CardConcluido } from "../models/controleFisico/cardConcluido.models";
import { ControleFisicoModel } from "../models/controleFisico.models";
import { Observable } from "rxjs";


@Injectable({ 
  providedIn: "root" 
})
export class ControleFisicoService {
  constructor(private http: HttpClient) {}

  excluir(id: number) {
    return this.http
      .delete<boolean>(`${environment.apiUrl}/api/controleFisico/${id}`)
      .pipe(
        map((resultado) => {
          return resultado;
        })
      );
  }

  adicionarCard(card: ControleFisicoModel) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/controleFisico`, card)
      .pipe(
        map((resultado) => {
          return resultado;
        })
      );
  }

  listar() {
    return this.http.get<any>(`${environment.apiUrl}/api/controleFisico`).pipe(
      map((cards) => {
        if (cards == null) {
          cards = [];
        } else {
          cards = cards.data;
        }
        return cards;
      })
    );
  }

  editar(card: ControleFisicoModel) {
    return this.http.put<any>(`${environment.apiUrl}/api/controleFisico`, card);
  }
}
