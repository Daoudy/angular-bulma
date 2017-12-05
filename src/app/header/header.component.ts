import { AuthService } from './../shared/auth.service';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ClientsService } from 'app/clients/clients.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() isConnected;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

  connect(){
    this.isConnected = true;
  }

  logout(){
    this.authService.logoutUser();
  }

}
