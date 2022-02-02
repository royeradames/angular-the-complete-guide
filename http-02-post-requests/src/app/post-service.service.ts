/* database: https://console.firebase.google.com/u/0/project/angular-the-complete-gui-42271/database/angular-the-complete-gui-42271-default-rtdb/data */
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "./post.model";

/* it's best to move the http setup to the service and the setting the handling of the subscribe(data)
- only subscribe in the service when you don't care about the status or respond data
 */
@Injectable({
  providedIn: "root",
})
export class PostService {
  /* this error can handle the service error
  - this strategy is called forward strategy of handling error
  */
  error = new Subject<string>();

  url =
    "https://angular-the-complete-gui-42271-default-rtdb.firebaseio.com/posts.json";
  constructor(
    /* needs to be imported in the module.ts file */
    private http: HttpClient
  ) {}
  createAnStorePost(postData: Post) {
    // Send Http request
    return (
      this.http
        /* url and body are require for the post, options can handle headers and other things */
        // types can be define for the returning data by <Type>
        .post<{ name: string }>(this.url, postData, {
          /* the observe option let you change how angular parse the response data
          - great for when you want access to more than the response body
          - available
            - body (default)
            - events (more in the delete method)
            - response
              - typical axios whole response object
          this is how you observe the response and not just the body response (subsect of response)
          */
          observe: "response",
        })
    );
    /* angular uses observables to handle the sending of the request, and how it would handle the response
      - if not provided angular doesn't send the request
      - you can see that the post method return an observable
      - subscribes only runs when it succeeded
       */
    /* handling error in a subscribe used in the service handler
      .subscribe(
        responseData => console.log(responseData),
        errorResponse => this.error.next(error.message)
      )

      then just subscribe to place that you want to use the error message, and
      unsubscribe on component dismount
      */
  }
  fetchPosts() {
    /* adding multiple query params or could added directly to the url
    - doing a loop to add the key has the first value and the value as the second
      - much easier than manually adding the params

      const paramList: {[kee: string]: string}[]
      paramList.foEach((param) => {
        const key = Object.keys(param)[0]
        searchParams = searchParams.append(key, param[key]);
      })
    */
    let searchParams = new HttpParams();
    searchParams = searchParams.append("print", "pretty");
    searchParams = searchParams.append("custom", "key");

    return (
      this.http
        /* the http methods are type generic
      - you can set incoming data type inside the <> syntax */
        .get<{ [key: string]: Post }>(this.url, {
          /* adding headers. simple with this syntax
          - all method have the option, and in the option you can set the headers.
          - you pass it down has an object literal
           */
          headers: new HttpHeaders({ "custom-header": "98654" }),

          /* setting the params `?varName=value&otherVar=otherValue`
          could be done in the url
          - but here it avoids the concating long string
          - like the postman params tab
          - adding a single query param: new HttpParams().set("print", "pretty")
           */
          params: searchParams,
        })
        /* to transform the data to be useful in angular, its best to
        let pipes handle the transformation
        - so that division of concern is made
        - could be done in the subscribe method but
        - using pipes is best pratice

        pipes like middleware transform the data observable through a list of methods before it reaches the subscribe method.
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
          }),
          /* catch Error can be use has a general error handler to a specific endpoint */
          catchError((errorRes) => {
            // can send to analytics server

            // throw a new error to move it alog the chain of error handlers if you want or
            // you can just have this general error handler take care of the error
            return throwError(errorRes);
          })
        )
    );
  }
  deleteAllPost() {
    return this.http
      .delete(this.url, {
        observe: "events",
      })
      .pipe(
        // tap runs code without disturbing anything.
        tap((event) => {
          console.log(event);

          /* you can granually change the UI base in the event type lifecycle
          - HTTPEventType is a ts thing that makes the event human readble
          - you can see the number value and string that it represents has a enumerate
          This could be grate to handle when to start and stop an animation.
          */
          if (event.type === HttpEventType.Sent) {
            //... do something in the UI when the event is send
          }

          // check if the event body has been receive
          if (event.type === HttpEventType.Response) {
            // safely console.log the event body
            console.log(event.body);
          }
        })
      );
  }
}
