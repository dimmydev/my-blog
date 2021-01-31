import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostsComponent} from './posts/posts.component';
import {PostDetailComponent} from './posts/post-detail/post-detail.component';
import {PostEditComponent} from './posts/post-edit/post-edit.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {PostsResolverService} from './posts/posts-resolver.service';
import {LoginComponent} from './login/login.component';
import {LoginGuard} from './login/login.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full'},
  { path: 'posts', component: PostsComponent },
  { path: 'posts/new', component: PostEditComponent, canActivate: [LoginGuard]},
  { path: 'posts/:id', component: PostDetailComponent, resolve: [PostsResolverService] },
  { path: 'posts/:id/edit', component: PostEditComponent, canActivate: [LoginGuard]},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'login', component: LoginComponent},
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
