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
import { AngularFireStorage } from "@angular/fire/storage";
import { FileUpload } from "src/app/models/file";
import { finalize, take, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private classesStudentsCollection: AngularFirestoreCollection<ClassStudent>;
  private studentActivitiesCollection: AngularFirestoreCollection<
    StudentActivity
  >;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
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

  getActivitiesOfStudents(id: string): Observable<StudentActivity[]> {
    return this.afs
      .collection<StudentActivity>("students-activities", (ref) =>
        ref.where("activity_id", "==", id)
      )
      .valueChanges();
  }

  getActivity(
    studentId: string,
    activityId: string
  ): Observable<StudentActivity[]> {
    return this.afs
      .collection<StudentActivity>("students-activities", (ref) =>
        ref
          .where("activity_id", "==", activityId)
          .where("student_id", "==", studentId)
      )
      .valueChanges()
      .pipe(
        take(1),
        map((data) => {
          return data;
        })
      );
  }

  uploadActivity(file: FileUpload): Promise<FileUpload> {
    return new Promise((resolve, reject) => {
      let data: FileUpload;
      const filePath = `activities/${file.file.name}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file.file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe((url) => {
              data = { name: file.file.name, url: url };
              resolve(data);
            });
          })
        )
        .subscribe();
    });
  }
}
