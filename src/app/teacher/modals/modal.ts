import { ModalController, ToastController } from "@ionic/angular";
import { Input, OnInit } from "@angular/core";
import { NgxIndexedDBService } from 'ngx-indexed-db';

export class Modal implements OnInit {
  @Input() modalCtrl: ModalController;
  @Input() toastController: ToastController;
  @Input() indexedDbService: NgxIndexedDBService;

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
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
