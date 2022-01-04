import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
  /* remove CSS module */
  // encapsulation: ViewEncapsulation.None,
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  /* to show how the OnChange method works get a name*/
  @Input() name: string;

  /* input exposes an element to the parent
  - make it so the parent can change its value (prop drilling)
  - without it you get this error:NG0303: Can't bind to 'element' since it isn't a known property of 'app-server-element'.
  - by default angular does not want to expose all elements to the parent so you have to define that with the @Input() decorator
   */
  // element: { type: string; name: string; content: string };
  // @Input() element: { type: string; name: string; content: string };
  /* you can pass down a string and it would work as an alias */
  @Input("svElement") element: { type: string; name: string; content: string };

  /* lifecyle, see image
  - https://angular.io/guide/lifecycle-hooks
  - a function that angular call at a speific time.
    - Create for customazing the component
  */
  // 1
  constructor() {
    console.log("constructor called");
  }

  // 2. And everytime the input changes (there is a redrawing)
  ngOnChanges(changes: SimpleChanges): void {
    /* Best practice is to implement the OnChanges.  */
    console.log("ngOnChanges called");
    console.log(changes);
  }

  // 3
  ngOnInit(): void {
    console.log("ngOnInit called");
  }
  // 4 (on init)
  /* runs when angular checks any changes
  - in dev mode angular as a second check to see if the component is still alive
  - after first init ngDocheck goes after the constructor
  - triggers
    - promise got resolve
    - an event was called (by clicking on the button)
  avoid running great code in ngDocheck because it will hurt performance
  */
  ngDoCheck(): void {
    console.log("ngDoCheck called");
  }

  // 5 spot
  ngAfterContentInit(): void {
    console.log(
      "ngAfterContentInit called after ngDoCheck and only once like onInit"
    );
  }

  /* 6 spot when they are all together and
    after ngDocheck when component gets a doCheck trigger
   */
  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked called");
  }

  /* 7 spot on first init
  - runs after the content as been check
  */
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }
  /* 8 spot on first init
  - runs after the content as been check
  - after init it run content checked and behind ngDocheck
  */
  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked called");
  }

  /* 9 spot
  - only runs after deleting an element
  - great for stopping memory leaks
   */
  ngOnDestroy(): void {
    console.log("ngOnDestroy called");
  }
}
