import { Component, OnInit, Input } from "@angular/core";
import { Modal } from "../modal";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { ActivityService } from "src/app/services/activity/activity.service";
import { Activity } from "src/app/models/activity";

@Component({
  selector: "app-modal-add-activity-home",
  templateUrl: "./modal-add-activity-home.component.html",
  styleUrls: ["./modal-add-activity-home.component.scss"],
})
export class ModalAddActivityHomeComponent extends Modal {
  @Input() class_id: string;
  formats: string[] = ["PDF", "WORD"];
  homeWorkForm = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    format: new FormControl("", Validators.required),
  });
  constructor(private activityService: ActivityService) {
    super();
  }

  ngOnInit() {}

  onSubmit() {
    this.loading("Publicando actividad");
    let activity: Activity = {
      class_id: this.class_id,
      date: new Date(Date.now()),
      description: this.description.value,
      format: this.format.value,
      title: this.title.value,
    };
    this.activityService.addActivity(activity).then(() => {
      this.dismiss();
      this.dismissLoading();
      this.presentToast("Actividad publicada");
    });
  }

  get title(): AbstractControl {
    return this.homeWorkForm.get("title");
  }

  get description(): AbstractControl {
    return this.homeWorkForm.get("description");
  }

  get format(): AbstractControl {
    return this.homeWorkForm.get("format");
  }
}
