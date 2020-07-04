import { Injectable } from "@angular/core";
import { Class } from "src/app/models/class";
import { map, take } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  AngularFirestoreDocument,
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
      map((collection) => {
        return collection;
      })
    );
  }

  updateClass(data: Class) {
    const modelRef: AngularFirestoreDocument<Class> = this.afs.doc(
      `classes/${data.id}`
    );
    return modelRef.set(data, {
      merge: true,
    });
  }

  deleteClass(id: string): Promise<void> {
    return this.classCollection.doc(id).delete();
  }
}
