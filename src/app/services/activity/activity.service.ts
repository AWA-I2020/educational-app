import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  DocumentReference,
} from "@angular/fire/firestore";
import { Activity } from "src/app/models/activity";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ActivityService {
  private activityCollection: AngularFirestoreCollection<Activity>;
  constructor(private afs: AngularFirestore) {
    this.activityCollection = this.afs.collection<Activity>("activities");
  }

  addActivity(data: Activity): Promise<DocumentReference> {
    return this.activityCollection.add(data);
  }

  getActivities(id: string): Observable<Activity[]> {
    return this.afs
      .collection<Activity>("activities", (ref) =>
        ref.where("class_id", "==", id)
      )
      .valueChanges();
  }
}
