import { Client } from "app/shared/models/client.model";

export class Facture {
    numero: string;
    clientId: number;
    clientDetails: Client;
    montant: number;
    date: string;
    statut: string;
}
