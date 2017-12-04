import { FlashService } from './../shared/flash.service';
import { Http, Response } from '@angular/http';
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
    private cService: ClientsService,
    private http: Http,
    private flash: FlashService
  ) {}

  store(){
    return this.http.put('https://boite-a-recettes-4232d.firebaseio.com/factures.json', this.factures)
  }

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
    if(!this.facturesLoaded){
      return this.getFactures().then((factures: Facture[]) => {
        return factures.filter(facture => facture.clientId == clientId);
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve(this.factures.filter(facture => facture.clientId == clientId));
      })
    }
  }

  getFacture(numero: string) {
    if(!this.facturesLoaded){
      return this.getFactures().then((factures: Facture[]) => {
        return this.factures.find(facture => facture.numero == numero);
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve(this.factures.find(facture => facture.numero == numero));
      })
    }
  }

  getFactures() {
    if(!this.facturesLoaded){
      return this.http.get('https://boite-a-recettes-4232d.firebaseio.com/factures.json').map((response: Response) => {
        return response.json();
      }).toPromise<Facture[]>().then((factures: Facture[]) => {
        this.factures = factures;
        this.facturesLoaded = true;
        this.facturesChanged.next(this.factures.slice());
        return this.factures.slice();
      })
    } else {
      return new Promise<Facture[]>((resolve, reject) => {
        resolve(this.factures.slice());
      });
    }
  }

  updateFacture(facture: Facture) {
    const index = this.factures.findIndex(
      _facture => _facture.numero == facture.numero
    );
    this.factures[index] = facture;
    this.store().subscribe(
      success => this.flash.success(`La facture ${facture.numero} a bien été modifiée !`),
      error => this.flash.error(`La facture ${facture.numero} n'a pas pu être modifiée`)
    );
    this.facturesChanged.next(this.factures.slice());
  }

  addFacture(facture: Facture) {
    this.factures.push(facture);
    this.store().subscribe(
      success => this.flash.success(`La facture ${facture.numero} a bien été ajoutée !`),
      error => this.flash.error(`La facture ${facture.numero} n'a pas pu être ajoutée`)
    );
    this.facturesChanged.next(this.factures.slice());
  }
}
