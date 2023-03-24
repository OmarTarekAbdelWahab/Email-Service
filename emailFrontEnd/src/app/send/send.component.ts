import { HtmlParser } from '@angular/compiler';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from '../email.module';
import { emailService } from '../emailservice.service';
import { User } from '../user.module';



@Component({
  selector: 'app-sent-emails',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})


export class sendComponent implements OnInit {
  ngOnInit(): void {
    document.getElementById('text2')!.addEventListener("input", (e) => {
      this.setParamter();
    });
    document.getElementById('text')!.addEventListener("input", (e) => {
      this.setParamter();
    });
    document.getElementById('in')!.addEventListener("input", (e) => {
      this.setParamter();
    });

  }
  context: string = ""
  subject: string = ""
  em: string = ""
  pir: string = ""
  message1!: HTMLElement | null;
  message2!: HTMLElement | null;
  con!: HTMLElement | null;
  pirority !: any
  files!: any
  static l: string
  inputfiles!: File;
  newEmail: Email = new Email;
  user: User = User.getInstance()
  isSent: boolean = false;
  sendtoUser: String = "";
  queue: String[] = []

  constructor(private router: Router, private route: ActivatedRoute, private emailServe: emailService) {

    if (this.user.isDraft) {
      this.newEmail = this.user.draftEmail;
      this.write_paramter();
      this.user.isDraft = false
      console.log(this.user.draftEmail)
      console.log(this.newEmail)
    }
    //if(this.user.draft){
    //this.newEmail=this.user.draftEmails[this.user.i];
    //this.user.draftEmails.pop()

    //}
    //this.user.draft=false;
    this.setParamter();
    //this.user.draftEmails.push(this.newEmail);

  }
  selectedFile: any=[];
  link: string = "";
  attach(event: any) {
    this.selectedFile = <File>event.target.files;
    for (let i = 0; i < this.selectedFile.length; i++) {
      let fr = new FileReader();
      fr.onload = (e) => {
        this.link = String(fr.result);
        if (this.newEmail.firstLink == "" || this.newEmail.firstLink == null || this.newEmail.firstLink == undefined) {
          this.newEmail.firstLink = this.link;
        }
        else if (this.newEmail.secondLink == "" || this.newEmail.secondLink == null || this.newEmail.secondLink == undefined)
          this.newEmail.secondLink = this.link
        else if (this.newEmail.thirdLink == "" || this.newEmail.thirdLink == null || this.newEmail.thirdLink == undefined)
          this.newEmail.thirdLink = this.link
        else if (this.newEmail.fourthLink == "" || this.newEmail.fourthLink == null || this.newEmail.fourthLink == undefined)
          this.newEmail.fourthLink = this.link
        else if (this.newEmail.fifthLink == "" || this.newEmail.fifthLink == null || this.newEmail.fifthLink == undefined)
          this.newEmail.fifthLink = this.link
        else if (this.newEmail.sixthLink == "" || this.newEmail.sixthLink == null || this.newEmail.sixthLink == undefined)
          this.newEmail.sixthLink = this.link
      }
      fr.readAsDataURL(this.selectedFile[i])
    }
    
  }
  getPirority() {
    if ((document.getElementById('4') as HTMLInputElement | null)?.checked)
      this.pir = '4'
    else if ((document.getElementById('3') as HTMLInputElement | null)?.checked)
      this.pir = '3'
    else if ((document.getElementById('2') as HTMLInputElement | null)?.checked)
      this.pir = '2'
    else
      this.pir = '1';
  }
  checkUpdate(email: Email) {
    console.log(email.context, email.receiver, email.subject)
    if (email.context == "" && email.receiver == "" && email.subject == "") {
      return false;
    }
    else
      return true;

  }
  setParamter() {
    this.isSent = false
    this.message1 = document.getElementById('emailmessage1');
    this.message2 = document.getElementById('emailmessage2');
    this.getPirority();
    this.newEmail.sender = this.user.email
    this.newEmail.context = this.context
    this.newEmail.receiver = this.sendtoUser
    this.newEmail.subject = this.subject
    this.newEmail.date = "";
    this.newEmail.priority = this.pir;
    //this.files=document.getElementById('file');
    //his.inputfiles=this.files.files[0];
    //this.newEmail.filesInput=this.inputfiles;
  }

  write_paramter() {
    this.user.email = this.newEmail.sender;
    this.context = String(this.newEmail.context);
    this.sendtoUser = String(this.newEmail.receiver);
    this.subject = String(this.newEmail.subject);
    this.pir = String(this.newEmail.priority);
  }
  saveEmail() {
    //this.user.draftEmails.pop();
    console.log(this.user)
    this.setParamter();
    console.log(this.newEmail)
    this.isSent = true
    this.emailServe.sendEmail(this.newEmail).subscribe(
      (Response: Email) => {
        console.log(Response.sender)
        if (Response.sender == "Email Sent") {
          this.message2!.style.display = "block";
        }
        else {
          this.message1!.style.display = "block";
        }

      }
    )
    console.log("context", this.context, "REceiver", this.sendtoUser, "subject", this.subject)
  }
  /* sendToDraftArray(){
       this.setParamter();
       if(this.checkUpdate()){
       this.user.draftEmails.push(this.newEmail);}
   }*/
  addDraft() {
    if (this.checkUpdate(this.newEmail)) {
      let email: Email = new Email;
      if (this.isSent) {
        return
      }
      email.sender = this.user.email
      email.receiver = this.sendtoUser
      email.context = this.context
      email.subject = this.subject
      email.priority = this.pir
      console.log("Drafted:", email)
      this.emailServe.addDraft(email).subscribe(
        (Response: any) => {

        }
      )
    }
  }
  sendTo() {
    let c = 0;
    console.log("sendToUser = ", this.sendtoUser)
    let s = this.sendtoUser.split(",")
    for (let i = 0; i < s.length; i++) {
      console.log("Element : ", s[i].replace(/\s/g, ""))
      this.sendtoUser = s[i].replace(/\s/g, "")
      this.saveEmail()
    }
  }
  sent() {
    this.addDraft()
    this.setParamter();
    this.router.navigate([`/sentEmails`], { relativeTo: this.route });
  }
  inbox() {
    this.addDraft()
    this.router.navigate([`/inbox`], { relativeTo: this.route });
  }
  draft() {
    this.addDraft()
    this.router.navigate([`/draft`], { relativeTo: this.route });
  }
  contacts() {
    this.addDraft()
    this.router.navigate([`/contacts`], { relativeTo: this.route });
  }
  bin() {
    this.addDraft()
    this.router.navigate([`/bin`], { relativeTo: this.route });
  }
  search() {
    this.addDraft()
    this.router.navigate([`/search`], { relativeTo: this.route });
  }
  profile() {
    this.addDraft()
    this.router.navigate([`/profile`], { relativeTo: this.route });
  }
  folder() {
    this.addDraft()
    this.router.navigate([`/Myfolders`], { relativeTo: this.route });
  }
}


