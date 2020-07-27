import { Component, Input } from "@angular/core";
import { Activity } from "src/app/models/activity";
import { FileUpload } from "src/app/models/file";
import { User } from "src/app/models/user";
import { Modal } from "src/app/teacher/modals/modal";
import { StudentActivity } from "src/app/models/student-activity";
import { StudentService } from "src/app/services/student/student.service";
import { ActivitiesViewComponent } from "../activities-view/activities-view.component";
import { ResourceFile } from 'src/app/models/resource-file';

@Component({
  selector: "app-activity-view",
  templateUrl: "./activity-view.component.html",
  styleUrls: ["./activity-view.component.scss"],
})
export class ActivityViewComponent extends Modal {
  @Input() activity: Activity;
  @Input() user: User;
  format: string;
  selectedFiles: FileList;
  file: FileUpload;
  activitySent: boolean = false;
  textField: boolean = false;
  textActivity: string = "";
  constructor(private studentService: StudentService) {
    super();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.activity.format === "PDF") {
      this.format = ".pdf";
    } else {
      if (this.activity.format === "WORD") {
        this.format = ".doc, .docx";
      } else {
        this.textField = true;
      }
    }
    this.studentService
      .getActivity(this.user.id, this.activity.id)
      .subscribe((data) => {
        if (data.length > 0) {
          this.activitySent = true;
        }
      });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.file = new FileUpload(this.selectedFiles.item(0));
  }

  deleteFile() {
    this.file = undefined;
  }

  async onSubmit() {
    this.loading("Entregando actividad");
    let studentActivity: StudentActivity = {
      activity_id: this.activity.id,
      student_id: this.user.id,
    };
    if (this.file) {
      let fileUpload: ResourceFile = await this.studentService.uploadActivity(
        this.file
      );
      studentActivity.file = fileUpload;
    } else {
      studentActivity.textActivity = this.textActivity;
    }

    this.studentService.addActivity(studentActivity).then(() => {
      this.dismissLoading();
      this.dismiss();
      this.presentToast("Actividad entregada");
    });
  }

  async seeActivities() {
    const modal = await this.modalCtrl.create({
      component: ActivitiesViewComponent,
      componentProps: {
        activityCode: this.activity.id,
        activityTitle: this.activity.title,
        modalCtrl: this.modalCtrl,
        loadingController: this.loadingController,
        toastController: this.toastController,
        indexedDbService: this.indexedDbService
      },
    });
    return await modal.present();
  }
}
