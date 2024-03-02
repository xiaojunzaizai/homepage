import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BodyComponent } from './body/body.component';
import { SignInDetailComponent } from './sign-in-detail/sign-in-detail.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'signIn', component: BodyComponent},
  {path: 'signInDetail/:id', component: SignInDetailComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
