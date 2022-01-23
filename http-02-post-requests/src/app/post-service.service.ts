import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

/* it's best to move the http setup to the service and the setting the handling of the subscribe(data)
- only subscribe in the service when you don't care about the status or respond data
 */
@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor(
    /* needs to be imported in teh module.ts file */
    private http: HttpClient
  ) {}
  createAnStorePost(postData: Post) {
    // Send Http request
    return (
      this.http
        /* url and body are require for the post, options can handle headers and other things */
        // types can be define for the returning data by <Type>
        .post<{ name: string }>(
          "https://angular-the-complete-gui-42271-default-rtdb.firebaseio.com/posts.json",
          postData
        )
    );
    /* angular uses observables to handle the sending of the request, and how it would handle the response
      - if not provided angular doesn't send the request
      - you can see that the post method return an observable
       */
  }
  fetchPosts() {
    return (
      this.http
        /* the http methods are type generic
      - you can set incoming data type inside the <> syntax */
        .get<{ [key: string]: Post }>(
          "https://angular-the-complete-gui-42271-default-rtdb.firebaseio.com/posts.json"
        )
        /* to transform the data to be useful in angular, its best to
        let pipes handle the transformation
        - so that division of concern is made
        - could be done in the subscribe method but
        - using pipes is best pratice

        pipes transform the data observable through a list of methods before it reaches the subscribe method.
        - https://rxjs.dev/guide/operators
        - operators are import form rxjs/operators
          - https://rxjs.dev/api?query=operators
       */
        .pipe(
          map((responseData) => {
            /* recommended to add type to the returning data so that ts can be of help */
            const postsArray: Post[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                if (responseData.hasOwnProperty(key)) {
                  postsArray.push({ ...responseData[key], id: key });
                }
              }
            }
            return postsArray;
          })
        )
    );
  }
}
