import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Email } from '../email.module';
import { emailService } from '../emailservice.service';
import { User } from '../user.module';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  user:User = User.getInstance();
  searchText: String = '';
  contactName: String = ''
  searchedUsers: User[] = []
  status: String = ""
  searchName!:string;
  searchEmail!:string;
  constructor(private router: Router, private route: ActivatedRoute, private emailServe: emailService){}
  search(){
    this.emailServe.search(this.searchText).subscribe(
      (Response: User[]) => {
        this.searchedUsers = Response
      }
    )
  }
  addToExistingContact(userEmail: String){
    this.emailServe.addContactEmail(this.user.email, this.contactName, userEmail).subscribe(
      (Response: Email) => {
        this.status = Response.sender
      }
    )
  }
  addToNewContact(userEmail: String){
    this.emailServe.addContact(this.user.email, this.contactName, userEmail).subscribe(
      (Response: Email) => {
        this.status = Response.sender
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
  onlyOne2(id:string) {
    
    var checkboxes = document.getElementsByName('check2')
    checkboxes.forEach((item:any) => {
        if (item.id != id) {item.checked = false}
    })
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
  folder(){
    this.router.navigate([`/Myfolders`], { relativeTo: this.route });
  }
}
