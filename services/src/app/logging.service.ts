import { Injectable } from "@angular/core";

/* services are normal js classess */
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
export class LoggingService {
  logStatusChange(status: string) {
    console.log("A server status changed, new status: " + status);
  }
}
