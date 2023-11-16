import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription, map } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient,
              private pService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.pService.error.subscribe(
      errorMessage => {
        this.error = errorMessage;
    })
    this.pService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
       error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.pService.createAndStore(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.pService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.isFetching = false;
        this.error = error.message;
      });
  }

  onClearPosts() {
    this.pService.deletePosts().subscribe(
      () => {
        this.loadedPosts = [];
      });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
      this.errorSub.unsubscribe();
  }

}
