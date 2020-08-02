import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { Notification } from "src/app/models/notification";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  user: User;
  notifications: Notification[] = [];
  constructor(
    private dbService: NgxIndexedDBService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.dbService.getAll("user").then((data) => {
      this.user = (data[0] as unknown) as User;
      this.dbService.getAll("notifications").then((data) => {
        if (data.length > 0) {
          data.forEach((notificationData) => {
            if (notificationData["user_id"] === this.user.id) {
              let notification: Notification = {
                body: notificationData["body"],
                title: notificationData["title"],
                dateReceived: new Date(notificationData["id"]),
                read: notificationData["read"],
                user_id: notificationData["user_id"],
                id: notificationData["id"],
              };
              this.notifications.push(notification);
            }
          });
        }
      });
    });
  }

  ionViewWillLeave() {
    this.notifications = [];
  }

  back() {
    this.router.navigate(["student"]);
  }

  open(dateReceived: Date) {
    console.log(dateReceived);
    let notiIndex = this.notifications.findIndex(
      (element) => element.dateReceived === dateReceived
    );
    this.notifications[notiIndex].read = true;
    this.dbService.update("notifications", this.notifications[notiIndex]);
    this.router.navigate(["student"]);
  }

  delete(id: string) {
    let notiIndex = this.notifications.findIndex(
      (element) => element.id === id
    );
    this.notifications.splice(notiIndex, 1);
    this.dbService.delete("notifications", id).then(async () => {
      const toast = await this.toastController.create({
        message: "Notificacion eliminada.",
        duration: 3000,
      });
      toast.present();
    });
  }
}
