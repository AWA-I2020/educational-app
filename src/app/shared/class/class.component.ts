import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Class } from "src/app/models/class";
import { ClassService } from "src/app/services/class/class.service";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { ResourceService } from "src/app/services/resource/resource.service";
import { ActivityService } from "src/app/services/activity/activity.service";
import { Resource } from "src/app/models/resource";
import { Activity } from "src/app/models/activity";
import { ClassStudent } from "src/app/models/class-student";
import {
  ModalController,
  LoadingController,
  ToastController,
  PopoverController,
} from "@ionic/angular";
import { ResourceComponent } from "../resource/resource.component";
import { ResourceViewComponent } from "../resource-view/resource-view.component";
import { ModalAddActivityHomeComponent } from "src/app/teacher/modals/modal-add-activity-home/modal-add-activity-home.component";
import { ModalAddActivityQuestionComponent } from "src/app/teacher/modals/modal-add-activity-question/modal-add-activity-question.component";
import { User } from "src/app/models/user";
import { ShareOptionsComponent } from "../share-options/share-options.component";
import { ActivityViewComponent } from "../activity-view/activity-view.component";

@Component({
  selector: "app-class",
  templateUrl: "./class.component.html",
  styleUrls: ["./class.component.scss"],
})
export class ClassComponent implements OnInit {
  user: User;
  class: Class;
  resources: Resource[] = [];
  activities: Activity[] = [];
  students: ClassStudent[] = [];
  sliderConfig = {
    slidesPerView: 1,
  };
  constructor(
    private router: ActivatedRoute,
    private indexedDb: NgxIndexedDBService,
    private classService: ClassService,
    private resourceService: ResourceService,
    private activityService: ActivityService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.indexedDb.getAll("user").then((data) => {
      this.user = (data[0] as unknown) as User;
    });
    this.router.params.subscribe((params) => {
      this.classService.getClass(params["id"]).subscribe((data) => {
        this.class = data;
        this.resourceService.getResources(this.class.id).subscribe((data) => {
          this.resources = data;
        });
        this.activityService.getActivities(this.class.id).subscribe((data) => {
          this.activities = data;
        });
      });
    });
  }

  async addResource() {
    const modal = await this.modalController.create({
      component: ResourceComponent,
      componentProps: {
        modalCtrl: this.modalController,
        class: this.class,
        loadingController: this.loadingController,
        toastController: this.toastController,
      },
    });
    return await modal.present();
  }

  async addActivityHome() {
    const modal = await this.modalController.create({
      component: ModalAddActivityHomeComponent,
      componentProps: {
        modalCtrl: this.modalController,
        class: this.class,
        loadingController: this.loadingController,
        toastController: this.toastController,
      },
    });
    return await modal.present();
  }

  async addActivityQuestion() {
    const modal = await this.modalController.create({
      component: ModalAddActivityQuestionComponent,
      componentProps: {
        modalCtrl: this.modalController,
        class_id: this.class.id,
        loadingController: this.loadingController,
        toastController: this.toastController,
      },
    });
    return await modal.present();
  }

  async openResource(resource: Resource) {
    const modal = await this.modalController.create({
      component: ResourceViewComponent,
      componentProps: {
        modalCtrl: this.modalController,
        resource: resource,
        loadingController: this.loadingController,
        toastController: this.toastController,
      },
    });
    return await modal.present();
  }

  async openActivity(activity: Activity) {
    const modal = await this.modalController.create({
      component: ActivityViewComponent,
      componentProps: {
        modalCtrl: this.modalController,
        activity: activity,
        user: this.user,
        loadingController: this.loadingController,
        toastController: this.toastController,
        indexedDbService: this.indexedDb,
      },
    });
    return await modal.present();
  }

  openStudent(student: ClassStudent) {
    console.log("student");
  }

  async shareClass(ev) {
    const popover = await this.popoverController.create({
      component: ShareOptionsComponent,
      componentProps: { code: this.class.id, class: true },
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
