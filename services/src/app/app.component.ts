import { Component, OnInit } from "@angular/core";
import { AccountsService } from "./accounts.service";
import { LoggingService } from "./logging.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  /*
  need to tell angular that this is a service like templateURL, and styleUrl but unlike them
  * if you provide AccountService here it will create a new instance of AccountsService for this component and all it's children
    - having providers in a nested components overwrites this one instance and they get a unic one
    - see hierarchical injector image
   */
  // providers: [AccountsService],
})
export class AppComponent implements OnInit {
  constructor(private accountsServices: AccountsService) {}

  accounts: { name: string; status: string }[] = [];

  /* most declarations are done in the ngOnInit */
  ngOnInit() {
    /* give access to the accounts variable data
      - is like getting access to a redux store
      - under the hood the accountsService accounts passes a reference key to the accounts variable
        - It's the same data as the accounts variable
        - This is normal javascript behavior and not angular behavior
     */
    this.accounts = this.accountsServices.accounts;
  }
}
