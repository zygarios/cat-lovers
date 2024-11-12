import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAuthService } from '../../_services/user-auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userAuthService: jasmine.SpyObj<UserAuthService>;

  beforeEach(() => {
    const userAuthServiceSpy = jasmine.createSpyObj('UserAuthService', [
      'login',
    ]);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [{ provide: UserAuthService, useValue: userAuthServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userAuthService = TestBed.inject(
      UserAuthService,
    ) as jasmine.SpyObj<UserAuthService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.loginForm.value).toEqual({
      email: 'przykladowy@email.pl',
      password: 'Hasło123',
    });
  });

  it('should allow to submit the form with default values', () => {
    component.submitForm();
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call login method of UserAuthService when the form is valid', () => {
    component.loginForm.setValue({
      email: 'test@email.com',
      password: 'ValidPassword',
    });
    component.submitForm();
    expect(userAuthService.login).toHaveBeenCalled();
  });
});
