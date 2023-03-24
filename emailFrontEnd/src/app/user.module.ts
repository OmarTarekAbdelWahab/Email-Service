import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Email } from './email.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class User{
  email: String = "";
  firstName: String = "";
  lastName: String = "";
  joinDate: String = "";
  password: String = "";
  draftEmail: Email = new Email;
  isDraft: boolean = false
  currentFolderName: String = ''
  private static user: User;
  private constructor(){}
  public static getInstance():User
  {
    if(this.user == null){
      this.user = new User
      return this.user;
    }
    return this.user;
  }
}
