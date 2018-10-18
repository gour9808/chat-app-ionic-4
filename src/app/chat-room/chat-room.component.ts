import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from '../services/chat.service';
import { User } from '../user';
import { Chat } from '../modal';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  chats: any = [];
  chatpartner = this.chatService.currentChatPartner;
  chatuser;
  message: string;
  chatPayload: any;
  intervalScroll;
  @ViewChild("content") content: any;

  constructor(
    private db: AngularFirestore,
    private chatService: ChatService,
  ) { }

  //scrolls to bottom whenever the page has loaded
  ionViewDidEnter() {
    this.content.scrollToBottom(300); //300ms animation speed
  }

  ngOnInit() {
    this.chatuser = JSON.parse(localStorage.getItem('user'));
    this.db
      .collection<Chat>('chats', res => {
        return res.where("pair", "==", this.chatService.currentChatPairId);
      })
      .valueChanges()
      .subscribe(chats => {
        console.log(chats);
        this.chats = chats;

      });
  } 

  addChat() {
    if (this.message && this.message !== "") {
      console.log(this.message);
      this.chatPayload = {
        message: this.message,
        sender: this.chatuser.email,
        pair: this.chatService.currentChatPairId,
        time: new Date().getTime()
      };

      this.chatService
        .addChat(this.chatPayload)
        .then(() => {
          //Clear message box
          this.message = "";

          //Scroll to bottom
          this.content.scrollToBottom(300);
        })
        .catch(err => {
          console.log(err);
        });
    }
  } //addChat

  isChatPartner(senderEmail) {
    return senderEmail == this.chatpartner.email;
  } //isChatPartner
}