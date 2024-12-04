import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guard/auth-guard';
import { ApartmentComponent } from './main/pages/apartment/apartment.component';
import { FilterSearchComponent } from './main/pages/filter-search/filter-search.component';
import { HomeComponent } from './main/pages/home/home.component';
import { NotFoundComponent } from './main/pages/not-found/not-found.component';
import { RComplexComponent } from './main/pages/residential-complex/r-complex.component';
import { SearchComponent } from './main/pages/smart-search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    redirectTo: '',
    component: HomeComponent,
  },
  {
    path: 'apartment/:id',
    component: ApartmentComponent,
  },
  {
    path: 'r-complex/:id',
    component: RComplexComponent,
  },
  {
    path: 'filter-search',
    component: FilterSearchComponent,
  },
  {
    path: 'smart-search',
    component: SearchComponent,
  },
  {
    path: 'business-cabinet',
    loadChildren: () =>
      import('./features/business/business.module').then(
        (m) => m.BusinessModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'personal-cabinet',
    loadChildren: () =>
      import('./features/personal/personal.module').then(
        (m) => m.PersonalModule
      ),
    // canActivate: [AuthGuard],
  },
  //admin --route admin --module app.routes
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  //dashboard --route dashboard --module app.routes
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
