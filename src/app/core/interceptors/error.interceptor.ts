import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log("errorrrrrrrrrrrrrrrrrr")
      switch (error.status) {
        case 400:
          toastr.error('Invalid request');
          break;
        case 403:
          toastr.error('You do not have permission');
          break;
        case 404:
          toastr.error('Resource not found');
          break;
        case 500:
          toastr.error('Server error, please try again');
          break;
        default:
          toastr.error('Something went wrong');
      }
      return throwError(() => error.message);
    })
  );
};