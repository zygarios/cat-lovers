import { Routes } from '@angular/router';
import { guardHook } from './_helpers/auth-guard';
import { CatFactsComponent } from './_pages/cat-facts/cat-facts.component';
import { LoginComponent } from './_pages/login/login.component';

export const routes: Routes = [
  {
    path: 'cat-facts',
    component: CatFactsComponent,
    canMatch: [() => guardHook(true, '/login')],
  },
  {
    path: 'login',
    component: LoginComponent,
    canMatch: [() => guardHook(false, '/cat-facts')],
  },
  {
    path: '**',
    redirectTo: '/cat-facts',
  },
];
