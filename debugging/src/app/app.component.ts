import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  /* to find the error look at the browser developer console and go from there
  - some of the line may not be useful because its refering to the compile end code instaed my current editing code

  core.js:6210 ERROR TypeError: Cannot read properties of undefined (reading 'push')
  means that the server was not initialize as an array
   */
  // servers;
  servers = [];

  onAddServer() {
    this.servers.push("Another Server");
  }

  /* for more complex logic error you can debug using the browser degguer. The project folder it's in
    the source tab inside the . folder . See image. */
  onRemoveServer(id: number) {
    const position = id;
    this.servers.splice(position, 1);
  }
}
