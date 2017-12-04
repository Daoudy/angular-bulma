import { Client } from './../shared/models/client.model';
import { AuthService } from './../shared/auth.service';
import {Injectable} from '@angular/core'
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ClientsService {
  clientsChanged = new Subject();
  selectedClientChanged = new Subject();
  clientsLoaded = false;
  clients: Client[] = [];

  constructor(private http: Http, private authService: AuthService){
  }

  getClient(id: number){
    if(!this.clientsLoaded){
      return this.getClients().then((clients: Client[]) => {
        this.clientsLoaded = true;
        return clients.find(client => client.id === id);
      })
    } else {
      return new Promise((resolve, reject) => {
        resolve(this.clients.find(client => client.id === id));
      })
    }
    // return this.http.get('https://boite-a-recettes-4232d.firebaseio.com/clients/'+id+'.json').map((response: Response) => {
    //   const client: Client = response.json();
    //   return client;
    // }).toPromise();
  }

  updateClient(client: Client){
    const index = this.clients.findIndex(_client => _client.id === client.id);
    this.clients[index] = client;
    this.clientsChanged.next(this.clients.slice());
  }

  addClient(client: Client){
    client.id = this.getLastId();
    this.clients.push(client);
    this.clientsChanged.next(this.clients.slice());
  }

  private getLastId(){
    const lastId = this.clients.sort((a, b) => b.id - a.id).shift().id + 1;
    return lastId;
  }

  getClients(){
    if(!this.clientsLoaded){
      return this.http.get('https://boite-a-recettes-4232d.firebaseio.com/clients.json').map((response: Response) => {
        const clients = response.json();

        for(let client of clients){
          if(!client.notes) client.notes = [];
        }

        return clients;
      }).toPromise<Client[]>().then((clients: Client[]) => {
        this.clients = clients;
        this.clientsLoaded = true;
        this.clientsChanged.next(this.clients.slice());
        return this.clients.slice();
      })
    } else {
      return new Promise<Client[]>((resolve, reject) => {
        resolve(this.clients.slice());
      });
    }
  }

  setClients(clients: Client[]){
    this.clients = clients;
    this.clientsChanged.next(this.clients.slice());
  }
}
