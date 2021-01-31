import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginServis: LoginService, private ruter: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginServis.user.pipe(take(1), map(user => {
      const ulogovan = !!user;
      if (ulogovan) {
        return true;
      }
      return this.ruter.createUrlTree(['/posts']);
    }));
  }
}
