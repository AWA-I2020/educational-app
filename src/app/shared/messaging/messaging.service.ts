import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.onMessage((payload) => {
      console.log(payload);
    });
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe((token) => {
      console.log(token);
    });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((msg) => {
      console.log("show message!", msg);
      this.currentMessage.next(msg);
    });
  }
}
