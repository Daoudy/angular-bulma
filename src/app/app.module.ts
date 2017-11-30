import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './shared/auth.service';
import { ClientsService } from './clients/clients.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientsDetailsComponent } from './clients/clients-details/clients-details.component';
import { FacturesComponent } from './factures/factures.component';
import { FacturesListComponent } from './factures/factures-list/factures-list.component';
import { HttpModule } from '@angular/http';
import { ClientsStartComponent } from './clients/clients-start/clients-start.component';
import { ClientsEditComponent } from './clients/clients-edit/clients-edit.component';
import { FacturesStartComponent } from './factures/factures-start/factures-start.component';
import { FacturesEditComponent } from './factures/factures-edit/factures-edit.component';
import { FacturesService } from 'app/factures/factures.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientsDetailsComponent,
    FacturesComponent,
    FacturesListComponent,
    LoginComponent,
    ClientsStartComponent,
    ClientsEditComponent,
    FacturesStartComponent,
    FacturesEditComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, AppRoutingModule, ReactiveFormsModule
  ],
  providers: [ClientsService, FacturesService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
