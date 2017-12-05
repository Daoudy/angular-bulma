import { AuthService } from './../shared/auth.service';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientsService } from 'app/clients/clients.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  isConnected;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authStateChanged.subscribe((state:boolean) => {
      console.log('CONNEXION : ', state);
      this.isConnected = state;
      console.log(this.isConnected);
    })
  }

  ngOnDestroy(){
    this.authService.authStateChanged.unsubscribe();
  }

  connect(){
    this.isConnected = true;
  }

  logout(){
    this.authService.logoutUser();
  }

}
