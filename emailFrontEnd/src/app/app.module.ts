import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { InboxComponent } from './inbox/inbox.component';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http"
import { sendComponent } from './send/send.component';
import { SentEmailsComponent } from './sent-emails/sent-emails.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DraftComponent } from './draft/draft.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BinComponent } from './bin/bin.component';
import { SearchComponent } from './search/search.component';
import { MyfoldersComponent } from './myfolders/myfolders.component';
import { FolderComponent } from './folder/folder.component';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    InboxComponent,
    sendComponent,
    SentEmailsComponent,
    ContactsComponent,
    DraftComponent,
    BinComponent,
    SearchComponent,
    MyfoldersComponent,
    FolderComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
