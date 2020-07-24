import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { StudentService } from "src/app/services/student/student.service";
import { StudentActivity } from "src/app/models/student-activity";

@Component({
  selector: "app-activities-view",
  templateUrl: "./activities-view.component.html",
  styleUrls: ["./activities-view.component.scss"],
})
export class ActivitiesViewComponent implements OnInit {
  @Input() activityCode: string;
  @Input() activityTitle: string;
  activities: StudentActivity[] = [];
  icon: string;
  constructor(
    private modalController: ModalController,
    private studentService: StudentService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.studentService
      .getActivitiesOfStudents(this.activityCode)
      .subscribe((data) => {
        if (data.length > 0) {
          data.forEach((student) => {
            this.studentService
              .getStudent(student.student_id)
              .subscribe((studentData) => {
                student.student = studentData;
                this.activities.push(student);
              });
          });
          console.log(this.activities);
        }
      });
  }

  downloadFile(fileURL: string) {
    console.log("download file");
  }
  
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
