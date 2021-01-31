import { Injectable } from '@angular/core';
import {Contact} from './contact.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sacuvajKontakt(contact: Contact) {
    return this.http.post('https://my-blog-862ce.firebaseio.com/contacts.json', contact);
  }
}
