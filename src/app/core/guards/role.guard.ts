import { inject } from '@angular/core';
import { Auth, authState, user } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
 const auth = inject(Auth);
  const router = inject(Router);
  
  const ADMIN_EMAIL = 'admin@example.com';

  return authState(auth).pipe(
    take(1),
    map(currentUser => {
      if (currentUser?.email === ADMIN_EMAIL) {
        return true;
      } else {
        return router.createUrlTree(['/app/products']);
      }
    })
  );
};
