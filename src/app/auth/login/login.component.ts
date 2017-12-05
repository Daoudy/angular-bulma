import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.authService.authStateChanged.subscribe(state => {
      if(state) {
        const returnUrl = this.route.snapshot.queryParams['from'];
        if(returnUrl)
          this.router.navigateByUrl(returnUrl);
        else
          this.router.navigateByUrl('/');
      }
    })
  }

  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authService.loginUser(email, password)
      .then(response => {
        this.router.navigate(['../'], {relativeTo: this.route});
      })
      .catch(error => {
        this.errorMessage = error.message;
      })
  }

  onLogout(){
    this.authService.logoutUser();
  }

}
