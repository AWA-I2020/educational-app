import { ModalController } from '@ionic/angular';
import { Input, OnInit } from '@angular/core';

export class Modal implements OnInit {

    @Input() modalCtrl: ModalController;

    ngOnInit() {
    }

    dismiss() {
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }
}