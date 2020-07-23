import { Component, OnInit, Input } from "@angular/core";
import { PopoverController, ToastController } from "@ionic/angular";

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

  copyCode() {
    document.addEventListener("copy", (e: ClipboardEvent) => {
      e.clipboardData.setData("text/plain", this.code);
      e.preventDefault();
      document.removeEventListener("copy", null);
    });
    document.execCommand("copy");
    this.closePopover();
    this.presentToast("Codigo copiado al portapapeles");
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
