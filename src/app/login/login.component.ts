import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string = null;

  constructor(private loginServis: LoginService, private ruter: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.loginServis.login(email, password).subscribe(podaci => {
      console.log(podaci);
      this.ruter.navigate(['/posts']);
    }, errorPoruka => {
      console.log(errorPoruka + 'proba');
      this.error = errorPoruka;
    });
    form.reset();
  }
}
