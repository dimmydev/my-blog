import {Component, OnInit} from '@angular/core';
import {DataStorageService} from './shared/data-storage.service';
import {LoginService} from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataStorageServis: DataStorageService, private loginServis: LoginService) {}

  ngOnInit() {
    this.dataStorageServis.dohvatiPostove().subscribe();
    this.loginServis.autoLogin();
  }
}
