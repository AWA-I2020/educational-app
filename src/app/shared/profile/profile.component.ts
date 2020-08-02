import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/models/user";
import { PopoverController, ToastController } from "@ionic/angular";
import { Plugins } from "@capacitor/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  @Input() user: User;

  constructor(
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async copyCode() {
    const { Clipboard } = Plugins;
    Clipboard.write({
      string: this.user.id,
    })
      .then(() => {
        this.presentToast("Codigo copiado al portapapeles");
      })
      .catch(() => {
        this.presentToast("Por favor copie manualmente el codigo");
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
