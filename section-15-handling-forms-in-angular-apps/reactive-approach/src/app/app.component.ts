import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  forbiddenUsernames = ["Chris", "Anna"];
  // define the form input template and it's fields
  signupForm: FormGroup;
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      // second argument is the validators
      // validation need to be done in the form group because the form is synced with the form group not the form HTML

      // Form Group can be used to graph form controls
      userData: new FormGroup({
        // require username to be filled
        username: new FormControl("royeradames", [
          Validators.required,
          // makes this refer to what you want it to refer to
          this.forbiddenNames.bind(this),
        ]),

        // required email to be filled and be a valid email
        email: new FormControl(
          "",
          [Validators.required, Validators.email],
          /* 3 options is for server side validations */
          // adds a ng-wait class while the server is checking the email
          // it appears to run after the local validations
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl("male"),

      // collects an array of values
      hobbies: new FormArray([]),
    });

    /* there is a couple of observables that the FormGroup can be listen to:
    - value changes
    - status changes
     */
    // // return all the values of the form when any input is updated
    // this.signupForm.valueChanges.subscribe((values) => console.log(values));

    // // with every input change return a strin that say if the form is "VALID", "PENDING" "INVALID"
    // this.signupForm.statusChanges.subscribe((status) => console.log(status));

    // // get the status for a specific control
    // this.signupForm
    //   .get("userData.email")
    //   .statusChanges.subscribe((status) => console.log(status));

    /* you can fully and partically insert datat to the form with ts  */
    this.signupForm.setValue({
      userData: {
        username: "Bro test",
        email: "testing@gmail.com",
      },
      gender: "female",
      // ? bug: hobbies is not being inserted
      hobbies: ["biking"],
    });

    // //? bug: if the setValue is above then it overwrites the patch. The intructor didn't see this.
    // this.signupForm.patchValue({
    //   userData: {
    //     username: "Mike",
    //   },
    // });
  }

  onSubmit() {
    console.log("submitted");
    // this is where the values live
    // it matches the form group structure
    console.log(this.signupForm.value);
    // there is many methods that can help with more customization
    console.log(this.signupForm);

    /* reset the form */
    // you can pass down a object with the values that you want to keep
    this.signupForm.reset({ gender: "male" });
  }
  genders = ["male", "female"];

  // bug fix(for): accessing the controls of our form array
  getControls() {
    return (<FormArray>this.signupForm.get("hobbies")).controls;
  }

  // add a a list of input to collect the values from the user
  onAddHobby() {
    // define the specific form control. It's default value and validators
    const control = new FormControl(null, Validators.required);
    // you have to explicity cast this to make it work
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }

  // custome validator to check if the username is not in the forbidden list
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      // return true with why it failed
      return { namesIsForbidden: true };
    }
    // return null if the value is not in the forbidden list
    return null;
  }

  /* get validators check from a server */
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    // simulate a server call
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
