import {Component, OnInit} from '@angular/core';
import {Post} from '../post.model';
import {PostService} from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  postovi: Post[];

  constructor(private postServis: PostService) { }

  ngOnInit(): void {
    this.postServis.postoviChanged.subscribe(
      (postovi: Post[]) => {
        this.postovi = postovi;
      }
    );
    this.postovi = this.postServis.getPosts();
  }
}
