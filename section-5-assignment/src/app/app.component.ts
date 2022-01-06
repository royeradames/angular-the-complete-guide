import { Component, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  gameTickArray;

  // a incrementing number that start from 1 - infinity
  gameTick: number;

  // capture the game think that comes from game-control
  handleGameTick(event) {
    this.gameTick = event.gameTick;
    console.log(this.gameTick);

    this.gameTickArray = new Array(event.gameTick);
  }
}
