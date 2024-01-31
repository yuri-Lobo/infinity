import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private eventoToolbar = new Subject<void>();

  // Método para emitir o evento
  emitirEventoToolbar() {
    this.eventoToolbar.next();
  }

  // Método para ouvir o evento
  obterEventoToolbar() {
    return this.eventoToolbar.asObservable();
  }
}