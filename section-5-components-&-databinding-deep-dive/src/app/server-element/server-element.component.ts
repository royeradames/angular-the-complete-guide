import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
  /* remove CSS module */
  // encapsulation: ViewEncapsulation.None,
})
export class ServerElementComponent implements OnInit {
  /* input exposes an element to the parent
  - make it so the parent can change its value (prop drilling)
  - without it you get this error:NG0303: Can't bind to 'element' since it isn't a known property of 'app-server-element'.
  - by default angular does not want to expose all elements to the parent so you have to define that with the @Input() decorator
   */
  // element: { type: string; name: string; content: string };
  // @Input() element: { type: string; name: string; content: string };
  /* you can pass down a string and it would work as an alias */
  @Input("svElement") element: { type: string; name: string; content: string };
  constructor() {}

  ngOnInit(): void {}
}
