import {Injectable} from "@angular/core";
import Swal from "sweetalert2";


@Injectable({providedIn: "root"})
export class SweetAlertsService {
  toast(icon: any, title: string, position: any = 'top-end') {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: title
    })
  }
}
