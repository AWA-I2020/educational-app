import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { BehaviorSubject } from "rxjs";
import { StudentService } from "../student/student.service";
import { ClassStudent } from "src/app/models/class-student";
import { ToastController } from "@ionic/angular";

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private studentService: StudentService,
    private toastController: ToastController
  ) {
    this.angularFireMessaging.onMessage((payload) => {
      console.log(payload);
    });
  }

  requestPermission(id: string) {
    this.angularFireMessaging.requestToken.subscribe((token) => {
      this.studentService.getStudentClass(id).subscribe((data) => {
        if (token != data.token) {
          let student: ClassStudent = {
            class_id: data.class_id,
            student_id: id,
            token: token,
          };
          this.studentService.updateStudent(student).then(() => {
            console.log(token);
          });
        }
        console.log(token);
      });
    });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((msg) => {
      console.log("show message!", msg);
      this.currentMessage.next(msg);
      this.presentToast(JSON.stringify(msg));
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
