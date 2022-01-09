import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-even",
  templateUrl: "./even.component.html",
  styleUrls: ["./even.component.css"],
})
export class EvenComponent implements OnInit {
  // capture i and store it in number
  @Input() number: string;
  constructor() {}

  ngOnInit(): void {}
}
