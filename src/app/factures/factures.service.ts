import { Injectable } from "@angular/core";
import { AuthService } from "app/shared/auth.service";
import { Facture } from "app/shared/models/facture.model";
import { ClientsService } from "app/clients/clients.service";
import { Client } from "app/shared/models/client.model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class FacturesService {
  facturesLoaded: boolean = false;
  facturesChanged = new Subject<Facture[]>();

  factures: Facture[] = [
    {
      numero: "FA001",
      montant: 2000,
      date: "2017-10-10",
      statut: "reglee",
      clientId: 2,
      clientDetails: null
    },
    {
      numero: "FA002",
      montant: 1000,
      date: "2017-10-10",
      statut: "envoyee",
      clientId: 1,
      clientDetails: null
    },
    {
      numero: "FA003",
      montant: 1000,
      date: "2017-10-10",
      statut: "annulee",
      clientId: 1,
      clientDetails: null
    },
    {
      numero: "FA004",
      montant: 4000,
      date: "2017-10-10",
      statut: "envoyee",
      clientId: 3,
      clientDetails: null
    }
  ];

  constructor(
    private authService: AuthService,
    private cService: ClientsService
  ) {}

  getNewChrono() {
    const lastNumero = +this.factures.slice()
      .sort((a, b) => {
        const chrono1 = +a.numero.substr(2);
        const chrono2 = +b.numero.substr(2);
        return chrono2 - chrono1;
      }).shift().numero.substr(2);

    let newNum = new String(lastNumero + 1);

    while (newNum.length < 3) {
      newNum = "0" + newNum;
    }

    return "FA" + newNum;
  }

  getFacturesFromClient(clientId: number) {
    return this.factures.filter(facture => facture.clientId == clientId);
  }

  getFacture(numero: string) {
    console.log(this.factures);
    return this.factures.find(facture => {
      console.log(facture.numero, numero)
      return facture.numero == numero
    });
  }

  getFactures() {
    return this.factures.slice();
  }

  updateFacture(facture: Facture) {
    const index = this.factures.findIndex(
      _facture => _facture.numero == facture.numero
    );
    console.log(index, facture);
    this.factures[index] = facture;
    this.facturesChanged.next(this.factures.slice());
  }

  addFacture(facture: Facture) {
    this.factures.push(facture);
    this.facturesChanged.next(this.factures.slice());
  }
}
