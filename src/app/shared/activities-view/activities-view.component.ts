import { Component, Input } from "@angular/core";
import { StudentService } from "src/app/services/student/student.service";
import { StudentActivity } from "src/app/models/student-activity";
import { FileService } from "src/app/services/file/file.service";
import { Modal } from "src/app/teacher/modals/modal";
import { User } from "src/app/models/user";

@Component({
  selector: "app-activities-view",
  templateUrl: "./activities-view.component.html",
  styleUrls: ["./activities-view.component.scss"],
})
export class ActivitiesViewComponent extends Modal {
  @Input() activityCode: string;
  @Input() activityTitle: string;
  activities: StudentActivity[] = [];
  icon: string;
  constructor(
    private studentService: StudentService,
    private fileService: FileService
  ) {
    super();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.indexedDbService.getByKey("activities", this.activityCode).then(
      (data) => {
        if (data) {
          this.activities = data.activities;
        } else {
          this.studentService
            .getActivitiesOfStudents(this.activityCode)
            .subscribe((data) => {
              if (data.length > 0) {
                this.activities = data;
                this.indexedDbService.add("activities", {
                  id: this.activityCode,
                  activities: this.activities,
                });
              }
            });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadFile(name: string) {
    console.log("downloading");
    let fileIndex = this.activities.findIndex(
      (element) => element.file.name === name
    );
    if (this.activities[fileIndex].file.icon === "download") {
      this.loading("Descargando archivo");
      this.fileService
        .downloadFile(this.activities[fileIndex].file.fileURL)
        .subscribe((file) => {
          file.name = this.activities[fileIndex].file.name;
          this.activities[fileIndex].file.file = file;
          this.activities[fileIndex].file.icon = "eye";
          this.dismissLoading();
          this.indexedDbService.update("activities", {
            id: this.activityCode,
            activities: this.activities,
          });
        });
    } else {
      let fileURL = window.URL.createObjectURL(
        this.activities[fileIndex].file.file
      );
      window.open(fileURL);
    }
  }
}
