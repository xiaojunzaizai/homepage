import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSignInUserComponent } from './add-sign-in-user/add-sign-in-user.component';
import { HomeComponent } from './home/home.component';
import { BodyComponent } from './body/body.component';
import { SignInDetailComponent } from './sign-in-detail/sign-in-detail.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'signIn', component: BodyComponent},
  {path: 'signInDetail/:id', component: SignInDetailComponent, canActivate: [authGuard]},
  {path: 'addSignInUser', component: AddSignInUserComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
