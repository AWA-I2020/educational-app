import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm = new FormGroup({
    completeName: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });
  constructor(private toastController: ToastController,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit() {}

  onSubmit(){}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
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
