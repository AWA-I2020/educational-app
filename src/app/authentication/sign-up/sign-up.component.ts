import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import * as CryptoJS from "crypto-js";
import { User } from "src/app/models/user";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  users: string[] = ["Profesor", "Estudiante", "Padre de familia"];
  signUpForm = new FormGroup({
    completeName: new FormControl("", Validators.required),
    email: new FormControl(""),
    password: new FormControl("", Validators.required),
    role: new FormControl("", Validators.required),
  });
  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    let nameNormalized: string = this.completeName.value;
    nameNormalized = nameNormalized.replace(/\s+/g, "").toLowerCase();
    let password: string = this.convertText(nameNormalized);
    let user: User = {
      completeName: this.completeName.value,
      completeNameNormalizad: nameNormalized,
      password: password,
      role: this.role.value,
      email: this.email.value,
    };
    console.log(user);
  }

  private convertText(password: string) {
    return CryptoJS.AES.encrypt(this.password.value, password).toString();
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  goToSignIn() {
    this.signUpForm.reset();
    this.router.navigate(["sign-in"]);
  }

  get completeName(): AbstractControl {
    return this.signUpForm.get("completeName");
  }

  get email(): AbstractControl {
    return this.signUpForm.get("email");
  }

  get password(): AbstractControl {
    return this.signUpForm.get("password");
  }

  get role(): AbstractControl {
    return this.signUpForm.get("role");
  }
}
