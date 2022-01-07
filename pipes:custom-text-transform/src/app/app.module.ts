import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";

import shortenPipe from "./short.pipe";
import { FilterPipe } from "./filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    // custom pipes need to be declared in the NgModule
    shortenPipe,
    // cli automatically adds it to the declarations
    FilterPipe,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
