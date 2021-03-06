import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
/* complete list of operators https://rxjs.dev/api?query=operators */
import { Post } from "./post.model";
import { PostService } from "./post-service.service";
import { Subject } from "rxjs";
/* the database will expire in 30 days and it can be renew in firebase.com */

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  /*
  private errorSub: Subscription
   */
  loadedPosts: Post[] = [];
  error: null | string = null;
  /* you can set a variable to watch if the fetch request is has been send and received
  - why?
    - so that you can show the user something while the wait for their data
  - best pratice
    - to show them a wireframe of how the page can look after the data is in
      - reduces the flashing in of the data
  - set the values in the method call, and the subscribe method
   */
  isFetching: boolean;

  constructor(
    /* it's best to move the http setup to the service and the setting the handling of the subscribe(data)
      - only subscribe in the service when you don't care about the status or respond data
    */
    private readonly postService: PostService
  ) {}

  ngOnInit() {
    /* capture the subscription to PostService emitter for later unsubscribing when on ngOnDelete
    capture the error message when even there is data
    all of this steps are needed for the forward strategy of handling error
    I prefer letter the service set up the http, and the component to handle the error and data
    this.errorSub = this.postsService.error.subscribe(errorMessage => this.error = errorMessage)
     */
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService
      .createAnStorePost(postData)
      /* angular uses observables to handle the sending of the request, and how it would handle the response
      - if not provided angular doesn't send the request
      - you can see that the post method return an observable
       */
      .subscribe(
        (responseData) => {
          console.log(responseData);
          /* handle error message */
          this.error = null;

          /* handle data */
          this.loadedPosts.push(postData);
        },
        /* the second function pass to subscribe handles the error */
        (errorResponse: HttpErrorResponse) => {
          /* the error is api base, aways check what you are getting */
          this.error = errorResponse.error.error;
        }
      );
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postService
      .deleteAllPost()
      /* subscribes only runs when it succeeded  */
      .subscribe(() => (this.loadedPosts = []));
  }

  private fetchPosts() {
    /* set the loading variable to true */
    this.isFetching = true;
    console.log("loadedPosts", this.loadedPosts);

    /*
    - get request don't need a second option. You can see what you need in by ts description
    - you do need a subscribe to handle the return data
     */
    return this.postService.fetchPosts().subscribe(
      (posts) => {
        /* set the loading variable to false */
        this.isFetching = false;
        /* handle the error if any */
        this.error = null;

        /* handle the data */
        return (this.loadedPosts = posts);
      },
      /* the second function pass to subscribe handles the error */
      (errorResponse: HttpErrorResponse) => {
        /* the error is api base, aways check what you are getting */
        this.error = errorResponse.error.error;
      }
    );
  }

  resetErrorMessage() {
    /* reset error */
    this.error = null;
    /* reset loading message */
    this.isFetching = false;
  }

  /*
  unsub from the service emitter so there is no memory leak
  ngOnDestroy(){
    this.errorSub.Unsubscribe()
  }
  */
}
