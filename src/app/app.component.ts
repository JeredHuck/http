import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient,
              private pService: PostsService) {}

  ngOnInit() {
    this.pService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
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
      }
    );
  }

  onClearPosts() {
    this.pService.deletePosts().subscribe(
      () => {
        this.loadedPosts = [];
      }
    )
  }

}
