import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { ProfileComponent } from '../shared/profile/profile.component';
import { Class } from '../models/class';

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
  constructor(private menu: MenuController, private popoverController: PopoverController) { }

  ngOnInit(): void {
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
}
