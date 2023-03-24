import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from 'src/app/email.module';
import { User } from 'src/app/user.module';
import { emailService } from '../emailservice.service';
import { InboxComponent } from '../inbox/inbox.component';
import { sendComponent } from '../send/send.component';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent {
  emails: Email[] = [];
  p:number=1;
  emailsperpage:number=1;
  totalemails:any;
  user:User = User.getInstance();
  constructor(private router: Router, private route: ActivatedRoute, private emailServe: emailService){
    //console.log(this.user.draftEmails)
    /*for(let i=0;i<this.user.draftEmails.length;i++){
      if(this.checkUpdate(this.user.draftEmails[i])){
        console.log("22",this.user.draftEmails[i])
         this.emails.push(this.user.draftEmails[i]);}
    }*/
    emailServe.getDrafts(this.user.email).subscribe(
      (Response: Email[]) => {
        this.emails = Response
      }
    )
    console.log("emails",this.emails);
    this.totalemails=this.emails.length;
  }
  deleteDraft(email: Email){
    this.emailServe.deleteDraft(email).subscribe(
      (Response: any) =>{
        this.emailServe.getDrafts(this.user.email).subscribe(
          (Response: Email[]) => {
            this.emails = Response
          }
        )
      }
    )
  }
  
  sent(){
    this.router.navigate([`/sentEmails`], { relativeTo: this.route });
  }
  send(){
    this.router.navigate([`/send`], { relativeTo: this.route });
  }
  inbox(){
    
    this.router.navigate([`/inbox`], { relativeTo: this.route });
  }
  bin(){
    this.router.navigate([`/bin`], { relativeTo: this.route });
  }
  contacts(){ 
    this.router.navigate([`/contacts`], { relativeTo: this.route });
  }
  search(){
    this.router.navigate([`/search`], { relativeTo: this.route });
  }
  modifiy(email: Email){
    this.emailServe.deleteDraft(email).subscribe(
      (Response: any) => {
        
      }
    )
    this.user.draftEmail = email
    this.user.isDraft = true
    //this.user.draft=true;
    //this.user.i=this.p-1;
    //console.log("i = ",this.user.i,"draft",this.user.draft,"message",this.user.draftEmails[this.user.i])
    this.router.navigate([`/send`], { relativeTo: this.route });
  }
  profile(){
    this.router.navigate([`/profile`], { relativeTo: this.route });
  }
  folder(){
    this.router.navigate([`/Myfolders`], { relativeTo: this.route });
  }
}
