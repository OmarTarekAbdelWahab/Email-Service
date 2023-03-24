import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from '../email.module';
import { emailService } from '../emailservice.service';
import { sendComponent } from '../send/send.component';
import { User } from '../user.module';

@Component({
  selector: 'app-sent-emails',
  templateUrl: './sent-emails.component.html',
  styleUrls: ['./sent-emails.component.css']
})
export class SentEmailsComponent {
  emails: Email[] = [];
  user :User = User.getInstance()
  Sortprio !:false;
  Sortcon !:false;
  Sortsub !:false;
  searchSub=false;
  searchTo=false;
  searchBody=false;
  p:number=1;
  emailsperpage:number=6;
  totalemails:any=0;
  key!:string
  firstLink: any;
  secondLink: any;
  thirdLink: any;
  fourthLink: any;
  fifthLink: any;
  sixthLink: any;
  folderName!: string;
  SortRevPrio=false;
  Recent=false;
  selected:boolean=false;
  selectEmail:Email=new Email();
  arrSelect:Email[]=[];
  constructor(private router: Router, private route: ActivatedRoute, private emailServe: emailService){
    emailServe.getSentMails(this.user.email).subscribe(
      (response: Email[]) =>{
        this.emails = response
        this.totalemails=this.emails.length;
      }
    ) 
  }
  deleteAttachment(num:String,email:Email,id:String){
    this.emailServe.deleteAttachment(this.user.email, email, num).subscribe(

    )
    document.getElementById(String(id))!.style.display="none";

  }
  select(email:Email){
    if(!this.selected)
     this.arrSelect.push(email);
    else{
      var index=this.arrSelect.indexOf(email);
      if (index !== -1) {
        this.arrSelect.splice(index, 1);
      }
    }
  }
  refresh(){
    this.emailServe.getSentMails(this.user.email).subscribe(
      (response: Email[]) =>{
        this.emails = response
        this.totalemails=this.emails.length;
        //console.log(this.emails[1].context)
      }
    )
  }
  filterAdvanced: boolean = false;
  @ViewChild('filter') myFilter!: ElementRef;
  toggle(){
    this.filterAdvanced = !this.filterAdvanced;
    if(this.filterAdvanced){
      this.myFilter.nativeElement.style.display = 'block';
    }
    else{
      this.myFilter.nativeElement.style.display = 'none';
    }
  }
  SortAdvanced: boolean = false;
  @ViewChild('sort') Mysort!: ElementRef;
  toggle2(){
    this.Sort();
    this.SortAdvanced = !this.SortAdvanced;
    if(this.SortAdvanced){
      this.Mysort.nativeElement.style.display = 'block';
    }
    else{
      this.Mysort.nativeElement.style.display = 'none';
    }
  }
  getPriority(){
    this.emailServe.getPrioritySentMails(this.user.email).subscribe(
      (Response: Email[]) =>{
        console.log("Sent")
        this.emails = Response;
      }
    )
    this.Sortprio=false;
  }
  Sort(){
    if(this.Sortprio){
      this.getPriority();
    }
    else if(this.Sortcon){
      this.sortBycon();
      this.Sortcon=false;
    }
    else if(this.Sortsub){
     this.sortBysub();
     this.Sortsub=false;
    }
    else if(this.SortRevPrio){
      this.SortByRevPrio();
      this.SortRevPrio=false;
     }
     else if(this.Recent){
      this.refresh();
      this.Recent=false;
     }
  }
  
  searchMessages(){
    if(this.searchBody){
         this.searchBycon();
         this.searchBody=false;
    }
    else if(this.searchTo){
        this.searchByRec()
        this.searchTo=false;
    }
    else if(this.searchSub){
       this.searchBysub();
       this.searchSub=false;
    }
  }
   onlyOne(id:string) {
    
    var checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item:any) => {
        if (item.id != id) {item.checked = false}
    })
}
onlyOne2(id:string) {
    
  var checkboxes = document.getElementsByName('check2')
  checkboxes.forEach((item:any) => {
      if (item.id != id) {item.checked = false}
  })
}
searchByRec(){
  this.emailServe.searchSentEmailByReceiver(this.user.email,this.key).subscribe(
    (Response: Email[]) =>{
      this.emails = Response;
    }
  )
}
searchBycon(){
  this.emailServe.searchSentMailsByContext(this.user.email,this.key).subscribe(
    (Response: Email[]) =>{
      this.emails = Response;
    }
  )
}
searchBysub(){
  this.emailServe.searchSentMailsBySubject(this.user.email,this.key).subscribe(
    (Response: Email[]) =>{
      this.emails = Response;
    }
  )
}
sortBycon(){
  this.emailServe.getSentEmailsByContext(this.user.email).subscribe(
    (Response: Email[]) =>{
      this.emails = Response;
    }
  )
}
sortBysub(){
  this.emailServe.getSentEmailsBySubject(this.user.email).subscribe(
    (Response: Email[]) =>{
      this.emails = Response;
    }
  )
}
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
addtoFolder(){
  for(let i=0;i<this.arrSelect.length;i++){
  let folders:String[]=[];
  this.emailServe.getUserFolders(this.user.email).subscribe(
    (Response: String[]) =>{
      folders = Response
      console.log(folders)
    }
  )
  this.emailServe.addEmailToFolderOfSender(this.arrSelect[i], this.folderName).subscribe(
    (Response: any)=>{
      
    }
  )
}
}
SortByRevPrio(){
  this.emailServe.getPrioritySentMails(this.user.email).subscribe(
    (Response: Email[]) =>{
      console.log("Sent")
      this.emails = Response.reverse();
    }
  )
  this.SortRevPrio=false;

}
  send(){
    this.router.navigate([`/send`], { relativeTo: this.route });
  }
  inbox(){
    this.router.navigate([`/inbox`], { relativeTo: this.route });
  }
  contacts(){
    this.router.navigate([`/contacts`], { relativeTo: this.route });
  }
  draft(){
    this.router.navigate([`/draft`], { relativeTo: this.route });
  }
  bin(){
    this.router.navigate([`/bin`], { relativeTo: this.route });
  }
  search(){
    this.router.navigate([`/search`], { relativeTo: this.route });
  }
  deleteEmail(){
    for(let i=0;i<this.arrSelect.length;i++){
    console.log("delete",this.arrSelect[i]);
    if(this.p==this.totalemails){
      this.p=this.totalemails-1;
    }
    this.emailServe.deleteMessageSender(this.arrSelect[i]).subscribe(
      (Response: any) => {
        this.emailServe.getSentMails(this.user.email).subscribe(
          (response: Email[]) =>{
            this.emails = response
            this.totalemails=this.emails.length;
          }
        )
      }
    )
  }
}
@ViewChild('myDisplay') myDisp!: ElementRef;
  on(email:Email) {
    this.selectEmail=email;
    this.myDisp.nativeElement.style.display = 'block';

  }
  off(){
    this.myDisp.nativeElement.style.display = 'none';
  }
  profile(){
    this.router.navigate([`/profile`], { relativeTo: this.route });
  }
  folder(){
    this.router.navigate([`/Myfolders`], { relativeTo: this.route });
  }
}

