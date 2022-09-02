import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { WsearchComponent } from './wsearch/wsearch.component';
import { AboutddtaComponent } from './aboutddta/aboutddta.component';
import { CategoryComponent } from './category/category.component';
import { WorkersComponent } from './workers/workers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'wsearch', component: WsearchComponent },
  { path: 'aboutddta', component: AboutddtaComponent },
  { path: 'category', component: CategoryComponent ,canActivate: [AuthGuardService],},
  { path: 'workers', component: WorkersComponent,canActivate: [AuthGuardService], },
  
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
