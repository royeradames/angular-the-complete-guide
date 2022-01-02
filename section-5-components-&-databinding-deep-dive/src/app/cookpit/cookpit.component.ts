import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-cookpit",
  templateUrl: "./cookpit.component.html",
  styleUrls: ["./cookpit.component.css"],
})
export class CookpitComponent implements OnInit {
  newServerName = "";
  newServerContent = "";

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
      /* alternative: use local reference to capture an input state */
      serverName: nameInput.value,
      serverContent: this.newServerContent,
    });
  }
  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.newServerContent,
    });
  }
}
