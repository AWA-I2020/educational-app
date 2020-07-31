import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController, ToastController, ModalController } from '@ionic/angular';
import { ProfileComponent } from '../shared/profile/profile.component';
import { Class } from '../models/class';
import { MessagingService } from '../services/messaging/messaging.service';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { TeacherService } from '../services/teacher/teacher.service';
import { User } from '../models/user';

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
  classes: Class[] = [
    {
      subject: "Matematicas",
      grade: 2,
      parallel: "B",
      teacher_id: "dasfbasi",
      id: "safasd",
    },
  ];
  constructor(private menu: MenuController,
    public modalController: ModalController,
    private teacherService: TeacherService,
    private indexedDbService: NgxIndexedDBService,
    private toastController: ToastController,
    private router: Router,
    private messagingService: MessagingService,
    private popoverController: PopoverController) { }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.indexedDbService.getAll("user").then((data) => {
      this.user = (data[0] as unknown) as User;
      this.teacherService.getClasses(this.user.id).subscribe((classesData) => {
        this.classes = classesData;
      });
      this.messagingService.requestPermission(this.user.id);
      this.messagingService.receiveMessage();
    });
  }

  async showOptions(ev) {
    const popover = await this.popoverController.create({
      component: ProfileComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
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
