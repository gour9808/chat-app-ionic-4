import { Injectable } from '@angular/core';
import { Chat } from '../modal';
import { User } from '../user'
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';





@Injectable({
  providedIn: 'root'
})
export class ChatService {

  users: AngularFirestoreCollection<User>;
  currentChatPairId;
  currentChatPartner;
  chats: AngularFirestoreCollection<Chat>;

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.users = db.collection<User>('users');
    this.chats = db.collection<Chat>('chats');

  }

  addUser(payload) {
    return this.users.add(payload);
  }

  addChat(chat: Chat) {
    return this.chats.add(chat);
  }

  createPairId(user1, user2) {
    let pairId;
    if (user1.time < user2.time) {
      pairId = `${user1.email}|${user2.email}`;
    } else {
      pairId = `${user2.email}|${user1.email}`;
    }

    return pairId;
  }



}
