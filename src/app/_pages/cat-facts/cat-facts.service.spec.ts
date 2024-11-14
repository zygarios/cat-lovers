import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { CatFactsService } from './cat-facts.service';

describe('CatFactsService', () => {
  let service: CatFactsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatFactsService],
    });

    service = TestBed.inject(CatFactsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a random cat fact', () => {
    const mockResponse = { data: ['This is a cat fact.'] };

    service.getRandomCatFact().subscribe((fact) => {
      expect(fact).toEqual('This is a cat fact.');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
