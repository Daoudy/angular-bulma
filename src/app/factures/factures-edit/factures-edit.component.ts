import { Client } from "./../../shared/models/client.model";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { FacturesService } from "./../factures.service";
import { Router, Params, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ClientsService } from "app/clients/clients.service";
import * as moment from "moment";
import { Facture } from "app/shared/models/facture.model";
import { Location } from "@angular/common";

@Component({
  selector: "app-factures-edit",
  templateUrl: "./factures-edit.component.html",
  styleUrls: ["./factures-edit.component.css"]
})
export class FacturesEditComponent implements OnInit {
  numero: string;
  editMode: boolean = false;
  factureForm: FormGroup;
  facture: Facture;
  clients: Client[] = [];
  clientId: number = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fService: FacturesService,
    private cService: ClientsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.numero = params["numero"];
      this.editMode = params["numero"] != null;
      this.clientId = +params["clientId"];
      this.createFormControls();
    })

    this.cService.getClients().then((clients: Client[]) => {
      this.clients = clients;
    });

  }

  createFormControls() {
    this.factureForm = new FormGroup({
      numero: new FormControl(
        this.fService.getNewChrono(),
        Validators.required
      ),
      clientId: new FormControl(this.clientId, Validators.required),
      montant: new FormControl(0, Validators.required),
      date: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      statut: new FormControl("", Validators.required)
    });

    if (this.editMode) {
      this.fService.getFacture(this.numero).then((facture: Facture) => {
        this.facture = facture;

        this.cService.getClient(+this.facture.clientId).then((client: Client) => {
          this.facture.clientDetails = client;
          this.factureForm = new FormGroup({
            numero: new FormControl(this.facture.numero, Validators.required),
            clientId: new FormControl(this.facture.clientId, Validators.required),
            montant: new FormControl(this.facture.montant, Validators.required),
            date: new FormControl(
              moment(this.facture.date).format("YYYY-MM-DD"),
              Validators.required
            ),
            statut: new FormControl(this.facture.statut, Validators.required)
          });
        })

      })
    }
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.factureForm.valid) {
      const value = this.factureForm.value;
      if (this.editMode) {
        value.numero = this.numero;
        this.fService.updateFacture(value);
      } else {
        this.fService.addFacture(value);
      }
      this.onCancel();
    }
  }
}
