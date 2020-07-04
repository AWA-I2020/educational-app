import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentReference,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { ClassStudent } from "src/app/models/class-student";
import { StudentActivity } from "src/app/models/student-activity";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private classesStudentsCollection: AngularFirestoreCollection<ClassStudent>;
  private studentActivitiesCollection: AngularFirestoreCollection<
    StudentActivity
  >;

  constructor(private afs: AngularFirestore) {
    this.classesStudentsCollection = this.afs.collection<ClassStudent>(
      "classes-students"
    );
    this.studentActivitiesCollection = this.afs.collection<StudentActivity>(
      "students-activities"
    );
  }

  addstudent(data: ClassStudent): Promise<DocumentReference> {
    return this.classesStudentsCollection.add(data);
  }

  getClassesOfStudent(id: string): Observable<ClassStudent[]> {
    return this.afs
      .collection<ClassStudent>("classes-students", (ref) =>
        ref.where("student_id", "==", id)
      )
      .valueChanges();
  }

  addActivity(data: StudentActivity): Promise<DocumentReference> {
    return this.studentActivitiesCollection.add(data);
  }

  getActivities(id: string): Observable<StudentActivity[]> {
    return this.afs
      .collection<StudentActivity>("students-activities", (ref) =>
        ref.where("activity_id", "==", id)
      )
      .valueChanges();
  }
}
