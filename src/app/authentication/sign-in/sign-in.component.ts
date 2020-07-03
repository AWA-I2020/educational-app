import { Component, OnInit, NgZone } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { ToastController, LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import * as CryptoJS from "crypto-js";
import { AuthenticationService } from "src/app/services/auth/authentication.service";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { User } from "src/app/models/user";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  signInForm = new FormGroup({
    completeName: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });
  constructor(
    private toastController: ToastController,
    private router: Router,
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    private dbService: NgxIndexedDBService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.presentLoading();
    let nameNormalized: string = this.completeName.value;
    nameNormalized = nameNormalized.replace(/\s+/g, "").toLowerCase();
    this.authService.searchUser(nameNormalized).subscribe(async (userData) => {
      if (userData.length > 0) {
        let user: User = userData[0];
        if (
          this.password.value ===
          this.convertText(user.password, user.completeNameNormalizad)
        ) {
          this.signInForm.reset();
          user.password = "";
          this.dismiss();
          this.dbService.add("user", user).then(
            () => {
              this.presentToast("Inició sesión correctamente.");
              if (user.role === "Profesor") {
                this.router.navigate(["teacher"]);
              } else {
                if (user.role === "Estudiante") {
                  this.router.navigate(["student"]);
                } else {
                  this.router.navigate(["parent"]);
                }
              }
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          this.dismiss();
          this.presentToast("Credenciales incorrectos.");
          this.password.setValue("");
        }
      } else {
        this.dismiss();
        this.presentToast("Usuario no existe, regístrese.");
        this.signInForm.reset();
      }
    });
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  private convertText(password: string, secretPass: string) {
    return CryptoJS.AES.decrypt(password, secretPass).toString(
      CryptoJS.enc.Utf8
    );
  }

  goToSignUp() {
    this.signInForm.reset();
    this.router.navigate(["sign-up"]);
  }

  get completeName(): AbstractControl {
    return this.signInForm.get("completeName");
  }

  get password(): AbstractControl {
    return this.signInForm.get("password");
  }
}
