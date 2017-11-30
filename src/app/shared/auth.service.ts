import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

const fireApp = firebase.initializeApp({
  apiKey: "AIzaSyAQnkHAsKBKhSAT4AfuFdZp7_Iv2E9_yoI",
  authDomain: "boite-a-recettes-4232d.firebaseapp.com",
});

@Injectable()
export class AuthService {
  // authStateChanged = new Subject();
  token = null;

  constructor(){
    // fireApp.auth().onAuthStateChanged((user) => {
    //   if(user){
    //     fireApp.auth().currentUser.getIdToken().then(token => {
    //       this.token = token
    //       this.authStateChanged.next(true);
    //     })
    //   }
    //   else {
    //     this.authStateChanged.next(false);
    //   }
    // })
  }

  isConnected(){
    return fireApp.auth().currentUser !== null;
  }

  loginUser(email, password){
    return fireApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return fireApp.auth().signInWithEmailAndPassword(email, password).then(response => {
        fireApp.auth().currentUser.getIdToken().then(token => this.token = token)
        console.log('Manual login');
        // this.authStateChanged.next(true);
      });
    });
  }

  logoutUser(){
    fireApp.auth().signOut();
  }
}
