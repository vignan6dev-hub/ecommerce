import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  return from(auth.currentUser?.getIdToken() ?? Promise.resolve(null)).pipe(
    switchMap(token => {
      const authReq = token
        ? req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
          })
        : req;
      return next(authReq);
    })
  );
};
