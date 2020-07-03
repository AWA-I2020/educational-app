import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { Router } from "@angular/router";
import { ToastController, PopoverController } from "@ionic/angular";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(
    private dbService: NgxIndexedDBService,
    private router: Router,
    private toastController: ToastController,
    private popover: PopoverController
  ) {}

  ionViewWillEnter() {
    this.dbService.getAll("user").then((users) => {
      this.user = (users[0] as unknown) as User;
    });
  }
  ngOnInit() {}

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

  signOut() {
    this.dbService.clear("user").then(
      () => {
        this.closePopover();
        this.router.navigate(["sign-in"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
