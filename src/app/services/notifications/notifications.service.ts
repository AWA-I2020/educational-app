import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Notification } from "src/app/models/notification";
import { Observable } from "rxjs";

const URL: string = "https://fcm.googleapis.com/fcm/send";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization:
      "key=AAAAI1O57Fs:APA91bHkxPle_J8GjdnXpCUdrht3i3pANtn_6wCd_mhGZYseb-G8N--56IMLfOc_Y38mmqd7l07nP3Ua8MNmH5mQ-3SqqZdG6ZW1T-WYDJMdrDEdmopbHC5155ikh7rfK8NP1_bIoyKp",
  }),
};

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  sendNotification(
    token: string,
    notification: Notification
  ): Observable<Object> {
    return this.http.post(
      URL,
      { notification: notification, to: token },
      httpOptions
    );
  }
}
