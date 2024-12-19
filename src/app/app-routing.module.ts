import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingupCompanyComponent } from './basic/components/singup-company/singup-company.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SingupComponent } from './basic/components/singup/singup.component';
import { SignupClientComponent } from './basic/components/singup-client/singup-client.component';

const routes: Routes = [
  { path: 'register_Client', component: SignupClientComponent },
  { path: 'register_company', component: SingupCompanyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SingupComponent },
  { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // This is correct; forRoot should be used here
  exports: [RouterModule]
})
export class AppRoutingModule { }
