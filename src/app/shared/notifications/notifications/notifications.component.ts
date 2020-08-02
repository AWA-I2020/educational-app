import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/models/user";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { Notification } from "src/app/models/notification";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  @Input() user: User;
  notifications: Notification[] = [];
  constructor(private dbService: NgxIndexedDBService) {}

  ngOnInit() {}

  ionViewWillEnter() {
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
  }

  ionViewWillLeave() {
    this.notifications = [];
  }

  open(dateReceived: Date) {
    console.log(dateReceived);
    let notiIndex = this.notifications.findIndex(
      (element) => element.dateReceived === dateReceived
    );
    this.notifications[notiIndex].read = true;
    this.dbService.update("notifications", this.notifications);
  }

  delete(dateReceived: Date) {
    console.log(dateReceived);
    let notiIndex = this.notifications.findIndex(
      (element) => element.dateReceived === dateReceived
    );
    this.notifications.splice(notiIndex, 1);
    this.dbService.update("notifications", this.notifications);
  }
}
