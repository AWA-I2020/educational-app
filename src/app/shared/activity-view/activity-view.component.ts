import { Component, OnInit, Input } from "@angular/core";
import { Activity } from "src/app/models/activity";

@Component({
  selector: "app-activity-view",
  templateUrl: "./activity-view.component.html",
  styleUrls: ["./activity-view.component.scss"],
})
export class ActivityViewComponent implements OnInit {
  @Input() activity: Activity;
  constructor() {}

  ngOnInit() {}
}
