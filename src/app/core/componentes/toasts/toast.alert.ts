import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

export type ToastAlertType = 'success' | 'info' | 'warning' | 'error';

@Injectable({ providedIn: 'root' })
export class ToastAlert {
  constructor(private toastrService: ToastrService) {}

  private options: Partial<IndividualConfig> = {
    timeOut: 5000,
    positionClass: 'toast-top-right',
    closeButton: true,
    progressBar: true
  };

  show(mensagem: string, tipo: ToastAlertType) {
    this.toastrService.show(mensagem, null, this.options, 'toast-' + tipo);
  }

  showWithOptions(mensagem: string, tipo: ToastAlertType, options: Partial<IndividualConfig>) {
    return this.toastrService.show(mensagem, null, options, 'toast-' + tipo);
  }

  remove(id: number) {
    this.toastrService.remove(id);
  }
}
