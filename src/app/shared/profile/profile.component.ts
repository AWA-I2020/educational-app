import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { PopoverController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  @Input() user: User;

  constructor(private toastController: ToastController, private popover: PopoverController) { }

  ngOnInit() { }

  copyCode() {
    document.addEventListener("copy", (e: ClipboardEvent) => {
      e.clipboardData.setData("text/plain", this.user.id);
      e.preventDefault();
      document.removeEventListener("copy", null);
    });
    document.execCommand("copy");
    this.presentToast("Codigo copiado al portapapeles");
  }

  closePopover() {
    this.popover.dismiss();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
