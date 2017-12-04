import { ClientsService } from './../clients.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FacturesService } from 'app/factures/factures.service';
import { Facture } from 'app/shared/models/facture.model';
import { lang } from 'app/shared/lang';
import { Client } from 'app/shared/models/client.model';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.css']
})
export class ClientsDetailsComponent implements OnInit {

  lang = lang;
  client: Client;
  factures: Facture[] = [];

  constructor(private cService: ClientsService, private route: ActivatedRoute, private fService: FacturesService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = +params['id'];
      this.cService.getClient(id).then((client: Client) => {
        this.client = client;
        this.fService.getFacturesFromClient(this.client.id).then((factures: Facture[]) => {
          this.factures = factures;
        })
      })
    })
  }

}
