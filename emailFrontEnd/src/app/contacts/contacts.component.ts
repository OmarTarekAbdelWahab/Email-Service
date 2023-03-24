import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.module';
import { Email } from '../email.module';
import { emailService } from '../emailservice.service';
import { User } from '../user.module';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  
  contactEmail:String = '';
  contactName:String = '';
  Status: String = '';
  user: User = User.getInstance();
  contacts: Contact[] = []
  editShow=false;
  d!:HTMLElement|null;
  isSorted: boolean = false
  constructor(private router: Router, private route: ActivatedRoute, private emailServe: emailService){
    this.isSorted = false
    this.getAllContacts()
  }
  getAllContacts(){
    if(!this.isSorted){
      this.emailServe.getContacts(this.user.email).subscribe(
        (Response: Contact[]) => {
          this.contacts = Response;
          console.log("contacts: ", this.contacts)
        }
      )
    }else{
      this.emailServe.getSortedContacts(this.user.email).subscribe(
        (Response: Contact[]) => {
          this.contacts = Response;
          console.log("contacts: ", this.contacts)
        }
      )
    }
  }
  getSortedContacts(){
    this.isSorted = true
    this.getAllContacts()
  }
 
  edit(){
     this.editShow=!this.editShow;
  }
  sendAdd(){
    console.log(this.contactEmail);
    this.emailServe.addContact(this.user.email, this.contactName, this.contactEmail).subscribe(
      (Response: Email) =>{
        this.Status = Response.sender
        this.getAllContacts()
      }
    )
  }
  onKey(event: any){
    this.addedEmail = event.target.value;
  }
  addedEmail: String = '';
  addEmail(contact: String){
    this.emailServe.addContactEmail(this.user.email, contact, this.addedEmail).subscribe(
      (Response: Email) =>{
        this.Status = Response.sender
        this.getAllContacts()
      }
    )
  }
  deleteContact(contact:String){
    this.emailServe.deleteContact(this.user.email, contact).subscribe(
      (Response: any) =>{
        this.getAllContacts()
      }
    )
  }
  deleteEmail(email: String, contact: String){
    this.emailServe.deleteContactEmail(this.user.email, contact, email).subscribe(
      (Response: any) =>{
        this.getAllContacts()
      }
    )
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
  bin(){
    this.router.navigate([`/bin`], { relativeTo: this.route });
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
