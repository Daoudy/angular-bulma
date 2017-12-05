import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

// const fireApp = firebase.initializeApp({
//   apiKey: "AIzaSyAQnkHAsKBKhSAT4AfuFdZp7_Iv2E9_yoI",
//   authDomain: "boite-a-recettes-4232d.firebaseapp.com",
// });

@Injectable()
export class AuthService {
  authStateChanged = new Subject();
  token = null;

  constructor(private router: Router, private af: AngularFireAuth){
    this.af.authState.subscribe(state => {
      if(state) {
        this.af.auth.currentUser.getIdToken().then(token => {
          this.token = token;
          this.authStateChanged.next(true);
        })
      } else {
        this.authStateChanged.next(false);
      }
    });
    // fireApp.auth().onAuthStateChanged(state => {
    //   if(state) {
    //     fireApp.auth().currentUser.getIdToken().then(token => {
    //       this.token = token
    //       this.authStateChanged.next(true);
    //     })
    //   }
    //   else this.authStateChanged.next(false);
    // })
  }

  isConnected(){
    return this.token !== null;
  }

  loginUser(email, password){
    return this.af.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return this.af.auth.signInWithEmailAndPassword(email, password).then(response => {
        this.af.auth.currentUser.getIdToken().then(token => {
          this.token = token
          this.router.navigate(['/']);
        })

      });
    });
  }

  signupUser(email, password){
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  logoutUser(){
    this.af.auth.signOut().then(state => {
      console.log(state);
      this.router.navigateByUrl('/login');
    })
  }
}
