import { OnInit } from '@angular/core';
import { FacturesService } from './factures/factures.service';
import { ClientsService } from 'app/clients/clients.service';
import { Component } from '@angular/core';
import { AuthService } from 'app/shared/auth.service';
import { FlashService } from 'app/shared/flash.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private flash: FlashService, private notification: NotificationsService){}

  options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }

  ngOnInit(){
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
}
