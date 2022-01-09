import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { DisplayOddOrEvenPipe } from "./display-odd-or-even.pipe";
import { BasicHighlightDirective } from "./basic-highlight/basic-highlight.directive";
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';
import { AppUnlessDirective } from './app-unless.directive';
@NgModule({
  declarations: [AppComponent, DisplayOddOrEvenPipe, BasicHighlightDirective, BetterHighlightDirective, AppUnlessDirective],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
