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
import { User } from "src/app/models/user";
import { ResourceFile } from "src/app/models/resource-file";

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

  addStudent(data: ClassStudent): Promise<DocumentReference> {
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
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
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
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  uploadActivity(file: FileUpload): Promise<ResourceFile> {
    return new Promise((resolve, reject) => {
      let data: ResourceFile;
      const filePath = `activities/${file.file.name}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file.file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe((url) => {
              data = { name: file.file.name, fileURL: url, icon: "download" };
              resolve(data);
            });
          })
        )
        .subscribe();
    });
  }

  getStudent(id: string): Observable<User> {
    let userDoc = this.afs.doc<User>(`users/${id}`);
    return userDoc.valueChanges().pipe(
      take(1),
      map((student) => {
        student.id = id;
        return student;
      })
    );
  }

  getStudentClass(id: string): Observable<ClassStudent> {
    return this.classesStudentsCollection
      .doc<ClassStudent>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((studentClass) => {
          studentClass.id = id;
          return studentClass;
        })
      );
  }

  getStudentsOfClass(id: string): Observable<ClassStudent[]> {
    return this.afs
      .collection<ClassStudent>("classes-students", (ref) =>
        ref.where("class_id", "==", id)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  updateStudent(student: ClassStudent) {
    return this.classesStudentsCollection.doc(student.id).update(student);
  }
}
