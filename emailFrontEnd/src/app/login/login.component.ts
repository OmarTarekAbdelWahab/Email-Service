import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { emailService } from '../emailservice.service';
import { User } from '../user.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  input!: HTMLInputElement | null;
  email!: string | undefined;
  input2!: HTMLInputElement | null;
  password: string | undefined;
  email_error!: HTMLElement | null;
  pass_error!: HTMLElement | null;

  constructor(private router: Router, private route: ActivatedRoute, private emailServe: emailService) {

  }
  public signUp() {
    this.router.navigate([`/signup`], { relativeTo: this.route });

  }

  public validated() {
    this.input = document.getElementById('email') as HTMLInputElement | null;
    this.email = this.input?.value;
    this.input2 = document.getElementById('password') as HTMLInputElement | null;
    this.password = this.input2?.value;

    this.email_error = document.getElementById('email_error');
    this.pass_error = document.getElementById('pass_error');

    if (this.email!.length < 9) {
      this.input!.style.border = "1px solid red";
      this.email_error!.style.display = "block";
      this.input!.focus();
      return false;
    }
    if (this.password!.length < 5) {
      this.email_error!.style.display = "none";
      this.input2!.style.border = "1px solid red";
      this.pass_error!.style.display = "block";
      this.input2!.focus();
      return false;
    }
    else{
      let u:User = User.getInstance();
      console.log("email: ", this.email, "\npassword: ", this.password);
      this.emailServe.logIn(String(this.email), String(this.password)).subscribe(
        (Response: User) => {
          if(Response.email == "Email doesn't exist"){
            alert( Response.email)
            return false
          }else if(Response.email == "Wrong Password"){
            alert( Response.email)
            return false
          }
          u.email = Response.email;
          u.firstName = Response.firstName;
          u.lastName = Response.lastName;
          u.joinDate = Response.joinDate;
          u.password = Response.password;
          console.log("Name: ", u.firstName, u.lastName)
          this.pass_error!.style.display = "none";
          this.router.navigate([`/inbox`], { relativeTo: this.route });
            return true;
        }
      )
      return
  }

  }

}
