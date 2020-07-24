import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-activities-view",
  templateUrl: "./activities-view.component.html",
  styleUrls: ["./activities-view.component.scss"],
})
export class ActivitiesViewComponent implements OnInit {
  @Input() activityCode: string;
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  ionViewWillEnter() {
    console.log(this.activityCode);
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
