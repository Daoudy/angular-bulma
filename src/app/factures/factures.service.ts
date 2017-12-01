import { Injectable } from "@angular/core";
import { AuthService } from "app/shared/auth.service";
import { Facture } from "app/shared/models/facture.model";
import { ClientsService } from "app/clients/clients.service";
import { Client } from "app/shared/models/client.model";

@Injectable()
export class FacturesService {
  facturesLoaded: boolean = false;

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

  getNewChrono(){
    const lastNumero = +this.factures.slice().sort((a, b) => {
      const chrono1 = +a.numero.substr(2);
      const chrono2 = +b.numero.substr(2);
      return chrono2 - chrono1
    }).shift().numero.substr(2);

    let newNum = new String(lastNumero+1);

    while(newNum.length < 4){
      newNum = '0' + newNum;
    }

    return 'FA' + newNum;
  }

  getFacture(numero: string) {
    if (!this.facturesLoaded) {
      return this.getFactures().then((factures: Facture[]) => {
        return factures.find(facture => facture.numero === numero);
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(this.factures.find(facture => facture.numero === numero));
      });
    }
  }

  getFactures() {
    return new Promise(async (resolve, reject) => {
      for (let facture of this.factures) {
        if (!facture.clientDetails) {
          await this.cService
            .getClient(facture.clientId)
            .then((client: Client) => {
              facture.clientDetails = client;
            });
        }
      }
      resolve(this.factures.slice());
    });
  }
}
