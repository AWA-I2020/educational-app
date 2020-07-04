import { Injectable } from "@angular/core";
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from "@angular/fire/firestore";
import { Parent } from "src/app/models/parent";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ParentService {
  parentDoc: AngularFirestoreDocument<Parent>;
  constructor(private afs: AngularFirestore) {}

  addParent(data: Parent): Promise<void> {
    const parentRef: AngularFirestoreDocument<any> = this.afs.doc(
      `parents/${data.id}`
    );
    return parentRef.set(data);
  }

  getParent(id: string): Observable<Parent> {
    this.parentDoc = this.afs.doc<Parent>(`parents/${id}`);
    return this.parentDoc.valueChanges().pipe(
      take(1),
      map((modelData) => {
        return modelData;
      })
    );
  }

  updateParent(data: Parent) {
    const modelRef: AngularFirestoreDocument<Parent> = this.afs.doc(
      `parents/${data.id}`
    );
    return modelRef.set(data, {
      merge: true,
    });
  }
}
