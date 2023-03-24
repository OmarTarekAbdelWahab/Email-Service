import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { emailService } from '../emailservice.service';
import { User } from '../user.module';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  input!: HTMLInputElement | null;
  username!: HTMLInputElement | null;
  name!: string | undefined;
  lastname!: HTMLInputElement | null;
  name2!: string | undefined;
  email!: string | undefined;
  input2!: HTMLInputElement | null;
  password: string | undefined;
  email_error!: HTMLElement | null;
  pass_error!: HTMLElement | null;
  name1_error!: HTMLElement | null;
  name2_error!: HTMLElement | null;


  constructor(private router: Router, private route: ActivatedRoute, private emailServe: emailService) {}
  public validated() {
    this.input = document.getElementById('email') as HTMLInputElement | null;
    this.email = this.input?.value;
    this.username = document.getElementById('name1') as HTMLInputElement | null;
    this.name = this.username?.value;
    this.lastname = document.getElementById('name2') as HTMLInputElement | null;
    this.name2 = this.lastname?.value;
    this.input2 = document.getElementById('password') as HTMLInputElement | null;
    this.password = this.input2?.value;

    this.email_error = document.getElementById('email_error');
    this.pass_error = document.getElementById('pass_error');
    this.name1_error = document.getElementById('name1_error');
    this.name2_error = document.getElementById('name2_error');
    
    if (this.name!.length < 1) {
      this.username!.style.border = "1px solid red";
      this.name1_error!.style.display = "block";
      this.username!.focus();
      return false;
    }
    this.name1_error!.style.display = "none";
    if (this.name2!.length < 1) {
      this.lastname!.style.border = "1px solid red";
      this.name2_error!.style.display = "block";
      this.lastname!.focus();
      return false;
    }
    this.name2_error!.style.display = "none";
    if (this.email!.length < 9) {
      this.input!.style.border = "1px solid red";
      this.email_error!.style.display = "block";
      this.input!.focus();
      return false;
    }
    this.email_error!.style.display = "none";
    if (this.password!.length < 5) {
      this.input2!.style.border = "1px solid red";
      this.pass_error!.style.display = "block";
      this.input2!.focus();
      return false;
    }
    else{
    let u:User;
    u = User.getInstance()
    u.email = String(this.email)
    u.firstName = String(this.name)
    u.lastName = String(this.name2)
    u.password = String(this.password)
    u.joinDate = " "
    this.emailServe.register(u).subscribe(
      (Response: User) => {
        if(Response.email == "User Already Registered"){
          alert(Response.email)
          return false
        }else if(Response.email == "Invalid Email"){
          alert(Response.email)
          return false
        }
        u.joinDate = Response.joinDate
        console.log(u)
        alert(Response.email)
        console.log(Response.email)
        this.pass_error!.style.display = "none";
        this.router.navigate([`/inbox`], { relativeTo: this.route });
        return true;
      }
    )
    return
    }

  }


}
