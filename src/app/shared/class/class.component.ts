import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Class } from "src/app/models/class";
import { ClassService } from "src/app/services/class/class.service";
import { User } from "firebase";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { ResourceService } from "src/app/services/resource/resource.service";
import { ActivityService } from "src/app/services/activity/activity.service";
import { Resource } from "src/app/models/resource";
import { Activity } from "src/app/models/activity";
import { ClassStudent } from "src/app/models/class-student";

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
    private activityService: ActivityService
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

  addResource() {
    console.log("resource");
  }

  addActivity() {
    console.log("activity");
  }

  openResource(resource: Resource) {
    console.log("resource");
  }

  openActivity(activity: Activity) {
    console.log("activity");
  }

  openStudent(student: ClassStudent) {
    console.log("student");
  }
}
