import {
  Component,
  Input,
  OnInit,
  // EventEmitter, Output
} from "@angular/core";
import { AccountsService } from "../accounts.service";
import { LoggingService } from "../logging.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
  /* //* to do hierachical injector you need to tell angular what are the services in the prodivers array */
  providers: [
    // LoggingService,
    // AccountsService // * if you provide AccountService here it will create a new instance of AccountsService for this component and all it's children
  ],
})
export class AccountComponent implements OnInit {
  account: { name: string; status: string };
  // @Input() account: { name: string; status: string };
  @Input() id: number; // this needed
  // @Output() statusChanged = new EventEmitter<{
  //   id: number;
  //   newStatus: string;
  // }>();

  constructor(
    /* //* hierachical injector
    keeps intances in the angular ecosystem
      - use ts property binding private/ public
      - the name is like any variable name
      - Note: Name of your service class is how angular knowns its injecting a service
        - remember to add the import
      This tell the constructor to make an instance of LogginService with the name provided
      - note angular needs to know which class are providers

    */
    // --------  var name ----- service Class
    // private logginService: LoggingService,
    private accountsService: AccountsService
  ) {}
  ngOnInit(): void {
    this.account = this.accountsService.accounts[this.id];
  }
  onSetTo(status: string) {
    // this.statusChanged.emit({ id: this.id, newStatus: status });
    // console.log("A server status changed, new status: " + status);

    // this.logginService.logStatusChange(status);
    this.accountsService.updateStatus(this.id, status);

    /* store event in the accounts service */
    this.accountsService.statusUpdated.emit(status);
  }
}
