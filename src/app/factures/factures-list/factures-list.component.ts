import { Component, OnInit } from '@angular/core';
import { FacturesService } from 'app/factures/factures.service';
import { Facture } from 'app/shared/models/facture.model';
import { lang } from "app/shared/lang";

@Component({
  selector: 'app-factures-list',
  templateUrl: './factures-list.component.html',
  styleUrls: ['./factures-list.component.css']
})
export class FacturesListComponent implements OnInit {
  lang = lang;
  factures: Facture[] = [];
  total: number = 0;

  constructor(private fService: FacturesService) { }

  ngOnInit() {
    this.fService.getFactures().then((factures: Facture[]) => {
      this.factures = factures
      this.total = this.factures.reduce((total, facture) => total + facture.montant, 0);
    });
  }

}
