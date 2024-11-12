import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../_services/user-auth.service';

const MOCK_EMAIL = 'przykladowy@email.pl';
const MOCK_PASSWORD = 'Hasło123';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    class: 'login',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private _formBuilder = inject(FormBuilder);
  private _userAuthService = inject(UserAuthService);

  loginForm = this._formBuilder.group({
    email: [MOCK_EMAIL, [Validators.required, Validators.email]],
    password: [MOCK_PASSWORD, [Validators.required, Validators.minLength(6)]],
  });

  submitForm() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    } else {
      this._userAuthService.login();
    }
  }
}
