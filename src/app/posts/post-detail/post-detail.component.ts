import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../post.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../post.service';
import {Subscription} from 'rxjs';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: Post;
  id: number;

  ulogovan = false;
  private userSub: Subscription;

  constructor(private postServis: PostService, private ruta: ActivatedRoute, private ruter: Router, private loginServis: LoginService) { }

  ngOnInit() {

    this.userSub = this.loginServis.user.subscribe(user => {
      this.ulogovan = !user ? false : true;
    });

    this.id = this.ruta.snapshot.params.id;
    this.post = this.postServis.getPost(this.id);
  }

  onEditRecipe() {
    this.ruter.navigate(['edit'], { relativeTo: this.ruta });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  vremeZaCitanje(sadrzaj: string) {
    const reciUMinuti = 200;
    const brojReci = sadrzaj.split(' ').length;
    // if (brojReci > 0) {
    const brojMinuta = Math.ceil(brojReci / reciUMinuti);
    if (brojMinuta === 1) {
        return brojMinuta + ' min read';
      } else {
        return brojMinuta + ' mins read';
      }
    // }
  }
}
