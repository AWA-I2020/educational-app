import { Component, OnInit, Input } from "@angular/core";
import { Resource } from "src/app/models/resource";
import { Modal } from "src/app/teacher/modals/modal";

@Component({
  selector: "app-resource-view",
  templateUrl: "./resource-view.component.html",
  styleUrls: ["./resource-view.component.scss"],
})
export class ResourceViewComponent extends Modal {
  @Input() resource: Resource;
  constructor() {
    super();
  }

  ngOnInit() {}

  openFile(url: string) {
    console.log(url);
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
