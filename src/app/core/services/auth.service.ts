// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }

import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword,
         createUserWithEmailAndPassword,
         signOut, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  // Login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Register
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Logout
  logout() {
    return signOut(this.auth);
  }

  // Token
  async getToken() {
    return await this.auth.currentUser?.getIdToken();
  }

  // User logged in or not
  isLoggedIn() {
    return authState(this.auth);
  }
}
