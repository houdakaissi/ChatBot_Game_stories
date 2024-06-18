// authentication.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn: boolean = false;

  constructor() {}

  login() {
    // Perform login logic
    // Set isLoggedIn to true after successful login
    this.isLoggedIn = true;
  }

  logout() {
    // Perform logout logic
    // Set isLoggedIn to false after logout
    this.isLoggedIn = false;
  }
}
