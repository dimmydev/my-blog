import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Post} from './post.model';
import {DataStorageService} from '../shared/data-storage.service';
import {PostService} from './post.service';

@Injectable({
  providedIn: 'root'
})
export class PostsResolverService implements Resolve<Post[]> {

  constructor(private dataStorageServis: DataStorageService, private postServis: PostService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const postovi = this.postServis.getPosts();

    if (postovi.length === 0) {
      return this.dataStorageServis.dohvatiPostove();
    } else {
      return postovi;
    }
  }
}

