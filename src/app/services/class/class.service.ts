import { Injectable } from "@angular/core";
import { Class } from "src/app/models/class";
import { map, take } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ClassService {
  private classCollection: AngularFirestoreCollection<Class>;
  constructor(private afs: AngularFirestore) {
    this.classCollection = this.afs.collection<Class>("classes");
  }

  addClass(data: Class): Promise<DocumentReference> {
    return this.classCollection.add(data);
  }

  getClass(id: string): Observable<Class> {
    let classDoc = this.afs.doc<Class>(`classes/${id}`);
    return classDoc.valueChanges().pipe(
      take(1),
      map((data) => {
        data.id = id;
        return data;
      })
    );
  }

  deleteClass(id: string): Promise<void> {
    return this.classCollection.doc(id).delete();
  }
}
