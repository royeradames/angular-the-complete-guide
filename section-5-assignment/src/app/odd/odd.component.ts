import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-odd",
  templateUrl: "./odd.component.html",
  styleUrls: ["./odd.component.css"],
})
export class OddComponent implements OnInit {
  constructor() {
    console.log("printed odd number");
  }

  ngOnInit(): void {}
}
