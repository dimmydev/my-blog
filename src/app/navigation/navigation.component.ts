import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../login/login.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  ulogovan = false;
  private userSub: Subscription;
  prikaziNaKlik = true;

  constructor(private ruter: Router, private loginServis: LoginService) {
  }

  ngOnInit() {
    this.userSub = this.loginServis.user.subscribe(user => {
      this.ulogovan = !user ? false : true;
    });
  }

  onNewPost() {
    this.ruter.navigate(['/posts/new']);
  }

  onLogout() {
    this.loginServis.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
