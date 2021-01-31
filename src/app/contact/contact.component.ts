import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import {Contact} from './contact.model';
import {ContactService} from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    trigger('obavestenjeSuccess', [
      transition('void => *', [
        animate(2000, keyframes([
          style({
            transform: 'scale3d(0.3, 0.3, 0.3)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'scale3d(1, 1, 1)',
            opacity: 1,
            offset: 0.5
          }),
          style({
             transform: 'scale3d(1, 1, 1)',
             opacity: 1,
             offset: 1
          })
        ]))
      ])
    ]),
    trigger('obavestenjeAlert', [
      transition('void => *', [
        animate(1200, keyframes([
          style({
            transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
            animationTimingFunction: 'ease-in',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
            animationTimingFunction: 'ease-in',
            opacity: 1,
            offset: 0.4
          }),
          style({
            transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
            animationTimingFunction: 'ease',
            opacity: 1,
            offset: 0.6
          }),
          style({
            transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)',
            animationTimingFunction: 'ease',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'perspective(400px)',
            animationTimingFunction: 'ease',
            opacity: 1,
            offset: 1
          })
        ]))
      ])
    ])
  ]
})

export class ContactComponent implements OnInit {
  status = false;
  tekstName = null;
  tekstEmail = null;
  tekstPhone = null;
  tekstMessage = null;

  korisnik: Contact = {
    name: '',
    email: '',
    phone: '',
    message: '',
    date: null
  };

  stateSuccess = 'no';
  stateError = 'no';

  sabmitovano = false;
  nijeSabmitovano = false;

  constructor(private contactServis: ContactService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.korisnik.name = form.value.name;
    this.korisnik.email = form.value.email;
    this.korisnik.phone = form.value.phone;
    this.korisnik.message = form.value.message;
    this.korisnik.date = new Date();

    this.contactServis.sacuvajKontakt(this.korisnik).subscribe(() => {
      console.log(form.value);
      this.stateSuccess === 'no' ? this.stateSuccess = 'yes' : this.stateSuccess = 'no';
      this.sabmitovano = true;
    }, error => {
      this.stateError === 'no' ? this.stateError = 'yes' : this.stateError = 'no';
      this.nijeSabmitovano = true;
      console.log('Greska sa serverom. Pokusajte kasnije');
    });
  }
}
