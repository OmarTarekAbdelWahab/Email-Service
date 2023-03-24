import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from '../email.module';
import { emailService } from '../emailservice.service';
import { User } from '../user.module';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})
export class BinComponent {
  user: User = User.getInstance();
  deletedMessages: Email[] = []
  sentDeletedMessages: Email[] = []
  receivedDeletedMessages: Email[] = []
  p:number=1;
  emailsperpage:number=1;
  totalemails:any;

  constructor(private router: Router, private route: ActivatedRoute, private emailServe: emailService){
    this.emailServe.getDeletedMessages(this.user.email).subscribe(
      (Response: Email[]) => {
        this.deletedMessages = Response;
        console.log("Before sentDeletedMessages: ", this.sentDeletedMessages)
        console.log("After receivedDeletedMessages: ", this.receivedDeletedMessages)
        let c1 = 0
        let c2 = 0
        for(let i = 0; i< this.deletedMessages.length;i++){
          if(this.user.email == this.deletedMessages[i].sender){
            this.sentDeletedMessages[c1++] = this.deletedMessages[i];
          }else{
            this.receivedDeletedMessages[c2++] = this.deletedMessages[i];
          }
        }
        console.log("sentDeletedMessages: ", this.sentDeletedMessages)
        console.log("receivedDeletedMessages: ", this.receivedDeletedMessages)
       
      }
    )
  }
  permanentlyDelete(email: Email){
    let side: String = ''
    if(this.user.email == email.sender){
      side = "sender"
    }else{
      side = "receiver"
    }
    this.emailServe.permanentlyDeleteMessage(email, side).subscribe(
      (Response: any) =>{
        this.emailServe.getDeletedMessages(this.user.email).subscribe(
          (Response: Email[]) => {
            this.deletedMessages = Response;
            console.log("Before sentDeletedMessages: ", this.sentDeletedMessages)
            console.log("After receivedDeletedMessages: ", this.receivedDeletedMessages)
            let c1 = 0
            let c2 = 0
            for(let i = 0; i< this.deletedMessages.length;i++){
              if(this.user.email == this.deletedMessages[i].sender){
                this.sentDeletedMessages[c1++] = this.deletedMessages[i];
              }else{
                this.receivedDeletedMessages[c2++] = this.deletedMessages[i];
              }
            }
            console.log("sentDeletedMessages: ", this.sentDeletedMessages)
            console.log("receivedDeletedMessages: ", this.receivedDeletedMessages)
           
          }
        )
      }
    )
  }
  restore(restoredEmail: Email){
    if(this.p==this.totalemails){
      this.p=this.totalemails-1;
    }
    if(this.user.email == restoredEmail.sender){
      this.emailServe.restoreSenderMessage(restoredEmail).subscribe(
        (Response: any) => {
          this.emailServe.getDeletedMessages(this.user.email).subscribe(
            (Response: Email[]) => {
              this.sentDeletedMessages = []
              this.receivedDeletedMessages = []
              this.deletedMessages = Response;
              let c1 = 0
              let c2 = 0
              for(let i = 0; i< this.deletedMessages.length;i++){
                if(this.user.email == this.deletedMessages[i].sender){
                  this.sentDeletedMessages[c1++] = this.deletedMessages[i];
                }else{
                  this.receivedDeletedMessages[c2++] = this.deletedMessages[i];
                }
              }
            }
          )
        }
      )
    }else{
      this.emailServe.restoreReceiverMessage(restoredEmail).subscribe(
        (Response: any) => {
          this.emailServe.getDeletedMessages(this.user.email).subscribe(
            (Response: Email[]) => {
              this.sentDeletedMessages = []
              this.receivedDeletedMessages = []
              this.deletedMessages = Response;
              console.log("contacts: ", this.deletedMessages)
              for(let i = 0; i< this.deletedMessages.length;i++){
                if(this.user.email == this.deletedMessages[i].sender){
                  this.sentDeletedMessages[i] = this.deletedMessages[i];
                }else{
                  this.receivedDeletedMessages[i] = this.deletedMessages[i];
                }
              }
              console.log("receivedDeletedMessages: ", this.receivedDeletedMessages)
              console.log("sentDeletedMessages: ", this.sentDeletedMessages)
             
            }
          )
        }
      )
    }
  }
  firstLink: any;
  secondLink: any;
  thirdLink: any;
  fourthLink: any;
  fifthLink: any;
  sixthLink: any;
  upload(email:Email){console.log(email.firstLink)
    if(email.firstLink!=null&&email.firstLink!=undefined&&email.firstLink!=""){
      this.firstLink=email.firstLink;
      console.log(this.firstLink)
      document.getElementById("att1")!.style.display="inline-block";
    }
    if(email.secondLink){
      this.secondLink=email.secondLink;
      document.getElementById("att2")!.style.display="inline-block";
    }
    if(email.thirdLink){
      this.thirdLink=email.thirdLink;
      document.getElementById("att3")!.style.display="inline-block";
    }
    if(email.fourthLink){
      this.fourthLink=email.fourthLink;
      document.getElementById("att4")!.style.display="inline-block";
    }
    if(email.fifthLink){
      this.fifthLink=email.fifthLink;
      document.getElementById("att5")!.style.display="inline-block";
    }
    if(email.sixthLink){
      this.sixthLink=email.sixthLink;
      document.getElementById("att6")!.style.display="inline-block";
    }
    
  }
  deleteAttachment(num:String,email:Email,id:String){
    this.emailServe.deleteAttachment(this.user.email, email, num).subscribe(
  
    )
    document.getElementById(String(id))!.style.display="none";
  
  }
  inbox(){
    this.router.navigate([`/inbox`], { relativeTo: this.route });
  }
  draft(){
    this.router.navigate([`/draft`], { relativeTo: this.route });
  }
  sent(){
    this.router.navigate([`/sentEmails`], { relativeTo: this.route });
  }
  send(){
    this.router.navigate([`/send`], { relativeTo: this.route });
  }
  contacts(){ 
    this.router.navigate([`/contacts`], { relativeTo: this.route });
  }
  search(){
    this.router.navigate([`/search`], { relativeTo: this.route });
  }
  profile(){
    this.router.navigate([`/profile`], { relativeTo: this.route });
  }
  folder(){
    this.router.navigate([`/Myfolders`], { relativeTo: this.route });
  }
}
