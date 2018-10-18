import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChatPageComponent } from './chat-page/chat-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',  component : LoginComponent},
  { path: 'signup', component: SignUpComponent },
  { path: 'chat', component: ChatPageComponent },
  { path: 'chatromm', component: ChatRoomComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
