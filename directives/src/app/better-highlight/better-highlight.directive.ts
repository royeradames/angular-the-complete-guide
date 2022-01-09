import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

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
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    /* Implement this callback to set a CSS style for an element in the DOM.
      - @param el — The element.
      - @param style — The name of the style.
      - @param value — The new value.
      - @param flags — Flags for style variations. No flags are set by default.
    */
    this.renderer.setStyle(
      // cannot pass down the wrapper, you need to pass down the actual element
      this.elRef.nativeElement,
      "background-color",
      "blue"
    );
    this.renderer.setStyle(this.elRef.nativeElement, "padding", "1rem");
    this.renderer.setStyle(this.elRef.nativeElement, "color", "white");
  }
}
