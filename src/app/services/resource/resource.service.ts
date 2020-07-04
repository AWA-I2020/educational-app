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
import { finalize } from "rxjs/operators";

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
      .valueChanges();
  }

  pushFileToStorage(
    fileUpload: FileUpload,
    className: string,
    data: Resource
  ): Observable<number> {
    const filePath = `resources/${className}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            data.fileURL = downloadURL;
            this.addResource(data);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }
}
