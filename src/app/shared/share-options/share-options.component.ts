import { Component, OnInit, Input } from "@angular/core";
import { PopoverController, ToastController } from "@ionic/angular";
import { Plugins } from "@capacitor/core";

@Component({
  selector: "app-share-options",
  templateUrl: "./share-options.component.html",
  styleUrls: ["./share-options.component.scss"],
})
export class ShareOptionsComponent implements OnInit {
  @Input() code: string;
  @Input() class: boolean;
  constructor(
    private popover: PopoverController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async copyCode() {
    const { Clipboard } = Plugins;
    Clipboard.write({
      string: this.code,
    })
      .then(() => {
        this.closePopover();
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

  closePopover() {
    this.popover.dismiss();
  }
}
