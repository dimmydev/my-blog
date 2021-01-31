import {Injectable, Input} from '@angular/core';
import {Post} from './post.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../login/login.service';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  postoviChanged = new Subject<Post[]>();

  private postovi: Post[] = [];

  constructor(private http: HttpClient, private loginServis: LoginService) { }

  setPosts(postovi: Post[]) {
    this.postovi = postovi;
    this.postoviChanged.next(this.postovi);
  }

  getPosts() {
    return this.postovi;
  }

  getPost(id: number) {
    return this.postovi[id];
  }

  sacuvajPromene(korisnik) {
    this.http.put('https://my-blog-862ce.firebaseio.com/posts.json?auth=' + korisnik.token, this.postovi).subscribe(response => {
      console.log(response);
    }, error => {
      console.log('Greska sa bazom. Pokusajte kasnije.');
    });
  }

  dodajPost(post: Post) {
    const postoviNew: Post[] = [];
    const korisnik = this.loginServis.user.value;
    if (korisnik) {
      postoviNew.push(post);
      if (this.postovi != null) {
        for (const p of this.postovi) {
          postoviNew.push(p);
        }
      }

      this.postovi = postoviNew;
      this.postoviChanged.next(this.postovi);
      this.sacuvajPromene(korisnik);
    } else {
      alert('You are not authorized to create posts!');
    }
  }

  azurirajPost(index: number, noviPost: Post) {
    const korisnik = this.loginServis.user.value;
    if (korisnik) {
      this.postovi[index] = noviPost;
      this.postoviChanged.next(this.postovi);
      this.sacuvajPromene(korisnik);
    } else {
      alert('You are not authorized to update posts!');
    }
  }

  izbrisiPost(index: number) {
    const korisnik = this.loginServis.user.value;
    if (korisnik) {
      this.postovi.splice(index, 1);
      this.sacuvajPromene(korisnik);
    } else {
      alert('You are not authorized to delete posts!');
    }
  }
}
