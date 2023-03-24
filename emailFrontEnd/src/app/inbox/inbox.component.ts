import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from '../email.module';
import { emailService } from '../emailservice.service';
import { User } from '../user.module';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent  {
  emails: Email[] = [];
  user:User = User.getInstance();
  Sortprio !:false;
  Sortcon !:false;
  Sortsub !:false;
  searchSub=false;
  searchTo=false;
  searchFrom=false;
  searchBody=false;
  p:number=1;
  key!:string
  emailsperpage:number=6;
  totalemails:any=0;
  link!: string;
  folderName!:string;
  SortRevPrio=false;
  Recent=false;
  firstLink: any;
  secondLink: any;
  thirdLink: any;
  fourthLink: any;
  fifthLink: any;
  sixthLink: any;
  selected:boolean=false;
  selectEmail:Email=new Email();
  arrSelect:Email[]=[];
  constructor(private router: Router, private route: ActivatedRoute, private emailServe: emailService){
    emailServe.getRecMails(this.user.email).subscribe(
      (response: Email[]) =>{
        this.emails = response
        this.totalemails=this.emails.length;
        //console.log(this.emails[1].context)
      }
    )
    
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
    this.emailServe.getRecMails(this.user.email).subscribe(
      (response: Email[]) =>{
        this.emails = response
        this.totalemails=this.emails.length;
        //console.log(this.emails[1].context)
      }
    )
    this.arrSelect=[];
  }
  @ViewChild('myDisplay') myDisp!: ElementRef;
  on(email:Email) {
    this.selectEmail=email;
    this.myDisp.nativeElement.style.display = 'block';

  }
  off(){
    this.myDisp.nativeElement.style.display = 'none';
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
    this.emailServe.getPriorityRecMails(this.user.email).subscribe(
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
    else if(this.searchFrom){
        this.searchBysender()
        this.searchFrom=false;
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
searchBysender(){
  this.emailServe.searchRecEmailBySender(this.user.email,this.key).subscribe(
    (Response: Email[]) =>{
      this.emails = Response;
    }
  )
}
searchBycon(){
  this.emailServe.searchRecMailsByContext(this.user.email,this.key).subscribe(
    (Response: Email[]) =>{
      this.emails = Response;
    }
  )
}
searchBysub(){
  this.emailServe.searchRecMailsBySubject(this.user.email,this.key).subscribe(
    (Response: Email[]) =>{
      this.emails = Response;
    }
  )
}
sortBycon(){
  this.emailServe.getRecEmailsByContext(this.user.email).subscribe(
    (Response: Email[]) =>{
      this.emails = Response;
    }
  )
}
sortBysub(){
  this.emailServe.getRecEmailsBySubject(this.user.email).subscribe(
    (Response: Email[]) =>{
      this.emails = Response;
    }
  )
}
SortByRevPrio(){
  this.emailServe.getPriorityRecMails(this.user.email).subscribe(
    (Response: Email[]) =>{
      console.log("Sent")
      this.emails = Response.reverse();
    }
  )
  this.SortRevPrio=false;

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
deleteAttachment(num:String,email:Email,id:String){
  this.emailServe.deleteAttachment(this.user.email, email,num).subscribe(

  )
  document.getElementById(String(id))!.style.display="none";

}

addtoFolder(){
  for(let i=0;i<this.arrSelect.length;i++){
  let folders:String[]=[];
  this.emailServe.getUserFolders(this.user.email).subscribe(
    (Response: String[]) =>{
      folders = Response
      console.log("getUserFolders")
    }
  )
  this.emailServe.addEmailToFolderOfReceiver(this.arrSelect[i], this.folderName).subscribe(
    (Response: any)=>{
      console.log("addEmailToFolderOfReceiver")
    }
  )
}
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
  search(){
    this.router.navigate([`/search`], { relativeTo: this.route });
  }
  delete(){
      for(let i=0;i<this.arrSelect.length;i++){
        console.log("delete",this.arrSelect[i]);
    this.emailServe.deleteMessageReceiver(this.arrSelect[i]).subscribe(
      (Response: any) => {
        this.emailServe.getRecMails(this.user.email).subscribe(
          (response: Email[]) =>{
            this.emails = response
            //console.log(this.emails[1].context)
            this.totalemails=this.emails.length;
          }
        )
      }
    )
    }
  }
  draft(){
    this.router.navigate([`/draft`], { relativeTo: this.route });
  }
  profile(){
    this.router.navigate([`/profile`], { relativeTo: this.route });
  }
  folder(){
    this.router.navigate([`/Myfolders`], { relativeTo: this.route });
  }
}
