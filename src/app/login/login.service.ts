import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

interface LoginResponseData {
  idToken: string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered:	boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private ruter: Router) {}

  login(email: string, password: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.post<LoginResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey,
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(errorResponse => {
      let errorPoruka = 'An unknown error occurred!';
      if (!errorResponse.error || !errorResponse.error.error) {
        return throwError(errorPoruka);
      }
      switch (errorResponse.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorPoruka = 'There is no user with this email.';
          break;
        case 'INVALID_PASSWORD':
          errorPoruka = 'The password is invalid.';
          break;
      }
      return throwError(errorPoruka);
    }), tap(responseData => {
      const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
      const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
      this.user.next(user);
      this.autoLogout(+responseData.expiresIn * 1000);
      localStorage.setItem('korisnik', JSON.stringify(user));
    }));
  }

  autoLogin() {
    const korisnik: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('korisnik'));
    if (!korisnik) {
      return;
    }
    const ulogovaniKorisnik = new User(korisnik.email, korisnik.id, korisnik._token, new Date(korisnik._tokenExpirationDate));

    if (ulogovaniKorisnik.token) {
      this.user.next(ulogovaniKorisnik);
      const expirationDuration = new Date(korisnik._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.ruter.navigate(['/login']);
    localStorage.removeItem('korisnik');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
