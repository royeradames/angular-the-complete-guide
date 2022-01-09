import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-game-control",
  templateUrl: "./game-control.component.html",
  styleUrls: ["./game-control.component.css"],
})
export class GameControlComponent implements OnInit {
  isStarted: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  /* The event should be listenable from outside the component */
  @Output() gameCreated = new EventEmitter<{
    gameTick: number;
  }>();
  /* When starting the game, an event (holding a incrementing number) should get emitted each second (ref = setInterval()) */
  // note: interval needs to use the window. so its returning type is number
  ref: number;
  gameTick = 0;

  // every 1 sec emit a increasing number to the parent
  startGame() {
    // todo: disable the start button untill the game is over
    const oneSecond = 1000;
    console.log("Game started");
    this.ref = window.setInterval(() => {
      this.gameTick++;

      this.gameCreated.emit({
        gameTick: this.gameTick,
      });
    }, oneSecond);

    // disable the start button
    this.isStarted = true;
  }

  /* When stopping the game, no more events should get emitted
          (clearInterval(ref)) */
  stopGame() {
    console.log("Game stopped");
    window.clearInterval(this.ref);

    // enable the start button
    this.isStarted = false;
  }
}
