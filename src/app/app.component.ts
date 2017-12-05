import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { OnInit } from '@angular/core';
import { FacturesService } from './factures/factures.service';
import { ClientsService } from 'app/clients/clients.service';
import { Component } from '@angular/core';
import { FlashService } from 'app/shared/flash.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isConnected = false;

  constructor(private router: Router, private flash: FlashService, private notification: NotificationsService, private authService: AuthService){}

  options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }

  ngOnInit(){
    this.authService.authStateChanged.subscribe((state:boolean) => {
      console.log('CONNEXION : ', state);
      this.isConnected = state;
      console.log(this.isConnected);
    })

    this.flash.flashChanged.subscribe(flash => {
      switch(flash.type){
        case 'error':
          this.notification.error("Erreur !", flash.message);
          break;
        case 'success':
          this.notification.success("Bravo !", flash.message);
          break;
      }
    })
  }


  ngOnDestroy(){
    this.authService.authStateChanged.unsubscribe();
    this.flash.flashChanged.unsubscribe();
  }

}
