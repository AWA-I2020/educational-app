import { Component, Input } from "@angular/core";
import { Modal } from "../../../shared/modal";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { ActivityService } from "src/app/services/activity/activity.service";
import { Activity } from "src/app/models/activity";
import { Class } from "src/app/models/class";
import { Notification } from "src/app/models/notification";
import { StudentService } from "src/app/services/student/student.service";
import { NotificationsService } from "src/app/services/notifications/notifications.service";

@Component({
  selector: "app-modal-add-activity-home",
  templateUrl: "./modal-add-activity-home.component.html",
  styleUrls: ["./modal-add-activity-home.component.scss"],
})
export class ModalAddActivityHomeComponent extends Modal {
  @Input() class: Class;
  formats: string[] = ["PDF", "WORD", "TEXTO"];
  homeWorkForm = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    format: new FormControl("", Validators.required),
    deadline: new FormControl("", Validators.required),
  });
  constructor(
    private activityService: ActivityService,
    private studentService: StudentService,
    private notificationsService: NotificationsService
  ) {
    super();
  }

  ngOnInit() {}

  onSubmit() {
    this.loading("Publicando actividad");
    let activity: Activity = {
      class_id: this.class.id,
      date: new Date(Date.now()),
      description: this.description.value,
      format: this.format.value,
      deadline: new Date(this.deadline.value),
      title: this.title.value,
    };
    this.activityService.addActivity(activity).then(() => {
      let notification: Notification = {
        title: "Nueva actividad",
        body: `Tu profesor publico una nuevo actividad en ${this.class.subject}`,
      };
      this.studentService
        .getStudentsOfClass(this.class.id)
        .subscribe((data) => {
          data.forEach((student) => {
            this.notificationsService
              .sendNotification(student.token, notification)
              .subscribe((data) => {});
          });
        });
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

  get deadline(): AbstractControl {
    return this.homeWorkForm.get("deadline");
  }
}
