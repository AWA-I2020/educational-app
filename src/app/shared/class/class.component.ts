import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Class } from "src/app/models/class";
import { ClassService } from "src/app/services/class/class.service";
import { User } from "firebase";
import { NgxIndexedDBService } from "ngx-indexed-db";

@Component({
  selector: "app-class",
  templateUrl: "./class.component.html",
  styleUrls: ["./class.component.scss"],
})
export class ClassComponent implements OnInit {
  user: User;
  class: Class;
  sliderConfig = {
    slidesPerView: 1,
  };
  constructor(
    private router: ActivatedRoute,
    private indexedDb: NgxIndexedDBService,
    private classService: ClassService
  ) {}

  ngOnInit() {}
  
  ionViewWillEnter() {
    this.indexedDb.getAll("user").then((data) => {
      this.user = (data[0] as unknown) as User;
    });
    this.router.params.subscribe((params) => {
      console.log(params["id"]);
      this.classService.getClass(params["id"]).subscribe((data) => {
        this.class = data;
      });
    });
  }
}
