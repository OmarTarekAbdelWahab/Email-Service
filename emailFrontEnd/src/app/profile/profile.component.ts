import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { emailService } from '../emailservice.service';
import { User } from '../user.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private router: Router, private route: ActivatedRoute, private emailServe: emailService) { }
  user: User = User.getInstance();
  name = this.user.firstName
  name2 = this.user.lastName
  email = this.user.email
  password = this.user.password
  date = this.user.joinDate;
  newName: String = "";
  changeName() {
    this.newName = this.newName.replace(/\s\s+/g, " ")
    console.log("New After Split: ", this.newName)
    let name = this.newName.split(" ")
    if (name.length == 2 || name.length > 2) {
      console.log("new name: \nFirst Name: ", name[0], " Last Name: ", name[1])
      this.emailServe.changeUserName(this.user.email, name[0], name[1]).subscribe(
        (Response: any) => {
          this.user.firstName = name[0]
          this.user.lastName = name[1]
          this.name = name[0]
          this.name2 = name[1]
        }
      )
    }
  }
  sent() {
    this.router.navigate([`/sentEmails`], { relativeTo: this.route });
  }
  send() {
    this.router.navigate([`/send`], { relativeTo: this.route });
  }
  contacts() {
    this.router.navigate([`/contacts`], { relativeTo: this.route });
  }
  bin() {
    this.router.navigate([`/bin`], { relativeTo: this.route });
  }
  search() {
    this.router.navigate([`/search`], { relativeTo: this.route });
  }
  draft() {
    this.router.navigate([`/draft`], { relativeTo: this.route });
  }
  login() {
    this.router.navigate([`/login`], { relativeTo: this.route });
  }
  inbox() {

    this.router.navigate([`/inbox`], { relativeTo: this.route });
  }
  folder() {
    this.router.navigate([`/Myfolders`], { relativeTo: this.route });
  }
}
