import { Client } from './../../shared/models/client.model';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FacturesService } from './../factures.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'app/clients/clients.service';
import * as moment from 'moment';
import { Facture } from 'app/shared/models/facture.model';

@Component({
  selector: 'app-factures-edit',
  templateUrl: './factures-edit.component.html',
  styleUrls: ['./factures-edit.component.css']
})
export class FacturesEditComponent implements OnInit {

  numero: string;
  editMode: boolean = false;
  factureForm: FormGroup;
  clients: Client[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private fService: FacturesService, private cService: ClientsService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.numero = params['numero'];
      this.editMode = params['numero'] != null;
      this.createFormControls();
    })

    this.cService.getClients().then((clients: Client[]) => this.clients = clients);
  }

  createFormControls(){
    this.factureForm = new FormGroup({
      numero: new FormControl(this.fService.getNewChrono(), Validators.required),
      clientId: new FormControl("", Validators.required),
      montant: new FormControl(0, Validators.required),
      date: new FormControl(moment().format('YYYY-MM-DD'), Validators.required),
      statut: new FormControl('', Validators.required)
    });

    if(this.editMode){
      this.fService.getFacture(this.numero).then((facture: Facture) => {
        this.factureForm = new FormGroup({
          numero: new FormControl(facture.numero, Validators.required),
          clientId: new FormControl(facture.clientId, Validators.required),
          montant: new FormControl(facture.montant, Validators.required),
          date: new FormControl(moment(facture.date).format('YYYY-MM-DD'), Validators.required),
          statut: new FormControl(facture.statut, Validators.required)
        });
      });
    }
  }

}
