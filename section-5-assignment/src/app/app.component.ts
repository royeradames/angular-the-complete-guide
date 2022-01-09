import { Component, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
/* wrapper componenet that joins the game control, odd, event component and acts has the store for states */
export class AppComponent {
  gameTickArray;

  // capture the game think that comes from game-control
  handleGameTick(event) {
    this.gameTickArray = event.gameTick;
  }
}
