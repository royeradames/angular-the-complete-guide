import { Directive, ElementRef, OnInit } from "@angular/core";

/* creating a custom directive  */
@Directive({
  // the name of the directive
  // adding [appBasicHighlight] to the selector makes it that you can use it as a attribute
  selector: "[appBasicHighlight]",
})

/* change the background color that the directive seets on */
export class BasicHighlightDirective implements OnInit {
  // using injections to get access to the element that the directive is attached to
  // injection will be cover in a later lesson
  // private <variable name>: <variable type> define the element in the class
  constructor(private elementRef: ElementRef) {
    console.log("BasicHighlightDirective");
  }
  ngOnInit(): void {
    // not best pratice to directly access the DOM because angular can do that for you
    // use the renderer instead like in better-ghighlight.directive.ts
    this.elementRef.nativeElement.style.backgroundColor = "green";
  }
}
