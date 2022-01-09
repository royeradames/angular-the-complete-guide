import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from "@angular/core";

/* * cli gneration: ng g d(irective) <name> */
@Directive({
  selector: "[appBetterHighlight]",
})

/* like basic highlight directive but instead of working with the browser element it works with angular
- it's better because angular is less limited than the browser
- angular has access to service workers (advance solution)
- more options than just styles
  - https://angular.io/api/core/Renderer2
 */
export class BetterHighlightDirective implements OnInit {
  /* bind to the element that uses this directive directly and change its style
    List of things you can bind to with an html element
      - https://www.w3schools.com/jsref/dom_obj_all.asp
    - Shorter syntax for than renderer
    */
  @HostBinding("style.backgroundColor") backgroundColor: string = "purple";

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    /* Implement this callback to set a CSS style for an element in the DOM.
      - @param el — The element.
      - @param style — The name of the style.
      - @param value — The new value.
      - @param flags — Flags for style variations. No flags are set by default.
    */
    // this.renderer.setStyle(
    //   // cannot pass down the wrapper, you need to pass down the actual element
    //   this.elRef.nativeElement,
    //   "background-color",
    //   "blue"
    // );
    // this.backgroundColor = "blue";
    this.renderer.setStyle(this.elRef.nativeElement, "padding", "1rem");
    this.renderer.setStyle(this.elRef.nativeElement, "color", "white");
  }

  /* listen to events with HostListener decorator */
  // simulate on hover
  @HostListener("mouseenter") mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, "background-color", "red");
    this.backgroundColor = "red";
  }
  @HostListener("mouseleave") mouseleave(eventData: Event) {
    // this.renderer.setStyle(
    //   // cannot pass down the wrapper, you need to pass down the actual element
    //   this.elRef.nativeElement,
    //   "background-color",
    //   "blue"
    // );
    this.backgroundColor = "blue";
    this.renderer.setStyle(this.elRef.nativeElement, "padding", "1rem");
    this.renderer.setStyle(this.elRef.nativeElement, "color", "white");
  }
}
