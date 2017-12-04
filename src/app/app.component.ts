import { OnInit } from '@angular/core';
import { FacturesService } from './factures/factures.service';
import { ClientsService } from 'app/clients/clients.service';
import { Component } from '@angular/core';
import { AuthService } from 'app/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private cService: ClientsService, private fService: FacturesService, private authService: AuthService){}

  ngOnInit(){
  }
}
