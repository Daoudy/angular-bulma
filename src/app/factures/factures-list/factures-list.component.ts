import { Client } from 'app/shared/models/client.model';
import { Component, OnInit } from '@angular/core';
import { FacturesService } from 'app/factures/factures.service';
import { Facture } from 'app/shared/models/facture.model';
import { lang } from "app/shared/lang";
import { ClientsService } from 'app/clients/clients.service';
import { take } from 'rxjs/operators/take';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-factures-list',
  templateUrl: './factures-list.component.html',
  styleUrls: ['./factures-list.component.css'],
})
export class FacturesListComponent implements OnInit {
  lang = lang;
  filter: string = '';
  factures: Facture[] = [];
  filteredFactures: Facture[] = [];
  total: number = 0;
  clients: Client[] = [];

  constructor(private fService: FacturesService, private cService: ClientsService) { }

  ngOnInit() {
    this.fService.facturesChanged.subscribe((factures: Facture[]) => {
      this.factures = factures;
      for(let facture of this.factures){
        this.cService.getClient(+facture.clientId).then((client: Client) => {
          facture.clientDetails = client
        });
      }
      this.onChangeFilter();
    })

    this.cService.getClients().then((clients: Client[]) => this.clients = clients);

    this.factures = this.fService.getFactures();

    for(let facture of this.factures){
      this.cService.getClient(+facture.clientId).then((client: Client) => facture.clientDetails = client);
    }
    // console.log(this.factures);
    this.onChangeFilter();
  }

  getClient(id){
    return this.clients.find(client => client.id == id);
  }

  onChangeFilter(){
    if(this.filter){
      this.filteredFactures = this.factures.slice().filter(facture => facture.statut == this.filter);
    } else {
      this.filteredFactures = this.factures.slice();
    }

    this.total = this.filteredFactures.reduce((total, facture) => total + facture.montant, 0);
  }

}
