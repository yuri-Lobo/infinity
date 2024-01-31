import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SweetAlert {

    ShowConfirm(title: string, text: string){
        return this.ShowCustom(title, text, false, "Ok", "");
    }

    ShowYesNo(title: string, text: string) {
        return this.ShowCustom(title, text, true, "Sim", "Não");
    }

    ShowCustom(title: string, text: string, showCancelButton: boolean, confirmButtonText: string, cancelButtonText: string){
        return Swal.fire({
            title: title,
            text: text,
            showCancelButton: showCancelButton,
            cancelButtonText: cancelButtonText,
            confirmButtonText: confirmButtonText
        }).then((result) => {
            return result.value;
        });
    }
}