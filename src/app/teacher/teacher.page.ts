import { Component, OnInit } from "@angular/core";
import {
  MenuController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { ModalAddClassComponent } from "./modals/modal-add-class/modal-add-class.component";
import { ModalAddActivityHomeComponent } from "./modals/modal-add-activity-home/modal-add-activity-home.component";
import { ModalAddActivityQuestionComponent } from "./modals/modal-add-activity-question/modal-add-activity-question.component";
import { Class } from "../models/class";
import { TeacherService } from "../services/teacher/teacher.service";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.page.html",
  styleUrls: ["./teacher.page.scss"],
})
export class TeacherPage implements OnInit {
  page: number = 1;
  pageTitle: string = "Mis clases";
  especificClass = {
    title: "",
    content: "",
    paralelo: "",
  };
  backPage = 1;
  backTitle = this.pageTitle;

  modalClass;
  modalHome;
  modalQuestion;
  classes: Class[] = [];
  constructor(
    private menu: MenuController,
    public modalController: ModalController,
    private teacherService: TeacherService,
    private indexedDbService: NgxIndexedDBService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.modalClass = ModalAddClassComponent;
    this.modalHome = ModalAddActivityHomeComponent;
    this.modalQuestion = ModalAddActivityQuestionComponent;
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.indexedDbService.getAll("user").then((data) => {
      this.teacherService
        .getClasses(((data[0] as unknown) as User).id)
        .subscribe((classesData) => {
          this.classes = classesData;
        });
    });
  }

  openClass(id: string) {
    this.router.navigate(["/teacher/class", { id: id }]);
  }

  async openModal(modalComponent) {
    const modal = await this.modalController.create({
      component: modalComponent,
      componentProps: {
        modalCtrl: this.modalController,
        toastController: this.toastController,
        indexedDbService: this.indexedDbService
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

  private changePage(valuePage, pageName, especificclass?) {
    this.backPage = this.page;
    this.backTitle = this.pageTitle;
    this.page = valuePage;
    this.pageTitle = pageName;
    this.especificClass = especificclass;
    this.menu.close();
  }

  private back() {
    this.page = this.backPage;
    this.pageTitle = this.backTitle;
  }
}
