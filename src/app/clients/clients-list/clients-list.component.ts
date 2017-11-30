import { Client } from './../../shared/models/client.model';
import { AuthService } from './../../shared/auth.service';
import { ClientsService } from './../clients.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit, OnDestroy {

  clients: Client[] = [];

  constructor(private cService: ClientsService, private authService: AuthService) { }

  ngOnInit() {
    this.cService.getClients().then((clients: Client[]) => {
      this.clients = clients
      console.log(this.clients);
    });
    this.cService.clientsChanged.subscribe((clients: Client[]) => {
      this.clients = clients
    })

    // this.authService.authStateChanged.subscribe(state => {
    //   console.log('Clients received signal');
    //   if(state == true) this.cService.loadClients();
    //   else this.clients = [];
    // })

  }

  ngOnDestroy(){
    // this.authService.authStateChanged.unsubscribe();
    // this.cService.clientsChanged.unsubscribe();
  }


}
