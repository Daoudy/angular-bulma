import { ClientsEditComponent } from './clients/clients-edit/clients-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { ClientsDetailsComponent } from './clients/clients-details/clients-details.component';
import { ClientsStartComponent } from './clients/clients-start/clients-start.component';
import { ClientsComponent } from './clients/clients.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {path: '', redirectTo: 'clients', pathMatch: 'full'},
  {path: 'clients', component: ClientsComponent,  children: [
    {path: '', component: ClientsStartComponent },
    {path: 'new', component: ClientsEditComponent, pathMatch: 'full'},
    {path: ':id', component: ClientsDetailsComponent},
    {path: ':id/edit', component: ClientsEditComponent},
  ]},
  // {path: 'factures', component: FacturesComponent, children: [
  //   {path: '', component: FactureStartComponent},
  //   {path: 'new', component: FactureEditComponent, pathMatch: 'full'},
  //   {path: 'new/:clientId', component: FactureEditComponent},
  //   {path: ':id', component: FactureEditComponent},
  // ]},
  // {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
