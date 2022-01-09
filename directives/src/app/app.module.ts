import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { DisplayOddOrEvenPipe } from './display-odd-or-even.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DisplayOddOrEvenPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
