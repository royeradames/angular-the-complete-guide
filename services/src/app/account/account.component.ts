import { Component, EventEmitter, Input, Output } from "@angular/core";
import { LoggingService } from "../logging.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
  // to do hierachical injector you need to tell angular what are the services in the prodivers array
  providers: [LoggingService],
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{
    id: number;
    newStatus: string;
  }>();

  constructor(
    /* * hierachical injector
    keeps intances in the angular ecosystem
      - use ts property binding private/ public
      - the name is like any variable name
      - !important! name of your service class
        - remember to add the import
      This tell the constructor to make an instance of LogginService with the name provided
      - note angular needs to know which class are providers

    */

    private logginService: LoggingService
  ) {}
  onSetTo(status: string) {
    // this.statusChanged.emit({ id: this.id, newStatus: status });
    // console.log("A server status changed, new status: " + status);

    this.logginService.logStatusChange(status);
  }
}
