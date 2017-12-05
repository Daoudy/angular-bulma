import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password)
      .then(response => {
        console.log(response);
        // this.router.navigate(['/']);
      })
      .catch(error => {
        this.errorMessage = error.message;
      })
  }

}
