import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from '../services/chat.service';
import { User } from '../user';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  availableusers: any = [];
  public languages: any[];
  lang: any;
  chatuser;
  constructor(private db: AngularFirestore, private router: Router,
    private chatService: ChatService, private translate: TranslateService) {

      // firebase.firestore().enablePersistence().catch((err=>
      //   {
      //     console.log(err);
          
      //   }))

    this.languages = [
      {
        name: 'English',
        value: 'lang-en',
        active: false,
      },
      {
        name: 'Deutsch',
        value: 'lang-de',
        active: false,
      }];
  }

  get currentCountryValue(): string {
    return this.translate.currentLang;
  }


  ngOnInit() {
    this.translate.setDefaultLang('lang-en'); // set English as default
    // set current langage
    console.log('language locally stored', this.lang);
    this.lang = this.lang ? this.lang : 'lang-en';
    this.selectLang(this.lang);
    this.chatuser = JSON.parse(localStorage.getItem('user'));
    console.log(this.chatuser.email);


    this.db
      .collection<User>('users')
      .valueChanges()
      .subscribe(users => {
        //this.availableusers = users;
        console.log("users from page", users);
        this.availableusers = users.filter(user => {
          if (user.email != this.chatuser.email) {
            return user;
          }
        });
      });

  }

  change(lang) {
    this.selectLang(lang.value);
    this.lang = lang.value;
    console.log('language stored', this.lang);
  }

  selectLang(lang: string) {
    this.translate.use(lang);
  }

  getData()
  {
  
  }

  isActive(lang) {
    return this.lang === lang ? 'active' : '';
  }

  goToChat(chatpartner) {
    console.log(chatpartner);

    this.chatService.currentChatPairId = this.chatService.createPairId(
      this.chatuser,
      chatpartner
    );
    console.log(this.chatService.currentChatPairId);


    this.chatService.currentChatPartner = chatpartner;
    this.router.navigate(['chatromm'])
    console.log(this.chatService.currentChatPartner);



  }
}


