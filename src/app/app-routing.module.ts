import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  Router,
  RouterModule,
  Routes,
} from '@angular/router';
import { PageForgotPasswordComponent } from './login/page-forgot-password/page-forgot-password.component';
import { PageResetPasswordComponent } from './login/page-reset-password/page-reset-password.component';
import { PageSignInComponent } from './login/page-sign-in/page-sign-in.component';
import { PageSignUpComponent } from './login/page-sign-up/page-sign-up.component';

const routes: Routes = [
  //routes with components loaded on startup
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: PageSignInComponent },
  { path: 'sign-up', component: PageSignUpComponent },
  { path: 'reset', component: PageResetPasswordComponent },
  { path: 'forgot', component: PageForgotPasswordComponent },
  //lazy loaded routes, loaded on access
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./clients/clients.module').then((m) => m.ClientsModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    console.info(this.router.config);
  }
}
