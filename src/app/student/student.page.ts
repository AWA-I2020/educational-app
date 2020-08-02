import { Component, OnInit } from "@angular/core";
import {
  MenuController,
  ToastController,
  ModalController,
  LoadingController,
} from "@ionic/angular";
import { Class } from "../models/class";
import { MessagingService } from "../services/messaging/messaging.service";
import { Router } from "@angular/router";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { User } from "../models/user";
import { RegisterClassComponent } from "./modals/register-class/register-class.component";
import { StudentService } from "../services/student/student.service";
import { ClassService } from "../services/class/class.service";

@Component({
  selector: "app-student",
  templateUrl: "./student.page.html",
  styleUrls: ["./student.page.scss"],
})
export class StudentPage implements OnInit {
  user: User;
  page: number = 1;
  pageTitle: string = "Mis clases";
  modalClass;
  classes: Class[] = [];
  constructor(
    private menu: MenuController,
    public modalController: ModalController,
    private studentService: StudentService,
    private classService: ClassService,
    private indexedDbService: NgxIndexedDBService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router,
    private messagingService: MessagingService
  ) {}

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.indexedDbService.getAll("user").then((data) => {
      this.user = (data[0] as unknown) as User;
      this.studentService
        .getClassesOfStudent(this.user.id)
        .subscribe((classesData) => {
          if (classesData.length > 0) {
            classesData.forEach((data) => {
              this.classService
                .getClass(data.class_id)
                .subscribe((classData) => {
                  this.classes.push(classData);
                });
            });
          }
        });
      this.messagingService.requestPermission(this.user.id);
      this.messagingService.receiveMessage();
    });
  }

  ionViewWillLeave() {
    this.classes = [];
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: RegisterClassComponent,
      componentProps: {
        modalCtrl: this.modalController,
        toastController: this.toastController,
        indexedDbService: this.indexedDbService,
        loadingController: this.loadingController,
        user: this.user,
      },
    });
    return await modal.present();
  }

  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }

  openEnd() {
    this.menu.open("end");
  }

  openCustom() {
    this.menu.enable(true, "custom");
    this.menu.open("custom");
  }

  changePage(valuePage, pageName) {
    this.page = valuePage;
    this.pageTitle = pageName;
    this.menu.close();
  }

  signOut() {
    this.indexedDbService.clear("user").then(() => {
      this.menu.close();
      this.router.navigate(["sign-in"]);
    });
  }
}
