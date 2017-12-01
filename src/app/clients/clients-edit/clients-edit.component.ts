import { Client } from "./../../shared/models/client.model";
import { ClientsService } from "./../clients.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormArray, FormGroup, FormControl, Validators } from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: "app-clients-edit",
  templateUrl: "./clients-edit.component.html",
  styleUrls: ["./clients-edit.component.css"]
})
export class ClientsEditComponent implements OnInit {
  id: number;
  client: Client;
  editMode: boolean = false;
  clientForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cService: ClientsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      //this.cService.getClient(id).then((client: Client) => this.client = client);
      this.createFormControls();
    });
  }

  createFormControls() {
    this.clientForm = new FormGroup({
      nom: new FormControl("", Validators.required),
      prenom: new FormControl("", Validators.required),
      ville: new FormControl("", Validators.required),
      avatar: new FormControl(""),
      notes: new FormArray([])
    });

    if (this.editMode) {
      this.cService.getClient(this.id).then((client: Client) => {
        this.client = client;
        const notes = new FormArray([]);

        if (client.notes) {
          client.notes.forEach(note => {
            notes.push(
              new FormGroup({
                date: new FormControl(note.date),
                contenu: new FormControl(note.contenu)
              })
            );
          });
        }

        this.clientForm = new FormGroup({
          nom: new FormControl(client.nom, Validators.required),
          prenom: new FormControl(client.prenom, Validators.required),
          ville: new FormControl(client.ville, Validators.required),
          avatar: new FormControl(client.avatar),
          notes: notes
        });
      });
    }
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const value = this.clientForm.value;
      if (this.editMode) {
        value.id = this.id;
        this.cService.updateClient(value);
      } else {
        this.cService.addClient(value);
      }
      this.onCancel();
    }
  }

  onAddNote() {
    (<FormArray>this.clientForm.get("notes")).push(
      new FormGroup({
        date: new FormControl(
          moment().format("Y-MM-D H:m:s"),
          Validators.required
        ),
        contenu: new FormControl("", Validators.required)
      })
    );
  }

  onDeleteNote(index) {
    (<FormArray>this.clientForm.get("notes")).removeAt(index);
  }
}
