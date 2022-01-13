import { Injectable, EventEmitter } from "@angular/core";
import { LoggingService } from "./logging.service";

/*
  - cli generation by: ng g s accounts --spec=false
  - //* Injectable is a decorator is neeced for a service that will take in other services
    - That said, it's recommended to always have the @Injectable
    - This may help for your code to not break in the future.
    -you need to have the service provide in the app.module.ts file
 */
@Injectable({
  /* //* makes the service global
  use this instead of provinding it in the module.ts file
  - completely optional,
    - the traditional syntax (using providers[] ) will still work.
  Advantage (for big projects in general):
  - Services can be loaded lazily by Angular (behind the scenes) and redundant code can be removed automatically.
    - This can lead to a better performance and loading speed
  */
  providedIn: "root",
})
export class AccountsService {
  constructor(private logginService: LoggingService) {}
  /* you can store a data in a variable and share access to that variable through the methods
    - this simulates redux
    - this is because angular handles a global instance of the service and gives access to them through calling this class through the component constructor with the class as a type
 */
  accounts = [
    {
      name: "Master Account",
      status: "active",
    },
    {
      name: "Testaccount",
      status: "inactive",
    },
    {
      name: "Hidden Account",
      status: "unknown",
    },
  ];

  /* you can store and use event emitters in the services
    - account component write the data
    - accounts store the data
    - new account component read the data
    I don't know why I would do it but you can. You can also achive this just by storing a string and use it in new account component
  */
  statusUpdated = new EventEmitter<string>();

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
    this.logginService.logStatusChange(status);
  }
  updateStatus(id: number, newStatus: string) {
    this.accounts[id].status = newStatus;
    console.log("A server status changed, new status: " + newStatus);
  }
}
