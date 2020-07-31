import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  DocumentReference,
} from "@angular/fire/firestore";
import { Resource } from "src/app/models/resource";
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";
import { FileUpload } from "src/app/models/file";
import { finalize, map } from "rxjs/operators";
import { firestore } from "firebase/app";
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: "root",
})
export class ResourceService {
  private resourceCollection: AngularFirestoreCollection<Resource>;
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.resourceCollection = this.afs.collection<Resource>("resources");
  }

  addResource(data: Resource): Promise<DocumentReference> {
    return this.resourceCollection.add(data);
  }

  getResources(id: string): Observable<Resource[]> {
    return this.afs
      .collection<Resource>("resources", (ref) =>
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

  uploadFiles(files: FileUpload[]): Promise<FileUpload[]> {
    return new Promise((resolve, reject) => {
      const data: FileUpload[] = [];
      for (let file of files) {
        const filePath = `resources/${file.file.name}`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file.file);
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              ref.getDownloadURL().subscribe((url) => {
                data.push({ name: file.file.name, url: url });
                if (files.length === data.length) {
                  resolve(data);
                }
              });
            })
          )
          .subscribe();
      }
    });
  }
}
