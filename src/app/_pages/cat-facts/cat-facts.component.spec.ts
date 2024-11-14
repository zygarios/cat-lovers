import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { CatFactsComponent } from './cat-facts.component';
import { CatFactsService } from './cat-facts.service';

class MockCatFactsService {
  getRandomCatFact() {
    return of('Mocked Cat Fact');
  }
}

describe('CatFactsComponent', () => {
  let component: CatFactsComponent;
  let fixture: ComponentFixture<CatFactsComponent>;
  let catFactsService: jasmine.SpyObj<CatFactsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatFactsComponent],
      providers: [{ provide: CatFactsService, useClass: MockCatFactsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CatFactsComponent);
    component = fixture.componentInstance;
    catFactsService = TestBed.inject(
      CatFactsService,
    ) as jasmine.SpyObj<CatFactsService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load cat facts on initialization', waitForAsync(async () => {
    spyOn(catFactsService, 'getRandomCatFact').and.returnValue(
      of('Example cat fact'),
    );

    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.catFacts().length).toBeGreaterThan(0);
  }));

  it('should add a new cat fact to the list', () => {
    component.catFacts.update(() => []);
    component['catFacts'].update((facts) => [...facts, 'New Cat Fact']);
    expect(component.catFacts()).toContain('New Cat Fact');
  });
});
