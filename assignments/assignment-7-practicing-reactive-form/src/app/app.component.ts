import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  /* define the forbidden names locally */
  forbiddenNames = ["Test"];

  /* Create project FromGroup */
  projectForm: FormGroup = new FormGroup({
    name: new FormControl(
      "React Form",
      [Validators.required, this.fobittenNames.bind(this)],
      this.fobittenNamesServer
    ),
    email: new FormControl("royeraadames@gmail.com", [
      Validators.required,
      Validators.email,
    ]),
    status: new FormControl("finished", [
      Validators.required,
      Validators.pattern("finished|critical|stable"),
    ]),
  });

  /* handle onsubmit form */
  onSubmit() {
    console.log(this.projectForm.value);
  }

  /* Add your own Validator which doesn't allow "Test" as a Project Name */
  fobittenNames(control: FormControl): { [s: string]: boolean } {
    //  this can also be handle with Validator.pattern(/^(?!.*Test).*/) in the formControl
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }
  fobittenNamesServer(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test") {
          resolve({ nameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }
}
