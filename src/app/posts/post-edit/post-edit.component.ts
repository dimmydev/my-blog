import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  id: number;
  editMode = false;
  forma: FormGroup;

  prikaz = '';

  constructor(private ruta: ActivatedRoute, private postServis: PostService, private ruter: Router) { }

  ngOnInit() {
    this.id = this.ruta.snapshot.params.id;
    this.editMode = this.id != null;
    this.inicijalizujFormu();
  }

  onSubmit() {
    if (this.editMode) {
      this.postServis.azurirajPost(this.id, this.forma.value);
      this.ruter.navigate(['/posts/' + this.id]);
    } else {
      this.postServis.dodajPost(this.forma.value);
      console.log(this.forma.value);
      this.ruter.navigate(['/posts']);
    }
  }

  private inicijalizujFormu() {
    let naslovPosta = '';
    let podnaslovPosta = '';
    let datumPosta = new Date();
    let slikaPosta = '';
    let sadrzajPosta = '';

    if (this.editMode) {
      const post = this.postServis.getPost(this.id);
      naslovPosta = post.naslov;
      podnaslovPosta = post.podnaslov;
      datumPosta = post.datum;
      slikaPosta = post.slikaPutanja;
      sadrzajPosta = post.sadrzaj;

      this.prikaz = sadrzajPosta;
    }

    this.forma = new FormGroup({
      naslov: new FormControl(naslovPosta, Validators.required),
      podnaslov: new FormControl(podnaslovPosta, Validators.required),
      datum: new FormControl(datumPosta),
      slikaPutanja: new FormControl(slikaPosta, Validators.required),
      sadrzaj: new FormControl(sadrzajPosta, Validators.required),
    });
  }

  onDeletePost() {
    this.postServis.izbrisiPost(this.id);
    this.ruter.navigate(['/posts']);
  }
}
