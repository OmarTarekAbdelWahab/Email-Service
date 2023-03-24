import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from '../email.module';
import { emailService } from '../emailservice.service';
import { User } from '../user.module';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent {
  p:number=1;
  emailsperpage:number=1;
  totalemails:any;
  messages:Email[]=[];
  user: User = User.getInstance()
  /*
  FolderName in center of screen
  navigate back button
  */
  constructor(private router: Router, private route: ActivatedRoute, private emailServe: emailService){
    console.log("FolderNAME NOW: ", this.user.currentFolderName)
    emailServe.getMessagesInFolder(this.user.email, this.user.currentFolderName).subscribe(
      (Response: Email[]) =>{
        this.messages = Response
        console.log(this.messages)
      }
    )
  }
  deleteMessage(email: Email){
    if(email.sender == this.user.email){
      this.emailServe.removeEmailFromFolderOfSender(email).subscribe(
        (Response: any) =>{
          this.emailServe.getMessagesInFolder(this.user.email, this.user.currentFolderName).subscribe(
            (Response: Email[]) =>{
              this.messages = Response
              console.log(this.messages)
            }
          )
        }
      )
    }else if(email.receiver == this.user.email){
      this.emailServe.removeEmailFromFolderOfReceiver(email).subscribe(
        (Response: any) =>{
          this.emailServe.getMessagesInFolder(this.user.email, this.user.currentFolderName).subscribe(
            (Response: Email[]) =>{
              this.messages = Response
              console.log(this.messages)
            }
          )
        }
      )
    }
  }
  newName: String = ''
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
  renameFolder(){
    console.log("old",this.user.currentFolderName,"new",this.newName)
    this.emailServe.renameFolder(this.user.email, this.user.currentFolderName, this.newName).subscribe(
      (Response: any) =>{

      }
    )
  }
  deleteFolder(){
    this.emailServe.deleteFolder(this.user.email, this.user.currentFolderName).subscribe(
      (Response: any) =>{
        
      }
    )
  }
  inbox(){
    this.router.navigate([`/inbox`], { relativeTo: this.route });
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
  bin(){
    this.router.navigate([`/bin`], { relativeTo: this.route });
  }
  draft(){
    this.router.navigate([`/draft`], { relativeTo: this.route });
  }
  profile(){
    this.router.navigate([`/profile`], { relativeTo: this.route });
  }
  search(){
    this.router.navigate([`/search`], { relativeTo: this.route });
  }
  folder(){
    this.router.navigate([`/Myfolders`], { relativeTo: this.route });
  }
}
