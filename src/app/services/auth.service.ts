import { Injectable } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from "@ionic/storage";
import { User } from '../user';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;
  u: User
  time : Date;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore, private storage: Storage,
    private router: Router) {

    this.user = afAuth.authState;
  }

  authUser() {
    return this.user;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {

        var testObject = { email: user.user.email, time: new Date(user.user.metadata.creationTime).toUTCString() };
        localStorage.setItem('user', JSON.stringify(testObject))
        console.log("user", user);
        this.authState = user;
        this.router.navigate(['chat']);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
      }).catch(error => console.log(error));
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    this.db.doc(path).update(data)
      .catch(error => console.log(error));
  }


}

