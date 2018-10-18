import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../user'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router, private storage: Storage, private db: AngularFirestore) { }

  ngOnInit() {
  }

  login() {
    console.log('login() called from login-form component');
    this.authService.login(this.email, this.password)
      .catch(error => this.errorMsg = error.message);
  }

}
