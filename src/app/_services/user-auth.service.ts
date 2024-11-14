import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private _isLoggedIn = false;
  private _router = inject(Router);

  isLoggedIn() {
    return this._isLoggedIn;
  }

  login() {
    this._isLoggedIn = true;
    this._router.navigate(['/cat-facts']);
  }
}
