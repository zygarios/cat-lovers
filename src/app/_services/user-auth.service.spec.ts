import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserAuthService } from './user-auth.service';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('UserAuthService', () => {
  let service: UserAuthService;
  let router: MockRouter;

  beforeEach(() => {
    router = new MockRouter();

    TestBed.configureTestingModule({
      providers: [UserAuthService, { provide: Router, useValue: router }],
    });

    service = TestBed.inject(UserAuthService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should initially be logged out', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should log in and navigate to /cat-facts', () => {
    service.login();

    expect(service.isLoggedIn()).toBeTrue();
    expect(router.navigate).toHaveBeenCalledWith(['/cat-facts']);
  });
});
