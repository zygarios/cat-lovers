import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class CatFactsService {
  private _httpClient = inject(HttpClient);

  getRandomCatFact() {
    return this._httpClient
      .get<{ data: string[] }>(`${environment.apiUrl}`)
      .pipe(
        map((response) => response.data[0]),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return throwError(() => err);
        }),
      );
  }
}
