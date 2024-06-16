import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'overview',
    // lazy load component
    loadComponent: () =>
      import('./overview.component').then((x) => x.OverviewComponent),
  },
  {
    path: 'account/:id',
    // lazy load component
    loadComponent: () =>
      import('./account.component').then((x) => x.AccountComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
];
