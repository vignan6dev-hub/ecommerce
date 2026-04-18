import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const proGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // We subscribe to the authState observable
  return authService.isLoggedIn().pipe(
    take(1),
    map(user => {
      console.log('Guard triggered');
      if (user) {
        // User is logged in, allow access to the route
        return true;
      } else {
        // User is not logged in, redirect them to the login page
        return router.createUrlTree(['/login']);
      }
    })
  );
};
