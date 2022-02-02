import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AccountComponent } from "./account/account.component";
import { NewAccountComponent } from "./new-account/new-account.component";
// import { AccountsService } from "./accounts.service";
// import { LoggingService } from "./logging.service";

@NgModule({
  declarations: [AppComponent, AccountComponent, NewAccountComponent],
  imports: [BrowserModule, FormsModule],
  providers: [
    /* if you provide sergice int he model all of the other components declare here will have access to it
    - you can also nest providers inside providers that are in the module.ts file
    //* new syntax is better @Injectable({providedIn: 'root'}) see the service file
     */
    // AccountsService,
    // LoggingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
