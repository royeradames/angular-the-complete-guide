import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-cookpit",
  templateUrl: "./cookpit.component.html",
  styleUrls: ["./cookpit.component.css"],
})
export class CookpitComponent implements OnInit {
  // newServerName = "";
  // newServerContent = "";

  /* get access to a local reference without passing it through a function with ViewChild and input the local reference name inot view child
  - you can select a component by passign the component type
    - not as a string
    - give access to the first instance of the component
  - local reference is more common
  */

  @ViewChild("serverContentInput") serverContentInput: ElementRef;

  constructor() {}
  ngOnInit(): void {}

  /* Pass data to the parent  */
  // create the 2 event the parent is listening to
  @Output() serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  // passing a string to the Output decorator creates an alias for the event
  // alias names are used by the parent to target this event
  @Output("bpCreated") blueprintCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  // emit the event
  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      /* use local reference to capture an input state */
      serverName: nameInput.value,
      /* avoid chaning the element through chaning the native element. Use 2 way binding or string interpolation */
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }
  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      /* use local reference to capture an input state */
      serverName: nameInput.value,
      /* avoid chaning the element through chaning the native element. Use 2 way binding or string interpolation */
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }
}
