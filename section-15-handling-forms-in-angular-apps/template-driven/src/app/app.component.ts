import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
/* the template approache is great for migrating away from angular 1
    Protaice approach is better for entreprize level projects because it gives you great customazation options
   */
export class AppComponent {
  suggestUserName() {
    const suggestedName = "Superuser";
    // /* set the whole form values */
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: "",
    //   },
    //   gender: "male",
    //   secret: "pet",
    //   questionAnswer: "",
    // });

    /* overwrites part of your form*/
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log("Submitted");
  //   console.log(form.value);
  //   console.log(form);
  // }

  /* Valid alternative: using the @ViewChild to handle the f reference.  */
  @ViewChild("f") signupForm: NgForm;
  onSubmit() {
    console.log("Submitted");
    console.log(this.signupForm.valid);
    console.log(this.signupForm.value);
    console.log(this.signupForm);
    /* store form data */
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    /* reset form */
    // you can pass value like for setValue and patchValue to keep some default value at reset
    this.signupForm.reset();
  }

  /* keep track of the user input */
  answer = "";

  /* handling radio buttons */
  genders = ["male", "female"];
  // handle setting gender to male
  defaultGender = this.genders[0];
  /* handle form data */
  user = {
    username: "",
    email: "",
    secretQuestion: "",
    gender: "",
    answer: "",
  };
  submitted = false;
}
