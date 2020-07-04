import { Injectable } from "@angular/core";
import { Class } from "src/app/models/class";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class TeacherService {
  constructor(private afs: AngularFirestore) {}

  getClasses(id: string): Observable<Class[]> {
    return this.afs
      .collection<Class>("classes", (ref) => ref.where("teacher_id", "==", id))
      .valueChanges();
  }
}
