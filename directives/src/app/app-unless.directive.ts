import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

/* there is more to this but this is a basic understanding on how you can hide or show content that has this structural directive
- //? how would does the ngFor works?
 */
@Directive({
  selector: "[appUnless]",
})
export class AppUnlessDirective {
  // @Input set makes inputs methods that are execuated when the input is updated
  // input needs to share the same name as the directive so you can use it in the *
  // what ever you bind to the *appUnless will be the value of the input
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      // add the element to the view
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      // removes the element from the view
      this.vcRef.clear();
    }
  }

  constructor(
    // get the ng-template tag element that gets created when you use *<directive>
    private templateRef: TemplateRef<any>,
    // get the view container reference. is the where the element should be place
    private vcRef: ViewContainerRef
  ) {}
}
