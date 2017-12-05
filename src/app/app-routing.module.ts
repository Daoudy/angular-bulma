import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './shared/auth-guard.service';
import { ClientsEditComponent } from './clients/clients-edit/clients-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { ClientsDetailsComponent } from './clients/clients-details/clients-details.component';
import { ClientsStartComponent } from './clients/clients-start/clients-start.component';
import { ClientsComponent } from './clients/clients.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturesComponent } from 'app/factures/factures.component';
import { FacturesStartComponent } from 'app/factures/factures-start/factures-start.component';
import { FacturesEditComponent } from 'app/factures/factures-edit/factures-edit.component';
import { HomeComponent } from 'app/home/home.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'clients', pathMatch: 'full'},
  {path: 'clients', component: ClientsComponent, canActivate: [AuthGuard],  children: [
    {path: '', component: ClientsStartComponent },
    {path: 'new', component: ClientsEditComponent, pathMatch: 'full'},
    {path: ':id', component: ClientsDetailsComponent},
    {path: ':id/edit', component: ClientsEditComponent},
    {path: ':id/facture', redirectTo: ':id', pathMatch: 'full'},
    {path: ':id/facture/:numero', component: FacturesEditComponent}
  ]},
  {path: 'factures', component: FacturesComponent, canActivate: [AuthGuard], children: [
    {path: '', component: FacturesStartComponent},
    {path: 'new', component: FacturesEditComponent, pathMatch: 'full'},
    {path: 'new/:clientId', component: FacturesEditComponent},
    {path: ':numero', component: FacturesEditComponent},
  ]},
  {path: 'signup', component: SignupComponent},
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
