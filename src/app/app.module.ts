import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { IonicStorageModule } from '@ionic/storage';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { SortPipe } from './sort.pipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/', '.json');
}

@NgModule({
  declarations: [AppComponent, ChatRoomComponent, LoginComponent, SignUpComponent,
    ChatPageComponent, SortPipe],
  entryComponents: [],

  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,

    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyASgGvDds5o7WcSrhdRacLlkRhu9yUFdfI",
      authDomain: "wechat-b6f36.firebaseapp.com",
      databaseURL: "https://wechat-b6f36.firebaseio.com",
      projectId: "wechat-b6f36",
      storageBucket: "wechat-b6f36.appspot.com",
      messagingSenderId: "355277417289"
    }),


    AppRoutingModule],
  providers: [
    StatusBar, TranslateService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AngularFirestore, ChatService, AuthService, AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
