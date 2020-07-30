import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { BehaviorSubject } from "rxjs";
import { StudentService } from "../student/student.service";
import { ClassStudent } from "src/app/models/class-student";
import { ToastController } from "@ionic/angular";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { Notification } from "src/app/models/notification";

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private studentService: StudentService,
    private toastController: ToastController,
    private dbService: NgxIndexedDBService
  ) {
    this.angularFireMessaging.onMessage((payload) => {
      console.log(payload);
    });
  }

  requestPermission(id: string) {
    this.angularFireMessaging.requestToken.subscribe((token) => {
      this.studentService.getClassesOfStudent(id).subscribe((data) => {
        data.forEach((studentClass) => {
          if (token != studentClass.token) {
            let student: ClassStudent = {
              class_id: studentClass.class_id,
              student_id: id,
              token: token,
              id: studentClass.id,
            };
            this.studentService.updateStudent(student).then(() => {});
          }
        });
      });
    });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((msg) => {
      this.currentMessage.next(msg);
      let notification: Notification = {
        title: msg["notification"].title,
        body: msg["notification"].body,
        dateReceived: new Date(Date.now()),
      };
      this.presentToast(msg["notification"].body);
      this.dbService.add("notifications", notification);
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
    });
    toast.present();
  }
}
