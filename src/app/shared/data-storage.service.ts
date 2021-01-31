import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostService} from '../posts/post.service';
import {Post} from '../posts/post.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  error = null;

  constructor(private http: HttpClient, private postServis: PostService) { }

  dohvatiPostove() {
    return this.http.get<Post[]>('https://my-blog-862ce.firebaseio.com/posts.json'
    ).pipe(tap(postovi => {
      this.postServis.setPosts(postovi);
    }));
  }
}
