import { Component, OnInit } from "@angular/core";
import { ProfileComponent } from "../shared/profile/profile.component";
import { PopoverController } from "@ionic/angular";
import { Class } from "../models/class";

@Component({
  selector: "app-student",
  templateUrl: "./student.page.html",
  styleUrls: ["./student.page.scss"],
})
export class StudentPage implements OnInit {
  classes: Class[] = [
    {
      subject: "Matematicas",
      grade: 2,
      parallel: "B",
      teacher_id: "dasfbasi",
      id: "safasd",
    },
  ];
  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  async showOptions(ev) {
    const popover = await this.popoverController.create({
      component: ProfileComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }

  openClass(id: string) {
    console.log("open class", id);
  }
}
