import { Component, OnInit } from "@angular/core";
import {
  MenuController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { ModalAddClassComponent } from "./modals/modal-add-class/modal-add-class.component";
import { Class } from "../models/class";
import { TeacherService } from "../services/teacher/teacher.service";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { MessagingService } from "../services/messaging/messaging.service";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.page.html",
  styleUrls: ["./teacher.page.scss"],
})
export class TeacherPage implements OnInit {
  user: User;
  page: number = 1;
  pageTitle: string = "Mis clases";
  modalClass;
  classes: Class[] = [];
  constructor(
    private menu: MenuController,
    public modalController: ModalController,
    private teacherService: TeacherService,
    private indexedDbService: NgxIndexedDBService,
    private toastController: ToastController,
    private router: Router,
    private messagingService: MessagingService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.indexedDbService.getAll("user").then((data) => {
      this.user = (data[0] as unknown) as User;
      this.teacherService.getClasses(this.user.id).subscribe((classesData) => {
        this.classes = classesData;
      });
      this.messagingService.requestPermission(this.user.id);
      this.messagingService.receiveMessage(this.user.id);
    });
  }

  openClass(id: string) {
    this.router.navigate(["/teacher/class", { id: id }]);
  }

  profile() {
    this.router.navigate(["/teacher/profile"]);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalAddClassComponent,
      componentProps: {
        modalCtrl: this.modalController,
        toastController: this.toastController,
        indexedDbService: this.indexedDbService,
      },
    });
    return await modal.present();
  }

  signOut() {
    this.indexedDbService.clear("user").then(() => {
      this.menu.close();
      this.router.navigate(["sign-in"]);
    });
  }

  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }

  changePage(valuePage, pageName) {
    this.page = valuePage;
    this.pageTitle = pageName;
    this.menu.close();
  }
}
