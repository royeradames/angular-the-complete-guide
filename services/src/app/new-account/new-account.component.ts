import { Component, EventEmitter, Output } from "@angular/core";

import { LoggingService } from "../logging.service";

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.css"],
  // to do hierachical injector you need to tell angular what are the services in the prodivers array
  providers: [LoggingService],
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{ name: string; status: string }>();

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
  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus,
    });
    // console.log("A server status changed, new status: " + accountStatus);

    /* import and using the import inside the function is not how you use services
      dont increase the instances manually instead
      use hierarchical injector to get the service in the constructor
    */
    // const service = new LoggingService();
    // service.logStatusChange(accountStatus);

    this.logginService.logStatusChange(accountStatus);
  }
}
