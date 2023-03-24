import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { LoginComponent } from './login/login.component';
import { sendComponent } from './send/send.component';
import { SignupComponent } from './signup/signup.component';
import { SentEmailsComponent } from './sent-emails/sent-emails.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DraftComponent } from './draft/draft.component';
import { BinComponent } from './bin/bin.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { MyfoldersComponent } from './myfolders/myfolders.component';
import { FolderComponent } from './folder/folder.component';
const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'inbox',component:InboxComponent},
  {path:'send',component:sendComponent},
  {path:'sentEmails',component:SentEmailsComponent},
  {path:'contacts',component:ContactsComponent},
  {path:'draft', component:DraftComponent},
  {path:'bin', component:BinComponent},
  {path:'search', component:SearchComponent},
  {path:'profile', component:ProfileComponent},
  {path:'Myfolders', component:MyfoldersComponent},
  {path:'folder', component:FolderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
