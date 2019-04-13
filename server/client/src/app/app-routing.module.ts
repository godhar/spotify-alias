import { AuthGuard } from './auth/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';


const routes: Routes = [
   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing' 
  },
   {
    path: 'callback/success',
    pathMatch: 'full',
    redirectTo: 'landing' 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'landing',
    canActivate: [AuthGuard],
    component: LandingComponent    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


