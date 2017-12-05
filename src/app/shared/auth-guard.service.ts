import { AuthService } from 'app/shared/auth.service';
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isConnected()){
      return true;
    } else {
      this.router.navigateByUrl('/login?from='+ state.url);
      return false;
    }
  }
}
