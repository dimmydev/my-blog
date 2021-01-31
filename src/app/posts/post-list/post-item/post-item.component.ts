import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../post.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() index: number;

  ngOnInit(): void {
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
