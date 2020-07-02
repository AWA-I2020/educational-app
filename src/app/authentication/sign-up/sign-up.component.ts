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
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { LoadingController } from "@ionic/angular";

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
    private authService: AuthenticationService,
    private toastController: ToastController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.presentLoading();
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
    this.authService.registerUser(user).then((data) => {
      this.authService.getUser(data.id).subscribe((user) => {
        if (user) {
          user.id = data.id;
          this.authService.updateUser(user).then(() => {
            this.dismiss();
            this.presentToast("Usuario registrado, inicia sesión.");
            this.router.navigate(["sign-in"]);
          });
        }
      });
    });
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Cargando..",
    });
    await loading.present();
  }

  dismiss() {
    this.loadingController.dismiss();
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
