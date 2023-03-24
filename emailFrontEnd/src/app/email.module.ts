import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Email {
  sender !: String;
  receiver !: String;
  context !: String;
  date !: String;
  subject !: String;
  sentDelete: String = "No";
  recDelete: String = "No";
  priority: String = '1';
  folderSender!: string;
  folderRec!: string;
  firstLink!: string;
  secondLink!: string;
  thirdLink!: string;
  fourthLink!: string;
  fifthLink!: string;
  sixthLink!: string;
}
