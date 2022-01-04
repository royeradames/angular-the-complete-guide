import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-game-control",
  templateUrl: "./game-control.component.html",
  styleUrls: ["./game-control.component.css"],
})
export class GameControlComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  /* The event should be listenable from outside the component */
  @Output() gameCreated = new EventEmitter<{
    gameTick: number;
  }>();
  /* When starting the game, an event (holding a incrementing number) should get emitted each second (ref = setInterval()) */
  // ? what is the type of a setInterval()?
  ref: number;
  gameTick = 0;
  startGame() {
    const oneSecond = 1000;
    console.log("Game started");
    this.ref = window.setInterval(() => {
      this.gameTick++;
      console.log(this.gameTick);
    }, oneSecond);

    this.gameCreated.emit({
      gameTick: this.gameTick,
    });
  }

  /* When stopping the game, no more events should get emitted
          (clearInterval(ref)) */
  stopGame() {
    console.log("Game stopped");
    window.clearInterval(this.ref);
  }
}
