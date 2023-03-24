import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from './contact.module';
import { Email } from './email.module';
import { User } from './user.module';

@Injectable({
  providedIn: 'root'
})
export class emailService {

  private baseURL: string = "http://localhost:8080/";
  constructor(private http: HttpClient) { }
  public sendEmail(mail: Email): Observable<Email> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(mail);
    return this.http.post<Email>(this.baseURL + "send", body, { 'headers': headers });
  }
  public getRecMails(email: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post<Email[]>(this.baseURL + "getRecMails", { "email": email }, { 'headers': headers });
  }

  public getSentMails(email: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + "getSentMails", { "email": email }, { 'headers': headers });
  }

  public register(user: User): Observable<User> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);
    return this.http.post<User>(this.baseURL + 'register', body, { 'headers': headers })
  }
  public logIn(email: String, password: String): Observable<User> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<User>(this.baseURL + 'login', { "email": email, "password": password }, { 'headers': headers })
  }
  public addContact(userEmail: String, contactName: String, contactEmail: String): Observable<Email> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email>(this.baseURL + 'addContact', { "userEmail": userEmail, "contactName": contactName, "contactEmail": contactEmail }, { 'headers': headers })
  }
  public getContacts(email: String): Observable<Contact[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Contact[]>(this.baseURL + 'getContacts', { "email": email }, { 'headers': headers })
  }
  public getSortedContacts(email: String): Observable<Contact[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Contact[]>(this.baseURL + 'getSortedContacts', { "email": email }, { 'headers': headers })
  }
  public addContactEmail(userEmail: String, contactName: String, contactEmail: String): Observable<Email> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email>(this.baseURL + 'addContactEmail', { "userEmail": userEmail, "contactName": contactName, "contactEmail": contactEmail }, { 'headers': headers })
  }
  public deleteContact(userEmail: String, contactName: String): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<any>(this.baseURL + 'deleteContact', { "userEmail": userEmail, "contactName": contactName }, { 'headers': headers })
  }
  public deleteContactEmail(userEmail: String, contactName: String, contactEmail: String): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<any>(this.baseURL + 'deleteContactEmail', { "userEmail": userEmail, "contactName": contactName, "contactEmail": contactEmail }, { 'headers': headers })
  }
  public deleteMessageSender(email: Email): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(email);
    return this.http.post<any>(this.baseURL + 'deleteMessageSender', body, { 'headers': headers })
  }
  public deleteMessageReceiver(email: Email): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(email);
    return this.http.post<any>(this.baseURL + 'deleteMessageReceiver', body, { 'headers': headers })
  }
  public getDeletedMessages(userEmail: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'getDeletedMessages', { "userEmail": userEmail }, { 'headers': headers })
  }
  public restoreSenderMessage(email: Email): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(email);
    return this.http.post<any>(this.baseURL + 'restoreSenderMessage', body, { 'headers': headers })
  }
  public restoreReceiverMessage(email: Email): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(email);
    return this.http.post<any>(this.baseURL + 'restoreReceiverMessage', body, { 'headers': headers })
  }
  public getPrioritySentMails(email: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'getPrioritySentMails', { "email": email }, { 'headers': headers })
  }
  public getPriorityRecMails(email: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'getPriorityRecMails', { "email": email }, { 'headers': headers })
  }
  public addDraft(email: Email): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(email);
    return this.http.post<any>(this.baseURL + 'addDraft', body, { 'headers': headers })
  }
  public getDrafts(userEmail: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'getDrafts', { "userEmail": userEmail }, { 'headers': headers })
  }
  public deleteDraft(email: Email): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(email);
    return this.http.post<any>(this.baseURL + 'deleteDraft', body, { 'headers': headers })
  }
  public search(searchKey: String): Observable<User[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<User[]>(this.baseURL + 'search', { "searchKey": searchKey }, { 'headers': headers })
  }
  public getSentEmailsByContext(email: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'getSentEmailsByContext', { "email": email }, { 'headers': headers })
  }
  public getRecEmailsByContext(email: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'getRecEmailsByContext', { "email": email }, { 'headers': headers })
  }
  public getSentEmailsBySubject(email: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'getSentEmailsBySubject', { "email": email }, { 'headers': headers })
  }
  public getRecEmailsBySubject(email: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'getRecEmailsBySubject', { "email": email }, { 'headers': headers })
  }
  public searchSentMailsByContext(email: String, searchKey: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'searchSentMailsByContext', { "email": email, "searchKey": searchKey }, { 'headers': headers })
  }
  public searchRecMailsByContext(email: String, searchKey: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'searchRecMailsByContext', { "email": email, "searchKey": searchKey }, { 'headers': headers })
  }
  public searchSentMailsBySubject(email: String, searchKey: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'searchSentMailsBySubject', { "email": email, "searchKey": searchKey }, { 'headers': headers })
  }
  public searchRecMailsBySubject(email: String, searchKey: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'searchRecMailsBySubject', { "email": email, "searchKey": searchKey }, { 'headers': headers })
  }
  public searchRecEmailBySender(email: String, searchKey: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'searchRecEmailBySender', { "email": email, "searchKey": searchKey }, { 'headers': headers })
  }
  public searchSentEmailByReceiver(email: String, searchKey: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'searchSentEmailByReceiver', { "email": email, "searchKey": searchKey }, { 'headers': headers })
  }
  public getUserFolders(email: String): Observable<String[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<String[]>(this.baseURL + 'getUserFolders', { "email": email }, { 'headers': headers })
  }
  public addEmailToFolderOfSender(message: Email, folderName: String): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(message);
    return this.http.post<any>(this.baseURL + 'addEmailToFolderOfSender/' + folderName, body, { 'headers': headers })
  }
  public addEmailToFolderOfReceiver(message: Email, folderName: String): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(message);
    return this.http.post<any>(this.baseURL + 'addEmailToFolderOfReceiver/' + folderName, body, { 'headers': headers })
  }
  public removeEmailFromFolderOfSender(message: Email): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(message);
    return this.http.post<any>(this.baseURL + 'removeEmailFromFolderOfSender', body, { 'headers': headers })
  }
  public removeEmailFromFolderOfReceiver(message: Email): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(message);
    return this.http.post<any>(this.baseURL + 'removeEmailFromFolderOfReceiver', body, { 'headers': headers })
  }
  public getMessagesInFolder(userEmail: String, folderName: String): Observable<Email[]> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<Email[]>(this.baseURL + 'getMessagesInFolder', { "userEmail": userEmail, "folderName": folderName }, { 'headers': headers })
  }
  public deleteFolder(userEmail: String, folderName: String): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<any>(this.baseURL + 'deleteFolder', { "userEmail": userEmail, "folderName": folderName }, { 'headers': headers })
  }
  public renameFolder(userEmail: String, oldFolderName: String, newFolderName: String): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<any>(this.baseURL + 'renameFolder', { "userEmail": userEmail, "oldFolderName": oldFolderName, "newFolderName": newFolderName }, { 'headers': headers })
  }
  public deleteAttachment(userName: String, email: Email, attachmentNumber: String): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(email)
    return this.http.post<any>(this.baseURL + 'deleteAttachment/' + userName + "/" + attachmentNumber, body, { 'headers': headers })
  }
  public permanentlyDeleteMessage(email: Email, side: String): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(email)
    return this.http.post<any>(this.baseURL + 'permanentlyDeleteMessage/' + side, body, { 'headers': headers })
  }
  public changeUserName(userEmail: String, newFirstName: String, newLastName: String): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post<any>(this.baseURL + 'changeUserName', { "userEmail": userEmail, "newFirstName": newFirstName, "newLastName": newLastName }, { 'headers': headers })
  }
}
