import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  DocumentReference,
} from "@angular/fire/firestore";
import { Activity } from "src/app/models/activity";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { firestore } from "firebase/app";
import Timestamp = firestore.Timestamp;

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
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            Object.keys(data)
              .filter((key) => data[key] instanceof Timestamp)
              .forEach((key) => (data[key] = data[key].toDate()));
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }
}
