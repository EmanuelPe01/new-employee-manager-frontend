import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root',  // Esto hace que el servicio esté disponible globalmente en toda la aplicación
})
export class Alerts {

    toastConfig = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    })

    showMessageSucces(message: string) {
        Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
        })
    }

    showErrorMessage(message: string) {
        Swal.fire({
            icon: 'error',
            title: message,
            confirmButtonColor: "#000",
            confirmButtonText: "Aceptar",
        })
    }

    showLoadingMessage(flag: boolean, message: string) {
        if (flag) {
            Swal.fire({
                title: message,
                didOpen: () => {
                    Swal.disableButtons();
                    Swal.showLoading(null);
                }
            });
        }
    }

    showToast (icon: any, message: string) {
        this.toastConfig.fire({
            icon: icon,
            title: message
        })
    }
}