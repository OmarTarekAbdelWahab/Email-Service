import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from '../email.module';
import { emailService } from '../emailservice.service';
import { User } from '../user.module';

@Component({
  selector: 'app-myfolders',
  templateUrl: './myfolders.component.html',
  styleUrls: ['./myfolders.component.css']
})
export class MyfoldersComponent  {
  user: User = User.getInstance()
  constructor(private router: Router, private route: ActivatedRoute, private emailServe: emailService){
    MyfoldersComponent.folders = [
      {name: 'New Folder', visible: false, emails: [] },
      {name: 'New Folder', visible: false, emails: [] },
      {name: 'New Folder', visible: false, emails: [] },
      {name: 'New Folder', visible: false, emails: [] },
      {name: 'New Folder', visible: false, emails: [] },
      {name: 'New Folder', visible: false, emails: [] },
      {name: 'New Folder', visible: false, emails: [] },
      {name: 'New Folder', visible: false, emails: [] },
      {name: 'New Folder', visible: false, emails: [] },
      {name: 'New Folder', visible: false, emails: [] },
      {name: 'New Folder', visible: false, emails: [] },
      {name: 'New Folder', visible: false, emails: [] }
    ]
     this.setfolder();

  }
  static folders: any[] = []
  setfolder(){
      this.emailServe.getUserFolders(this.user.email).subscribe(
        (Response: String[]) => {
          console.log("Folders' names: ", Response)
          for (let i = 0 ;i < Response.length;i++){
            this.emailServe.getMessagesInFolder(this.user.email, Response[i]).subscribe(
              (Response2: Email[]) =>{
                MyfoldersComponent.folders[i].name = Response[i]
                MyfoldersComponent.folders[i].emails = Response2[i]
                MyfoldersComponent.folders[i].visible = true
                console.log("Static array: "+MyfoldersComponent.folders)
              }
            )
          }
        }
      )
  }
  @ViewChild('myDisplay') myDisp!: ElementRef;
  name:string="New Folder";
  static paste = false;
  static emails:Email[] = [];
  isDeleting: boolean = false;

  newFolder(name: string){
    for (let index = 0; index < MyfoldersComponent.folders.length; index++) {
      if (!MyfoldersComponent.folders[index].visible){
        MyfoldersComponent.folders[index].visible = true;
        MyfoldersComponent.folders[index].name = name;
        break;
      }
    }
  }
  delete(){
    this.isDeleting = !this.isDeleting;
  }

  action(index: number, folderName: String){
    console.log("Folder Name: ", folderName)
    this.user.currentFolderName = folderName
    if(this.isDeleting){
      MyfoldersComponent.folders[index].emails = [];
      MyfoldersComponent.folders[index].visible = false;
      this.emailServe.deleteFolder(this.user.email, MyfoldersComponent.folders[index].name).subscribe(
        (Response: any) =>{
          
        }
      )
    }
    else if(MyfoldersComponent.paste){
      MyfoldersComponent.paste = false;
      MyfoldersComponent.folders[index].emails = MyfoldersComponent.emails;
     //GetEmails.folderEmails = this.folders[index].emails;
      this.router.navigate(['folder']);
    }
    else {
     // GetEmails.folderEmails = this.folders[index].emails;
      this.router.navigate(['folder']);
    }
  }

  on() {
    this.name = "New Folder";
    this.myDisp.nativeElement.style.display = 'block';

  }
  off(){
    this.newFolder(this.name);
    this.myDisp.nativeElement.style.display = 'none';
  }

  getFolders(){
    return MyfoldersComponent.folders;
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
}
